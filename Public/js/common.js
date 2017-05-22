$(function($) {


	//$('a').each(function() {
//		if ($(this).attr('href') == 'javascript:;') {
//			$(this).attr('target', '_self');
//		}else{
//			$(this).attr('target', '_blank');
//		}
//	});
	(function() {
		h1_padding();
		header();
		iphone_header();
		cont_padding();
		init();
		resizeWinPage();
		cont_padding2()
		$(window).resize(function() {
			h1_padding();
			header();
			init();
			resizeWinPage();
			cont_padding2()
		});
	})();

	//视频弹出
	(function() {
		$('.index .play').click(function() {
			$('.layer').show();
		})
		$('.layer .close,.cover').click(function() {
			$('.layer').hide();
		})
	})();

	//处理新闻内容图片
	(function() {
		//		$('.article p img').each(function() {
		//			var p = $(this).closest('p');
		//			p.css({
		//				'text-align': 'center',
		//				'line-height': '12px'
		//			}).append('<br/>' + $(this).attr('title'));
		//		});
	})();
	// 轮播
	(function() {
		if ($('.index').size() > 0) {
			$(".box3 .flexslider").flexslider({
				animation: 'slide',
				controlNav: true,
				directionNav: false,
				animationSpeed: 800
			});
			$(".box4 .flexslider").flexslider({
				animation: 'slide',
				controlNav: true,
				directionNav: false,
				slideshow: false,
				animationSpeed: 800
			});
		}
		if ($('.banflexslider').size() > 0) {
			$(".banflexslider").flexslider({
				animation: 'slide',
				slideshow: false,
				touch: true,
				animationLoop: false,
				animationSpeed: 600
			});
		}

		if ($('.railwaybox').size() > 0) {
			$(".railwaybox").flexslider({
				animation: 'fade',
				selector: ".slides2 > div",
				directionNav: false,
				controlNav: true,
				slideshow: false,
				//slideshowSpeed: 5000,
				manualControls: '.rails-plate .railway-btn',
				animationSpeed: 800,
				before: function(slider, target) {
					var arr = [1, 21, 40, 61, 80];
					$('.train').animate({
						'margin-left': arr[target] + '%'
					}, 800, 'easeOutSine');
				}
			});
			moveToLeft();
		}
		if ($('.hotnews .flexslider').size() > 0) {
			$('.hotnews .flexslider').flexslider({
				animation: 'slide',
				controlNav: false,
				directionNav: true,
				animationSpeed: 800,
				before: function(slider, target) {
					$('.hotnews .hotnews-list li').eq(target).show().siblings('li').hide();
				}
			});
		}
	})();

	// 首页菜单切换
	(function() {
		if ($('.index .box6 .tab a').size() >= 2) {
			$('.box6').each(function() {
				var _this = $(this);
				_this.find('.tab a').bind('click', function() {
					var this_a = $(this),
						_index = this_a.index();
					this_a.addClass('active').siblings('a').removeClass('active');
					_this.find('.cont').eq(_index).show().siblings('.cont').hide();
				})
			})
		}
	})();

	// 文化理念切换
	(function() {
		if ($('.culture-page').size() > 0) {
			$('.ele_text').each(function() {
				var _this = $(this);
				_this.find('.sub-nav a').bind('click', function() {
					var this_a = $(this),
						_index = this_a.index();
					this_a.addClass('active').siblings('a').removeClass('active');
					_this.find('.ele-cont').eq(_index).show().siblings('.ele-cont').hide();
				})
			})
		}
	})();

	// 返回顶部
	(function() {
		if ($('.back-top').size() > 0) {
			$(window).scroll(function() {
				$(window).scrollTop() > 200 ? $(".back-top").css('display', 'inline-block').click(function() {
					$(window).scrollTop(0);
				}) : $(".back-top").css('display', 'none');
			});
		}
	})();
	//地图
	(function() {
		var _width = $(window).width(),
			_height = $(window).height();
		if (_width > 1024) {
			var oHeight = $(window).height();
			var oHeaderH = $('.header').height();
			$('#allmap').css('height', oHeight - oHeaderH);
			$('.info').css('height', oHeight - oHeaderH);
		}
	})();
	// 下拉展开
	//(function() {
//		var Accordion = function(el, multiple) {
//			this.el = el || {};
//			this.multiple = multiple || false;
//			var links = this.el.find('.link');
//			links.on('click', {
//				el: this.el,
//				multiple: this.multiple
//			}, this.dropdown);
//		};
//		Accordion.prototype.dropdown = function(e) {
//			var $el = e.data.el;
//			$this = $(this), $next = $this.next();
//			$next.slideToggle();
//			$this.parent().toggleClass('open');
//			if (!e.data.multiple) {
//				$el.find('.accordioncont').not($next).slideUp().parent().removeClass('open');
//			};
//		};
//		var accordion = new Accordion($('#accordion'), false);
//	})();

	//集团概况
	(function() {
		$('.cc .secnav li a').click(
			function() {
				$(this).parents('.secnav').find('li').removeClass('thisclass');
				$(this).parent().addClass('thisclass');
				$(this).parents('.secnav').parent().find('.secc').hide();
				var oIndex = $(this).parent().index();
				$(this).parents('.secnav').parent().find('.secc').eq(oIndex).show();
				$(this).parents('.secnav').parent().find('.secc').eq(oIndex).find('.slider-carousel').eq('0').show();
			}
		);
		$('.secc .tags a').click(
			function() {
				$(this).parents('.secc').find('a').removeClass('thisclass');
				$(this).addClass('thisclass');
				//$(this).parents('.secc').find('.tagsc').hide();
				//var oIndex = $(this).index();
				//$(this).parents('.secc').find('.tagsc').eq(oIndex).show();
				//$(this).parents('.secc').find('.tagsc').eq(oIndex).find('.slider-carousel').eq(0).show();
			}
		);
	})();
	(function() {
		$('.year li').click(
			function() {
				var oIndex = $(this).index();
				$(this).addClass('thisclass').siblings().removeClass('thisclass');
				$('.detail .d1').hide();
				$('.detail .d1').eq(oIndex).fadeIn();
				$('.flex-control-nav a').eq(oIndex).trigger("click");
				$('.flexslider li').eq(oIndex).show().siblings('.flexslider li').hide()
			}
		);
		$('.cc4 .prev').click(
			function() {
				var oIndex = $('.year').find('.thisclass').index();
				if (oIndex == 0) {
					return;
				} else {
					$('.year li').eq(oIndex - 1).addClass('thisclass').siblings().removeClass('thisclass');
					$('.detail .d1').hide();
					$('.detail .d1').eq(oIndex - 1).fadeIn();
					$('.flexslider li').hide();
					$('.flexslider li').eq(oIndex - 1).fadeIn();
				}
			}
		);
		// $('.cc4 .prev').click(function(){
		//    $(".flex-prev").trigger("click");
		// })
		$('.cc4 .next').click(
			function() {
			    var oIndex = $('.year').find('.thisclass').index();
			    var num = $('.year').find('li').length;
			   
			    if (oIndex == (num-1)) {
					return;
				} else {
					$('.year li').eq(oIndex + 1).addClass('thisclass').siblings().removeClass('thisclass');
					$('.detail .d1').hide();
					$('.detail .d1').eq(oIndex + 1).fadeIn();
					$('.flexslider li').hide();
					$('.flexslider li').eq(oIndex + 1).fadeIn();
				}
			}
		);
		// $('.cc4 .next').click(function(){
		//    $(".flex-next").trigger("click");
		// })
	})();
	(function() {
		$(".cc2").find(".secc").not(":first").hide();
		var z_width = $(window).width();
		if (z_width < 1160) {
			if (z_width > 960) {
				$('.profile-page .ele_text2').css('margin-left', -$(window).width() / 2);
			}
		}
		if ($('#slider-carousel').size() > 0) {
			$("#slider-carousel").carousel({
				activate: function() {},
				timerAnimSlide: 400,
				infinite: false,
				resizeItem: {
					width: 50
				},
				responsive: {
					minWidth: 1160
				}
			});
		}
		if ($('.slider-carousel').size() > 0) {
			$(".slider-carousel").each(function() {
				$(this).carousel({
					activate: function() {},
					timerAnimSlide: 400,
					infinite: false,
					resizeItem: {
						width: 50
					},
					responsive: {
						minWidth: 960
					}
				})
			});
			$(".cc6").find(".slider-carousel").not(":first").hide();
			$(".cc6").find(".secc").not(":first").hide();
			$(".cc8").find(".secc").not(":first").hide();
		}
	})();
	//主营业务
	(function() {
		$('.listf li').click(
			function() {
				var oIndex = $(this).index();
				$(this).addClass('thisclass').siblings().removeClass('thisclass');
				$('.listfc .f1').hide();
				$('.listfc .f1').eq(oIndex).fadeIn();
				$('#bgallId .bgall').hide();
				$('#bgallId .bgall').eq(oIndex).show();
			}
		);
		$('.cc10 .prev').click(
			function() {
				var oIndex = $('.listf').find('.thisclass').index();
				if (oIndex == 0) {
					return;
				} else {
					$('.listf li').eq(oIndex - 1).addClass('thisclass').siblings().removeClass('thisclass');
					$('.listfc .f1').hide();
					$('.listfc .f1').eq(oIndex - 1).fadeIn();
					$('#bgallId .bgall').hide();
					$('#bgallId .bgall').eq(oIndex - 1).fadeIn();
				}
				$('.bg_pa_img').responsiveImg({
					_parent: '.bg_pa',
					_selfW: 1600,
					_selfH: 725
				});
			}
		);
		$('.cc10 .next').click(
			function() {
				var oIndex = $('.listf').find('.thisclass').index();
				if (oIndex == 5) {
					return;
				} else {
					$('.listf li').eq(oIndex + 1).addClass('thisclass').siblings().removeClass('thisclass');
					$('.listfc .f1').hide();
					$('.listfc .f1').eq(oIndex + 1).fadeIn();
					$('#bgallId .bgall').hide();
					$('#bgallId .bgall').eq(oIndex + 1).fadeIn();
				}
				$('.bg_pa_img').responsiveImg({
					_parent: '.bg_pa',
					_selfW: 1600,
					_selfH: 725
				});
			}
		);
	})();



	// 头部选中状态
	(function() {
		if ($('.nav').size() > 0) {
			$('.nav li').hover(function() {
				var _this = $(this);
				_this.addClass('active1')
			}, function() {
				var _this = $(this);
				_this.removeClass('active1')
			})
		}
	})();

})


