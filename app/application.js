define(['angular', 'uiRouter', 'oclazyload','ngResrouce'], function (angular) {
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
            $urlRouterProvider.otherwise('/page');
			//$locationProvider.hashPrefix('!');
			
			//通过ocLL加载公共模块
			//公共的ES5扩展或内置方法增强
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebApp.Mobile.Utils.Lang',
					files: ['/app/utils/lang.js']
				}]
			});
			//公共的Factory|Service|constant
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebApp.Mobile.Utils.Common',
					files: ['/app/utils/common.js']
				}]
			});
			//Modal
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebApp.Mobile.Utils.Modal',
					files: ['/app/utils/modal.js']
				}]
			});
			//Zxxbox
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebApp.Mobile.Utils.Zxxbox',
					files: ['/app/utils/zxxbox.js']
				}]
			});
			//Mobiscroll
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebAPP.Mobile.Utils.Mobiscroll',
					files: ['/app/utils/mobiscroll.js', '/app/address/address.js']
				}]
			});
			//scrollEvt
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebAPP.Mobile.Utils.ScrollEvt',
					files: [
						'/app/utils/scrollEvt/scrollEvt.js', 
						'/app/utils/scrollEvt/scrollEvt.css'
					]
				}]
			});
			//vgSrc
			$ocLazyLoadProvider.config({
				modules: [{
					name: 'WeiXin.WebAPP.Mobile.Utils.vgSrc',
					files: [
						'/app/utils/vgSrc.js'
					]
				}]
			});

            // #8 Configuration of application wide states of all modules
            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: 'index.html'
                })

                .state('test', {
					// This is the abstract base layout/template state
					abstract: true,
					templateUrl: "app/Test/base.tpl.html",
				    controller: 'module1Controller',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                name: 'test',
                                files: ['app/Test/base.ctrl.js']
                            });
                        }
                    }
                })
                .state('test.dashboard', {
                    url: '/test/dashboard',
                    templateUrl: 'app/Test/dashboard.tpl.html',
				    controller: 'DashboardController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'test',
                                files: ['app/Test/dashboard.ctrl.js']
                            });
                        }
                    }
                })
                .state('test.listing', {
                    url: '/test/listing',
                    templateUrl: 'app/Test/listing.tpl.html',
				    controller: 'ListingController',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'test',
                                files: ['app/Test/listing.ctrl.js']
                            });
                        }
                    }
                })
			
				.state('page', {
					url: '/page',
					templateUrl: "app/Page/page.tpl.html",
				    controller: 'pageController',
				    controllerAs: 'page',
                    resolve: {
                        load: function($ocLazyLoad) {
                            return $ocLazyLoad.load ({
                                files: ['app/Page/page.ctrl.js']
                            });
                        }
                    }
				})
			
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