angular.module('WeiXin.WebAPP.Mobile.Utils.Page',[
	'WeiXin.WebAPP.Mobile.Utils.ScrollEvt',
	'WeiXin.WebAPP.Mobile.Utils.vgSrc'
])
	.factory("pageFactory", ['$q', '$http', '$timeout', function($q, $http, $timeout){
		var page = {};
		page.getPageList = function(p){
			p = p || 1;
			var defer = $q.defer(), count = p['pageCurrent'] > 3 ? 6 : 10 ;
			var result = [];
			$http.get("/").then(function(data){
				$timeout(function(){
					for(var i = 0; i < count; i++){
						result.push({name: 'name'+i, "desc": "ssssssssssssssss"+i});
						defer.resolve(result);
					}
				}, 2000);
			});
			return defer.promise;
		}
		return page;
	}])
	.controller("pageController", ['$scope', 'pageFactory',function($scope, pageFactory){
		var vm = this;
		vm.result = [];
		vm.errorImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif';
		vm.emptyImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99474.gif';
		vm.loadingImg = 'http://ico.ooopic.com/iconset01/status-icons/gif/99494.gif';
		vm.currentImg = 'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpg';
		vm.imgList = [
			'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpg',
            'http://attach.bbs.miui.com/forum/201402/21/115847dwxfcspf4c54esin.jpg.thumb.jpeg',
            'http://pic2.52pk.com/files/150929/1283568_103401945.jpg'
		]
		vm.log = function(content) {console.log(content);};
		pageFactory.getPageList().then(function(data){
			angular.forEach(data, function(list){
				vm.result.push(list);
			});
		});
		vm.pageInfo = {
			Promise: pageFactory.getPageList,
			result: vm.result
		}
	}])
	.config(['vgSrcCfgProvider', function(vgSrcCfgProvider){
		vgSrcCfgProvider.setCongfig({
			debug: false,
			error: 'http://ico.ooopic.com/iconset01/status-icons/gif/99589.gif',
			onError: function($e) {
				//console.log('failure load:' + $e.src);
			}
		})
	}]);