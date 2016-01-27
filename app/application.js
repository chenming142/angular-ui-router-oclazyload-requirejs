define(['angular', 'uiRouter', 'oclazyload','ngResrouce'], function (angular) {
	angular.module('WeiXin.WebApp.Mobile.Utils', []);

	// #2 Defining the angular module name and it's dependeny array
    var app = angular.module('WeiXin.WebApp.Mobile.InitConfig', ['ui.router','oc.lazyLoad']);

    // #5 Enter the config phase and do the specified configurations
    app.config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider','$locationProvider',
        function ($ocLazyLoadProvider,$stateProvider, $urlRouterProvider, $locationProvider) {

        	// #6 ocLL config, uses requirejs as asyncLoader and loads parentChild module by default
            $ocLazyLoadProvider.config({
				debug: true,
                loadedModules: ['WeiXin.WebApp.Mobile.InitConfig'],
                asyncLoader: require
            });

            // #7 All unmatched urls end up here
            $urlRouterProvider.otherwise('/index');
			$locationProvider.hashPrefix('!');
			
			//通过ocLL加载公共模块
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebApp.Mobile.Utils.Zxxbox',
					files: ['/app/utils/zxxbox.js']
				}]
			});
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebAPP.Mobile.Utils.Mobiscroll',
					files: ['/app/utils/mobiscroll.js', '/app/address/address.js']
				}]
			});

            // #8 Configuration of application wide states of all modules
            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: 'index.html'
                })

                .state('Test', {
					// This is the abstract base layout/template state
					abstract: true,
					templateUrl: "app/Test/base.tpl.html",
				    controller: 'module1Controller',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'Test',
                                files: ['app/Test/base.ctrl.js']
                            });
                        }
                    }
                })
                .state('Test.dashboard', {
                    url: '/Test/dashboard',
                    templateUrl: 'app/Test/dashboard.tpl.html',
				    controller: 'DashboardController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'Test',
                                files: ['app/Test/dashboard.ctrl.js']
                            });
                        }
                    }
                })
                .state('Test.listing', {
                    url: '/Test/listing',
                    templateUrl: 'app/Test/listing.tpl.html',
				    controller: 'ListingController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'Test',
                                files: ['app/Test/listing.ctrl.js']
                            });
                        }
                    }
                });
			
			// Without server side support html5 must be disabled.
    		$locationProvider.html5Mode(false);
        }]);

	// #9 User defined function that bootstraps the entire app
    app.bootstrap = function () {

    	// Angular's bootstrap function
    	// Use this function to manually start up angular application
    	// Syntax = angular.bootstrap(element, [modules], [config]);
    	// Here, we have the config block above
        angular.bootstrap(document, ['WeiXin.WebApp.Mobile.InitConfig']);

    };

    // #3 Return the app object
    return app;
});