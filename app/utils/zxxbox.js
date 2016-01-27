angular.module('WeiXin.WebApp.Mobile.Utils.Zxxbox', [
	['/bower_components/jquery.zxxbox.3.0.js']
]).provider('Zxxbox', function(){
	this.defaultCfg = {
		delay   : 1500,
		btnclose: false,
		title   : '',
		bg      : false
	};
	this.setDefaultCfg = function(cfg){
		angular.extend(this.defaultCfg, cfg);
		return this.defaultCfg;
	};
	this.$get = function(){
		var self = this, cfg = self.defaultCfg;
		return {
			zxxbox: function(msg, configs) {
				var elem = (typeof msg === 'string') 
					? $('<span>' + msg + '</span>')
					: msg;
				configs = $.extend({}, cfg, configs || {});
				return elem.zxxbox(configs);
			}
		};	
	}
}).config(function() {
  console.warn('config WeiXin.WebApp.Mobile.Utils.Zxxbox');
}).config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  //console.warn('config 2 WeiXin.WebApp.Mobile.Utils.Zxxbox');
}]).run(function() {
  //console.warn('run WeiXin.WebApp.Mobile.Utils.Zxxbox');
});