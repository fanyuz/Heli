;(function($) {
	$.fn.extend({
		//响应式全屏图片
		responsiveImg : function(o) {
			o = $.extend({
				_parent :null,
				_selfW : null,
				_selfH : null
			}, o || {});
			return this.each(function() {
				var _this = $(this);
				_selfFun = function(self) {
					var parent=self.closest(o._parent);
					var w = parent.width();
					var h = parent.height();
					var winPro = w / h;
					var ImgPro = o._selfW / o._selfH;
					if (ImgPro <= winPro) {
						self.attr('style', '').css({
							'display' : 'block',
							'position' : 'absolute',
							'left' : '50%',
							'top' : '50%',
							'width' : w + 'px',
							'height' : w * o._selfH / o._selfW + 'px',
							'margin-top' : -(w * o._selfH / o._selfW) / 2 + 'px',
							'margin-left' : -(w) / 2 + 'px'
						});
					} else {
						self.attr('style', '').css({
							'display' : 'block',
							'position' : 'absolute',
							'left' : '50%',
							'top' : '50%',
							'width' : o._selfW * h / o._selfH + 'px',
							'height' : h + 'px',
							'margin-top' : -(h) / 2 + 'px',
							'margin-left' : -(o._selfW * h / o._selfH) / 2 + 'px'
						});
					}
				}
				_selfFun($(this));
				$(window).bind('resize', function() {
					_selfFun(_this);
				});
				
			});
		},

		//无缝滚动插件
		jCarouselLite : function(o) {
			o = $.extend({
				btnPrev : null,
				btnNext : null,
				btnGo : null,
				mouseWheel : false,
				auto : null,
				speed : 200,
				easing : null,
				vertical : false,
				circular : true,
				visible : 3,
				start : 0,
				scroll : 1,
				beforeStart : null,
				afterEnd : null
			}, o || {});

			return this.each(function() {
				var running = false, animCss = o.vertical ? "top" : "left", sizeCss = o.vertical ? "height" : "width";
				var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;
				if (o.circular) {
					ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone());
					o.start += v;
				}
				var li = $("li", ul), itemLength = li.size(), curr = o.start;
				div.css("visibility", "visible");
				li.css({
					overflow : "hidden",
					float : o.vertical ? "none" : "left"
				});
				ul.css({
					margin : "0",
					padding : "0",
					position : "relative",
					"list-style-type" : "none",
					"z-index" : "1"
				});
				div.css({
					overflow : "hidden",
					position : "relative",
					"z-index" : "2",
					left : "0px"
				});
				var liSize = o.vertical ? height(li) : width(li);
				var ulSize = liSize * itemLength;
				var divSize = liSize * v;
				li.css({
					width : li.width(),
					height : li.height()
				});
				ul.css(sizeCss, ulSize + "px").css(animCss, -(curr * liSize));
				div.css(sizeCss, divSize + "px");
				if (o.btnPrev)
					$(o.btnPrev).click(function() {
						return go(curr - o.scroll);
					});
				if (o.btnNext)
					$(o.btnNext).click(function() {
						return go(curr + o.scroll);
					});
				if (o.btnGo)
					$.each(o.btnGo, function(i, val) {
						$(val).click(function() {
							return go(o.circular ? o.visible + i : i);
						});
					});
				if (o.mouseWheel && div.mousewheel)
					div.mousewheel(function(e, d) {
						return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll);
					});
				if (o.auto)
					setInterval(function() {
						go(curr + o.scroll);
					}, o.auto + o.speed);
				function vis() {
					return li.slice(curr).slice(0, v);
				};

				function go(to) {
					if (!running) {
						if (o.beforeStart)
							o.beforeStart.call(this, vis());
						if (o.circular) {
							if (to <= o.start - v - 1) {
								ul.css(animCss, -((itemLength - (v * 2)) * liSize) + "px");
								curr = to == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll;
							} else if (to >= itemLength - v + 1) {
								ul.css(animCss, -((v) * liSize ) + "px");
								curr = to == itemLength - v + 1 ? v + 1 : v + o.scroll;
							} else
								curr = to;
						} else {
							if (to < 0 || to > itemLength - v)
								return;
							else
								curr = to;
						}

						running = true;

						ul.animate(animCss == "left" ? {
							left : -(curr * liSize)
						} : {
							top : -(curr * liSize)
						}, o.speed, o.easing, function() {
							if (o.afterEnd)
								o.afterEnd.call(this, vis());
							running = false;
						});
						if (!o.circular) {
							$(o.btnPrev + "," + o.btnNext).removeClass("disabled");
							$((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled");
						}

					}
					return false;
				};
			});
			function css(el, prop) {
				return parseInt($.css(el[0], prop)) || 0;
			};
			function width(el) {
				return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
			};
			function height(el) {
				return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
			};
		},

		//导航菜单插件
		menuDropPlus : function(o) {
			o = $.extend({
				sonMenu : null,
				hoverClass : null
			}, o || {});
			return this.each(function() {
				$(this).hover(function() {
					$(this).addClass(o.hoverClass);
					$(this).find(o.sonMenu).show();
					if (o.sonMenu) {
						$(this).find(o.sonMenu).show();
					}
				}, function() {
					$(this).removeClass(o.hoverClass);
					if (o.sonMenu) {
						$(this).find(o.sonMenu).hide();
					}
				});
			});
		},

		//输入框焦点内容置空
		onFocusInput : function(o) {
			o = $.extend({
				onFocusClass : null,
				startValue : null
			}, o || {});
			return this.each(function() {
				$(this).bind('focus', function() {
					if ($(this).val() == o.startValue) {
						$(this).val('');
						if (o.onFocusClass) {
							$(this).addClass(o.onFocusClass);
						}
					}
				});
				$(this).bind('blur', function() {
					if ($(this).val() == '') {
						$(this).val(o.startValue);
						if (o.onFocusClass) {
							$(this).removeClass(o.onFocusClass);
						}
					}
				});
			});
		},
		//banner图切换
		jcSlider : function(o) {
			o = $.extend({
				animation : 'fade', //两种状态fade和slider
				startAt : 0,
				aniSpeed : 500,
				auto : null,
				easing : 'swing', //animation为slider状态启用
				hoverPause : false,
				trigger : null,
				touch:false,
				beforeCallback : new Function,
				endCallback : new Function,
				controlNav : true,
				directionNav : true
			}, o || {});
			return this.each(function() {
				var running = false, _this = $(this), aniLi = $('li', _this), aniLiL = aniLi.size(), timer, curr = o.startAt;
				$pager = $('<ol class="controlNav">');
				_this.wrap(function() {
					return '<div class="jcSliderbox"></div>'
				});
				var jcSliderbox = $('.jcSliderbox');
				jcSliderbox.css({
					'position' : 'relative',
					'width' : '100%',
					'height' : '100%'
				});
				supportsTransitions = (function() {
					var docBody = document.body || document.documentElement;
					var styles = docBody.style;
					var prop = "transition";
					if ( typeof styles[prop] === "string") {
						return true;
					}
					vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
					prop = prop.charAt(0).toUpperCase() + prop.substr(1);
					var i;
					for ( i = 0; i < vendor.length; i++) {
						if ( typeof styles[vendor[i] + prop] === "string") {
							return true;
						}
					}
					return false;
				})();
				switch(o.animation) {
					case 'fade':
						var visible = {
							"float" : "left",
							"position" : "relative",
							"opacity" : 1,
							"zIndex" : 2
						}, hidden = {
							"float" : "none",
							"position" : "absolute",
							"opacity" : 0,
							"zIndex" : 1
						};
						function goAnimation(to) {
							if (to > aniLiL - 1)
								to = 0;
							if (supportsTransitions) {
								aniLi.css(hidden).eq(to).css(visible);
								curr = to;
								if (o.controlNav == true)
									$('.controlNav li').eq(curr).addClass('active').siblings('li').removeClass('active');
								if ($(o.trigger))
									$(o.trigger).eq(curr).addClass('active').siblings('li').removeClass('active');
							} else {
								aniLi.stop().fadeOut(o.aniSpeed, function() {
									$(this).css(hidden).css("opacity", 1);
								}).eq(to).fadeIn(o.aniSpeed, function() {
									$(this).css(visible);
									curr = to;
									if (o.controlNav == true)
										$('.controlNav li').eq(curr).addClass('active').siblings('li').removeClass('active');
									if ($(o.trigger))
										$(o.trigger).eq(curr).addClass('active').siblings('li').removeClass('active');
								});
							}
						}

						if (supportsTransitions) {
							aniLi.show().css({
								"-webkit-transition" : "opacity " + o.aniSpeed + "ms ease-in",
								"-moz-transition" : "opacity " + o.aniSpeed + "ms ease-in",
								"-o-transition" : "opacity " + o.aniSpeed + "ms ease-in",
								"transition" : "opacity " + o.aniSpeed + "ms ease-in"
							});
						}
						aniLi.css(hidden).eq(o.startAt).show().css(visible);
						goAnimation(o.startAt);
						break;
					case 'slider':
						var visible = {
							"zIndex" : 2,
							'left' : '0'
						}, hidden = {
							"zIndex" : 1,
							'left' : '100%'
						};
						function goAnimation(to) {
							if (to > aniLiL - 1)
								to = 0;
							aniLi.eq(curr).stop().animate({
								'left' : '-100%'
							}, o.aniSpeed, o.easing, function() {
								aniLi.eq(curr).css(hidden);
								if (o.beforeCallback)
									o.beforeCallback(curr, to);
							});
							aniLi.eq(to).animate({
								'left' : '0'
							}, o.aniSpeed, o.easing, function() {
								curr = to;
								if (o.endCallback)
									o.endCallback.call(this, curr);
								if (o.controlNav == true)
									$('.controlNav li').eq(curr).addClass('active').siblings('li').removeClass('active');
								if ($(o.trigger))
									$(o.trigger).eq(curr).addClass('active').siblings('li').removeClass('active');
							});
						}
						aniLi.css(hidden).eq(o.startAt).show().css(visible);
						break;
				}
				if (o.controlNav == true) {
					for ( i = 1; i <= aniLiL; i++) {
						$('<li>' + i + '</li>').appendTo($pager).bind('click', function() {
							var _this = $(this), index = _this.index();
							if (!running) {
								goAnimation(index);
							}
							return false;
						});
					}
					$pager.appendTo(jcSliderbox);
					$('.controlNav li').eq(o.startAt).addClass('active');
				}
				var play = function() {
					goAnimation(curr + 1);
				}
				var startCycle = function() {
					timer = setInterval(function() {
						play();
					}, o.auto);
				}
				if (o.auto)
					startCycle();
				if (o.hoverPause) {
					$('.controlNav li').hover(function() {
						clearInterval(timer);
					}, function() {
						startCycle();
					});
					if (o.trigger) {
						$(o.trigger).eq(o.startAt).addClass('active');
						$(o.trigger).hover(function() {
							clearInterval(timer);
						}, function() {
							startCycle();
						});
						$(o.trigger).bind('click', function() {
							var _this = $(this), index = _this.index();
							if (!running) {
								_this.addClass('active').siblings('li').removeClass('active');
								$('.controlNav li').eq(index).addClass('active').siblings('li').removeClass('active');
								goAnimation(index);
							}
							return false;
						});
						
					}
				}

			});
		}
	});
})(jQuery);
