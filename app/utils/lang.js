angular.module("WeiXin.WebApp.Mobile.Utils.Lang", [])
	.run(function(){
		var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),hasOwn = ({}).hasOwnProperty;
		for (var i in {
			toString: 1
		}) {
			DONT_ENUM = false;
		}
		Object.keys = Object.keys || (function(obj) {
			return function(obj) {
				var result = [],
					key;
				for (key in obj) {
					if (hasOwn.call(obj, key)) {
						result.push(key);
					}
				}
				if (DONT_ENUM && obj) {
					for (var i = 0; i < DONT_ENUM.length; i++) {
						key = DONT_ENUM[i++];
						if (hasOwn.call(obj, key)) {
							result.push(key);
						}
					}
				}
				return result;
			};
		})();

		if (!Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
				if (typeof this !== "function") {
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}
				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function() {},
					fBound = function() {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
					};
				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();
				return fBound;
			};
		}
	
		if (!'k'.trim) {
			String.prototype.trim = function() {
				return this.replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '')
			}
		}
		if (!'d'.format) {
			String.prototype.format = function() {
				var args = arguments;
				return this.replace(/\{(\d+)\}/g, function($0, $1){
					return args[$1] !== void 0 ? args[$1] : $0;
				});
			}
		}
	});