// Declaring angular module
var app = angular.module('WeiXin.WebApp.Mobile.Test');

// Defining angular controller
app.controller('DashboardController', function($scope, ZxxboxFactory){
	$scope.data = {'a': '---a---'};
	ZxxboxFactory.zxxbox("---DashboardController---");
});	