function resizeWinPage() {
	var w = $(window).width(),
		H = $(window).height();
	if (w <= 1024) {
		$('body').addClass('page_1024 page_1280 page_1440');
	} else if (w <= 1280) {
		$('body').addClass('page_1280 page_1440');
	} else if (w <= 1440) {
		$('body').addClass('page_1440');
	}
}

// 头部菜单
function header() {

	if ($('.nav').size() > 0) {
		var _header = $('.header').height();
		$('.container').css({
			'padding-top': _header
		});
		$('.nav-box').each(function() {
			var _this = $(this);
			_this.attr('data-open', 'false');
		});
		$('.nav-box').bind('click', function() {
			$(".open").removeClass("up");
			var _this = $(this),
				_dataOpen = _this.attr('data-open');
			if (_dataOpen == 'false') {
				_this.find(".open").addClass("up");
				$('.nav-box .subnav').slideUp(150);
				$('.nav-box').attr('data-open', 'false');
				$('.subnav', _this).slideDown(150);
				_this.attr('data-open', 'true');
			} else {
				_this.find(".open").removeClass("up");
				$('.subnav', _this).slideUp(150);
				_this.attr('data-open', 'false');
			}
		});
		$('.subnav a,.nav-box .name').bind('click', function(event) {
			event.stopPropagation();
		})
	}
}

