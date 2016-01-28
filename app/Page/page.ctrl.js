angular.module('WeiXin.WebAPP.Mobile.Utils.Page',['WeiXin.WebAPP.Mobile.Utils.ScrollEvt'])
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
		pageFactory.getPageList().then(function(data){
			angular.forEach(data, function(list){
				vm.result.push(list);
			});
		});
		vm.pageInfo = {
			Promise: pageFactory.getPageList,
			result: vm.result
		}
	}]);