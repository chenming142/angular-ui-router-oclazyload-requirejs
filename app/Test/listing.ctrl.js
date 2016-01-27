// Declaring angular module
var app = angular.module('WeiXin.WebApp.Mobile.Test');

// Defining angular controller
app.controller('ListingController', function($scope, Zxxbox){
	Zxxbox.zxxbox("---ListingController---")
});	

app.config(function(ZxxboxProvider){
	ZxxboxProvider.setDefaultCfg({delay: 10000});
})
