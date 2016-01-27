angular.module("WeiXin.WebAPP.Mobile.Utils.Mobiscroll", [
	'WeiXin.WebAPP.Mobile.Address',
	[
		'/bower_components/mobiscroll/css/mobiscroll.scroller.css',
		'/bower_components/mobiscroll/css/mobiscroll.scroller.sense-ui.css',
		'/bower_components/mobiscroll/mobiscroll.zepto.js',
		'/bower_components/mobiscroll/mobiscroll.core.js',
		'/bower_components/mobiscroll/mobiscroll.scroller.js',
		'/bower_components/mobiscroll/mobiscroll.area.js',
		'/bower_components/mobiscroll/mobiscroll.scroller.android.js',
		'/bower_components/mobiscroll/mobiscroll.i18n.zh.js',
	]
])
	.factory("PCDInfo", ["$q", '$http', function($q, $http){
		var loadPCDInfo = function(){
			var def = $q.defer();
			$http.get('/app/address/PCDInfo.js').success(function(data){
				def.resolve(data);
			});
			return def.promise;
		};
		return{
			PCDInfo : null,
			getPCDInfo: function(){
				var self = this;
				if (self['PCDInfo']) return self['PCDInfo'];
				self['PCDInfo'] = loadPCDInfo();
				return self['PCDInfo'];
			},
			getPCDNames: function( info ){
				var self = this,def = $q.defer();
				var PCDNames = [],PCDS = ['Provinces', 'Cities', 'Districts'];
				var PCDSkeys = [
						['_proviceid', '_provicename'],
						['_cityid', '_cityname'],
						['_districtid', '_districtname']
					];
				info = info && info.split(" ");
				//获取PCDInfo对应的省市区名称
				function setPCDNames(PCDInfo){
					if(info && info.length >0){
						for(var i=0, size = info.length;i<size;i++){
							var area = i <= 0 ? PCDInfo[PCDS[i]] : PCDInfo[PCDS[i]][info[i - 1]];
							$.each(area, function(key, value) {
								if (value[PCDSkeys[i][0]] == info[i]) {
									PCDNames[i] = value[PCDSkeys[i][1]];
									return false;
								}
							});
						}
					}
				}
				self.getPCDInfo().then(function(PCDInfo){
					setPCDNames(PCDInfo);
					def.resolve(PCDNames.join(""));
				});
				return def.promise;
			}
		};
	}])
	.directive('mobiscrollWidget', ['PCDInfo', 'Address', '$q', '$timeout', function(PCDInfo, Address, $q, $timeout){
		return {
			restrict: 'E',
			scope: {
				id: '       =addressId', //传入的addressId
				PCDInfo: '  =addressInfo',//传入PCDInfo
				PCDNames: ' =info',//传入PCDInfo必须传入PCDNames
				auto: '     =switchOn',
				
				width       : '@',
				height      : '@',
			},
			template: '<input type="text" class="inputel" readonly placeholder="省、市、区"  readonly id="PCDInfo"/>' +
					'<input type="hidden" ng-model="PCDInfo.ProviceID"/>' +
					'<input type="hidden" ng-model="PCDInfo.CityID"/>' +
					'<input type="hidden" ng-model="PCDInfo.DistrictID"/>',
			link: function($scope, $element, $attrs){
				var width = $scope.width,height = $scope.height;
				$scope.PCDInfo = $scope.PCDInfo || {};
				
				$scope.$watch("PCDNames", function(info){
					$('#PCDInfo').val(info);
				});
				
				//根据传入的Id，设置该PCDInfo信息
				function setPCDInfoById( id ){
					var PCD = [], def = $q.defer();
					$q.when(getPCDInfoById( id )).then(function(addressInfo){
						angular.extend($scope.PCDInfo, addressInfo);
						//用户的addressId和详细地址
						$scope.PCDInfo['ID'] = addressInfo['MemberAddressID'];
						$scope.PCDInfo['Address'] = addressInfo['StreetAddress'];
						$scope.PCDInfo['ProviceID'] = PCD[0] = addressInfo['ProviceID'];
						$scope.PCDInfo['ProvinceID'] = PCD[0] = addressInfo['ProviceID'];
						$scope.PCDInfo['CityID'] = PCD[1] = addressInfo['CityID'];
						$scope.PCDInfo['DistrictID'] = PCD[2] = addressInfo['DistrictID'];
						
						setPCDNames(PCD);
						def.resolve(PCD);
					});
					return def.promise;
				}
				//根据传入的Id，设置该PCDNames信息
				function setPCDNames(PCD){
					PCD = typeof PCD === 'string' ? PCD : PCD.join(" ");
					PCDInfo.getPCDNames(PCD).then(function(val) {
						$('#PCDInfo').val(val);
					});
				}
				//根据传入的Id，获取该PCDInfo信息
				function getPCDInfoById( id ){
					var def = $q.defer();
					//TODO: 依赖WeiXin.WebApp.Mobile.Address
					Address.getAddressById({'addressID': id}).then(function(data){
						//设置AddressInof的值
						if(data && data.result){
							def.resolve(data.Address);
						}
					});
					return def.promise;
				}
				//根据传入的PCDInfo，设置该PCDInfo信息
				function setPCDInfo(PCDInfo){
					var PCD = [], def = $q.defer();
					PCD[0] = PCDInfo['ProviceID'] || PCDInfo['ProvinceID'];
					PCD[1] = PCDInfo['CityID'];
					PCD[2] = PCDInfo['DistrictID'];
					def.resolve(PCD);
					return def.promise;
				}
				//检测PCD是否存在
				function checkPCDExist(PCDPromise){
					var def = $q.defer();
					PCDPromise.then(function(PCD){
						def.resolve(PCD.length > 0 && PCD[0] ? PCD : null);
					});
					return def.promise;
				}
				//实例化Mobiscroll组件
				function invokeSelectPCDInfo(getPCDInfoPromise, checkPCDExistPromise) {
					$q.all([getPCDInfoPromise, checkPCDExistPromise]).then(function(data){
						if(data && data.length > 0){
							var PCDInfos = data[0], PCDInfo = data[1];
							console.info("-----------invokeSelectPCDInfo------------")
							console.log(PCDInfos);
							console.log(PCDInfo);
							console.info("------------------------------------------")
							$element.find("#PCDInfo").scroller('destroy')
								.scroller({
									preset: 'area',
									theme: 'default',
									headerText: false,
									height: height,
									minWidth: width,
									AddresssInfo: PCDInfos,
									values: PCDInfo,
									curAddrInfo: PCDInfo,
									onSelect: function(PCD) {
										setPCDNames(PCD);
										PCD = PCD && PCD.split(" ");
										console.info(PCD);
										$scope.$apply(function() {
											$scope.PCDInfo['ProviceID'] = PCD[0];
											$scope.PCDInfo['ProvinceID'] = PCD[0];
											$scope.PCDInfo['CityID'] = PCD[1];
											$scope.PCDInfo['DistrictID'] = PCD[2];
										});
									}
								});
						}
					});
				}
				
				$timeout(function(){
					if($scope.id){
						invokeSelectPCDInfo(PCDInfo.getPCDInfo(), checkPCDExist(setPCDInfoById($scope.id)));
					}else{
						invokeSelectPCDInfo(PCDInfo.getPCDInfo(), checkPCDExist(setPCDInfo($scope.PCDInfo)));
					}
				});
			}
		}
	}])
	.config(function() {
	  console.warn('config WeiXin.WebAPP.Mobile.Utils.Mobiscroll');
	});