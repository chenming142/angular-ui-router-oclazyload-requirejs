angular.module('WeiXin.WebAPP.Mobile.Utils.ScrollEvt',[
	'WeiXin.WebApp.Mobile.Utils.Common',
	['/bower_components/scrollEvt.js']
])
	.provider("PageScroll", function(){
		this.defPgCfg = {
			pgSize   : 10,
			pgCurrent: 1
		};
		this.configPgCfg = function(config){
			angular.extend(this.defPgCfg, config);
		}
		this.$get = ['commonFactory', '$window', function(commonFactory, $window){
			var self = this;
			function PageScroll(pgInfo, context){
				angular.extend(this, self.defPgCfg);
				this.isLoading      = false;
				this.isLoaded       = false;
				this.context        = context;
				this.pgInfo         = pgInfo;
				if(!this.pgInfo.Promise || !this.pgInfo.result){
					throw Error("动态刷新加载数据，必须配置pgInfo[Promise|result]对象");
				}
			}
			PageScroll.prototype = {
				constructor: PageScroll,
				loadData: function(evt){
					var self = this;
					if(self.isLoading)return;
					self.start_time = +new Date;
					self.context.$apply(function(){self.isLoading = true;});
					var params = {pageCurrent: ++self.pgCurrent},
						args = self.pgInfo.args;
					if($.isPlainObject(self.pgInfo.args)){
						params = $.extend({}, params, args)
					}
					function namespace(){
						var l = arguments.length, o = null,i, j, p;
						for (i = 0; i < l; ++i) {
							p = ('' + arguments[i]).split('.');
							o = this;
							for (j = (this[p[0]] === o) ? 1 : 0; j < p.length; ++j) {
								o = o[p[j]] = o[p[j]] || {};
							}
						}
						return o;
					}
					self.pgInfo.Promise(params).then(function(data){
						self.isLoading = false;
						var name = self.pgInfo.List;
						if(name)data = namespace.call(data, name);
						if(data && data.length > 0){
							var len = data.length;
							if(len < self.pgSize){
								self.isLoaded = true;
								if($window['PgScroll']){
									$window['PgScroll'].stop();
								}
							}
							angular.forEach(data, function(list){
								this.push(list)
							}, self.pgInfo.result);
						}
					});
				}
			};
			return PageScroll;
		}]
	})
	.directive("imybestScrollevt", ['PageScroll', '$window', function(PageScroll, $window){
		return {
			restrict: 'E',
			replace: true,
			scope: {
				/**
				 * AngularJS使用动态刷新的方式加载
				 * -----------------------------------
				 * Promise: 加载数据的方法
				 * result: 数据返回的对象（必须包含List）
				 * args: 请求数据时传递的参数result
				 * List: 分页加载时所用到的List名称
				 */
				pgInfo: "="
			},
			templateUrl: "/app/utils/scrollEvt/scrollEvt.tpl.html",
			link: function(scope, element, attrs){
				var PGScroll = scope.PGScroll = new PageScroll(scope.pgInfo, scope);
				$window.PgScroll = new scrollEvt(PGScroll);
				$window.PgScroll.start();
			}
		}
	}]);