// 手机导航
function iphone_header() {
	var Height = $('.header').height(),
		Cheight = $('.container').height(),
		Cwidth = $('.container').width(),
		isOpen = false,
		easing = 'easeOutQuart';
	$('.list-btn').bind('click', function() {
		if (isOpen == false) {
			var _this = $(this);
			_this.addClass('active')
			$('body').addClass('navopen')
			$('.overlay').show();
			isOpen = true;
		} else {
			_this.removeClass('active')
			$('.overlay').hide();
			$('body').removeClass('navopen')

			isOpen = false;
		}
	})
	$('.overlay').bind('click', function() {
		$('.list').removeClass('active');
		$('body').removeClass('navopen')
		$('.overlay').hide();

		isOpen = false;

	});

}


function h1_padding() {
	var _width = $(window).width();
	if (_width > 640) {
		if ($('.index .row02').size() > 0) {
			$('.box').each(function() {
				var _this = $(this);
				_this.hover(function() {
					var _height01 = _this.find('h1').height(),
						_height02 = _this.find('.text-details').height(),
						_height03 = _this.height();
					_this.find('h1').css({
						'padding-top': 15 + 'px',
						'margin-top': 0
					})
				}, function() {
					_this.find('h1').css({
						'padding-top': 0,
						'margin-top': 25 + '%'
					})
				})
			})
		}
	}

}

