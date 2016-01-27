angular.module("WeiXin.WebAPP.Mobile.Address",['ngResource'])
	.factory('Address', ['$resource','$q', function($resource, $q){
		var defAddr = $resource('/ShoppingAddr/ShoppingAddrInfo');
		return {
			getDefaultAddress: function(param){
				return defAddr.get(param).$promise;
			},
			getAddressById: function(){
				var def = $q.defer();
				def.resolve({
					result: true,
					Address:{
						ProviceID: '10065',
						CityID: '10058',
						DistrictID: '10518'
					}
				});
				return def.promise;
			}
		};
	}]);