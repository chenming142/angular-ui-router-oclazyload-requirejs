angular.module('WeiXin.WebApp.Mobile.Utils.Zxxbox', [
	['/bower_components/jquery.zxxbox.3.0.js']
]).factory('ZxxboxFactory', function(){
	return {
		zxxbox: function(msg, opts) {
			var defOpt = {
				delay: 1500,
				btnclose: false,
				title: '',
				bg: false
			};
			var elem;
			if (typeof msg === 'string') {
				elem = $('<span>' + msg + '</span>');
			} else {
				elem = msg;
			}
			opts = $.extend({}, defOpt, opts || {});
			return elem.zxxbox(opts);
		}
	};
}).config(function() {
  console.warn('config WeiXin.WebApp.Mobile.Utils.Zxxbox');
}).config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  //console.warn('config 2 WeiXin.WebApp.Mobile.Utils.Zxxbox');
}]).run(function() {
  //console.warn('run WeiXin.WebApp.Mobile.Utils.Zxxbox');
});