function cont_padding2() {
	var _width = $(window).width();
	if ($('.treasury').size() > 0) {
		$('.treasury .box').each(function() {
			var _this = $(this);
			_this.hover(function() {
				var _height01 = _this.height(),
					_height02 = _this.find('h3').height();
				_this.find('h3').css({
					'padding-top': (_height01 - _height02) / 2
				})
			}, function() {
				_this.find('h3').css({
					'padding-top': 0
				})
			})
		})

		setTimeout(function() {
			$('.treasury .box').each(function() {
				var _this = $(this);
				_this.hover(function() {
					var _height01 = _this.height(),
						_height02 = _this.find('h3').height();
					_this.find('h3').css({
						'padding-top': (_height01 - _height02) / 2
					})
				}, function() {
					_this.find('h3').css({
						'padding-top': 0
					})
				})
			})
		}, 500);
	}

}

function cont_padding() {
	var _width = $(window).width();
	if (_width > 640) {
		if ($('.culture-page').size() > 0) {
			$('#page2 .i-text').each(function() {
				var _this = $(this);
				_this.hover(function() {
					var _height01 = _this.height(),
						_height02 = _this.find('.i-cont').height();
					_this.find('.i-cont').css({
						'padding-top': (_height01 - _height02) / 2
					})
				}, function() {
					_this.find('.i-cont').css({
						'padding-top': 0
					})
				})
			})
		}
	}

}

var bool = true;

function listScroll(dir) {
	var olist;
	if (bool) {
		bool = false;
		olist;
		if (arguments.length == 1) olist = $('#listScroll').find('ul');
		else olist = $(arguments[1]).closest('.cont-box').find('ul');
		var oWith = olist.width(),
			piw = olist.find("li").width(),
			pilength = olist.find("li").length;


		if (dir == 'left') {
			olist.css('width', oWith + piw + 'px').find("li:first").clone().appendTo(olist);
			olist.animate({
				"margin-left": -(piw) + "px"
			}, 500, function() {
				olist.find("li:first").remove();
				olist.css({
					"margin-left": "0px",
					"width": oWith
				});
				bool = true;
			});
		} else if (dir == "right") {
			olist.css({
				"width": oWith + piw + 'px',
				'margin-left': -piw + 'px'
			}).find("li:last").clone().prependTo(olist);
			olist.animate({
				"margin-left": "0px"
			}, 500, function() {
				olist.find("li:last").remove();
				olist.css({
					"width": oWith
				});
				bool = true;
			});
		}
	}
};

function fnListSize(n, m) {
	var countList = $("#" + n + " .list-text").find('>ul>li').length;
	var fWidth = $("#" + n + " .list-text").width();
	var bWidth = $("#" + n).width();
	var cWidth = $(window).width();
	var aWidth;
	if (m == 6) aWidth = bWidth - 78;
	else if (m == 3) aWidth = bWidth - 300;
	else if (m == 2) aWidth = bWidth - 100;
	else if (m == 1) aWidth = bWidth - 40;


	var rWidth = Math.floor(aWidth / m);
	var mWidth = Math.floor(fWidth / m);
	$("#" + n + " .list-text").find('>ul>li').width(rWidth);
	var objWidth = $("#" + n + " .list-text").find('>ul>li').eq(0).width();
	var totWidth = Math.floor(countList * objWidth);
	$("#" + n + " .list-text").find('>ul').width(totWidth);
	$('#' + n + ' .list-text').css('width', aWidth);
}

function fnListSize2(n, m) {
	var countList = $("#" + n + " .list-text").find('>ul>li').length;
	var fWidth = $("#" + n + " .list-text").width();
	var bWidth = $("#" + n).width();
	var cWidth = $(window).width();
	var aWidth;
	if (m == 3) aWidth = bWidth - 10;

	var rWidth = Math.floor(aWidth / m);
	var mWidth = Math.floor(fWidth / m);
	$("#" + n + " .list-text").find('>ul>li').width(rWidth);
	var objWidth = $("#" + n + " .list-text").find('>ul>li').eq(0).width();
	var totWidth = Math.floor(countList * objWidth);
	$("#" + n + " .list-text").find('>ul').width(totWidth);
	$('#' + n + ' .list-text').css('width', aWidth);
}

function init() {
	var _Width = $(window).width(),
		container = 'listScroll';
	if (_Width > 1024) {
		fnListSize(container, 3);
	} else if (_Width > 768) {
		fnListSize(container, 2);
	} else {
		fnListSize(container, 1);
	}
};