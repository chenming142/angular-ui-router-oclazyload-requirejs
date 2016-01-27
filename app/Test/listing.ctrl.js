// Declaring angular module
var app = angular.module('WeiXin.WebApp.Mobile.Test');

// Defining angular controller
app.controller('ListingController', function($scope, ZxxboxFactory){
	ZxxboxFactory.zxxbox("---ListingController---")
});	
