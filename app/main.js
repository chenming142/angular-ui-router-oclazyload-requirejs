requirejs.config({
	paths: {
		'jquery'    : '/bower_components/jquery/dist/jquery.min',
		'angular'   : '/bower_components/angular/angular.min',
		'ngResrouce': '/bower_components/angular-resource/angular-resource.min',
		'uiRouter'  : '/bower_components/angular-ui-router/release/angular-ui-router.min',
		'oclazyload': '/bower_components/oclazyload/dist/ocLazyLoad.require.min'
	},
	shim:{
		jquery    : {exports: 'jQuery'},
		angular   : {deps:['jquery'],exports: 'angular'},
		ngResrouce: {deps:['angular']},
		uiRouter  : {deps:['angular']},
		oclazyload: {deps:['angular']}
	}
});

// #1 Define requirejs requirement - application.js file which returns app object
require(['application'], function (app) {

	// #4 app object is returned here, call it's user defined bootstrap function
    app.bootstrap();

});