angular.module('WeiXin.WebApp.Mobile.Utils.Common', [])
	.factory('commonFactory', ['$sce', '$window', function($sce, $window){
		return {
			setHtmlSpt: function(content){
				return $sce.trustAsHtml(content);
			},
			setPgTitle: function(scope, title){
				function setTitle(title){
					if (title) {
						var $body = $('body');
						document.title = title;
						// hack在微信等webview中无法修改document.title的情况
						var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
							setTimeout(function() {
								$iframe.off('load').remove();
								angular.element('title').html(title);
							}, 0);
						}).appendTo($body);
					}
				}
				if(arguments.length > 1){
					scope.$watch(title, setTitle);
				}else if(typeof arguments[0] === 'string'){
					setTitle(arguments[0]);
				}
			},
			getUrlArgs: function(name, refer){
				var qs = $window.location.search.substr(1),obj = {};
				name = name.toString().toUpperCase();
				if (name) {
					var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
					var r = qs.match(reg);
					return r ? (obj[name] = encodeURIComponent(r[2]), (refer ? obj : obj[name])) : '';
				} else {
					var re = /([^=&]+)(=([^&]*))?/g,match;
					while ((match = re.exec(qs))) {
						var key = decodeURIComponent(match[1].replace(/\+/g, ' ')), value = match[3];
						if (obj[key] != null) {
							if (!(obj[key] instanceof Array)) {
								obj[key] = [obj[key]];
							}
							obj[key].push(value);
						} else {
							obj[key] = value;
						}
					}
					return obj;
				}
			},
			padLimiter: function(input, len, flag){
				var length = input.length;
				flag = flag || "...";
				return (length > len) ? input.substring(0, len) + flag : input;
			},
			toThousands: function (num, dot) {
				return (num || 0) && (parseInt(num).toFixed(dot || 0) + "").replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,");
			},
			safeApply: function(scope, fn){
				var phase = scope.$root.$$phase;
				if (phase == '$apply' || phase == '$digest') {
					if (fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					scope.$apply(fn);
				}
			}
		}
	}]);