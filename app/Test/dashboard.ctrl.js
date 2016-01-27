// Declaring angular module
var app = angular.module('WeiXin.WebApp.Mobile.Test');

// Defining angular controller
app.controller('DashboardController', function($scope, Zxxbox){
	$scope.data = {'a': '---a---'};
	Zxxbox.zxxbox("---DashboardController---");
});	