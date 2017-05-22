$(function() {
	(function() {
		var _width = $(window).width(),
			_height = $(window).height();
		setTimeout(function() {
			$('.bg_pa_img').responsiveImg({
				_parent: '.bg_pa',
				_selfW: 1600,
				_selfH: 725
			});
		},2000);
		if (_width > 960 && _height > 768) {
			init_index();
			$('.animationbox').css({
				'height': $(window).height()
			});
		}
	})();

})


// index - start
init_index = function() {
		var _width = $(window).width(),
			_height = $(window).height();
		jarallax = new Jarallax();
		if (_width > 960 && _height > 768) {
			jarallax.setDefault('#page1', {
				top: '0'
			});
			jarallax.setDefault('#page1 .bg_pa', {
				top: '2%'
			});
//			jarallax.setDefault('#page2', {
//				top: '100%'
//			});
//			jarallax.setDefault('#page2 .bg_pa', {
//				top: '-20%'
//			});
			jarallax.setDefault('#page3', {
				top: '100%'
			});
			jarallax.setDefault('#page3 .bg_pa', {
				top: '-20%'
			});
			//jarallax.setDefault('#page4', {
//				top: '100%'
//			});
//			jarallax.setDefault('#page4 .bg_pa', {
//				top: '-20%'
//			});
			jarallax.setDefault('#page5', {
				top: '100%'
			});
			jarallax.setDefault('#page5 .bg_pa', {
				top: '-20%'
			});
			jarallax.setDefault('.ft-box', {
				bottom: '-100px'
			});

			jarallax.addAnimation('#page1', [{
				progress: "0%",
				top: "2%",
				event: {
					animating: dotActive
				}
			}, {
				progress: "40%",
				top: "-100%"
			}]);
			jarallax.addAnimation('#page1', [{
				progress: "40%",
				top: "-100%"
			}, {
				progress: "100%",
				top: "-130%"
			}]);
			jarallax.addAnimation('#page1 .bg_pa', [{
				progress: "0%",
				top: "0%"
			}, {
				progress: "40%",
				top: "20%"
			}]);
			jarallax.addAnimation('#page1 .bg_pa', [{
				progress: "40%",
				top: "0%"
			}, {
				progress: "100%",
				top: "20%"
			}]);

			jarallax.addAnimation('#page3', [{
				progress: "0%",
				top: "101%",
				event: {
					animating: dotActive
				}
			}, {
				progress: "40%",
				top: "0%"
			}]);
			jarallax.addAnimation('#page3', [{
				progress: "40%",
				top: "0%"
			}, {
				progress: "100%",
				top: "-100%"
			}]);

			jarallax.addAnimation('#page3', [{
				progress: "100%",
				top: "-100%"
			}, {
				progress: "100%",
				top: "-100%"
			}]);
			jarallax.addAnimation('#page3 .bg_pa', [{
				progress: "0%",
				top: "-20%"
			}, {
				progress: "40%",
				top: "0%"
			}]);
			jarallax.addAnimation('#page3 .bg_pa', [{
				progress: "40%",
				top: "0%"
			}, {
				progress: "80%",
				top: "20%"
			}]);
			jarallax.addAnimation('#page3 .bg_pa', [{
				progress: "80%",
				top: "20%"
			}, {
				progress: "100%",
				top: "20%"
			}]);
			jarallax.addAnimation('#page3 .ele_text', [{
				progress: "0%",
				top: "-50%"
			}, {
				progress: "30%",
				top: "18%"
			}]);
			jarallax.addAnimation('#page3 .ele_text', [{
				progress: "30%",
				top: "18%"
			}, {
				progress: "60%",
				top: "20%"
			}]);
			jarallax.addAnimation('#page3 .ele_text', [{
				progress: "60%",
				top: "20%"
			}, {
				progress: "100%",
				top: "20%"
			}]);

			jarallax.addAnimation('#page5', [{
				progress: "40%",
				top: "100%",
				event: {
					animating: dotActive
				}
			}, {
				progress: "90%",
				top: "0%"
			}]);
			jarallax.addAnimation('#page5', [{
				progress: "90%",
				top: "0px"
			}, {
				progress: "100%",
				top: "-70px"
			}]);
			jarallax.addAnimation('#page5 .bg_pa', [{
				progress: "60%",
				top: "-20%"
			}, {
				progress: "100%",
				top: "0%"
			}]);
			jarallax.addAnimation('#page5 .bg_pa', [{
				progress: "100%",
				top: "0%"
			}, {
				progress: "100%",
				top: "0%"
			}]);



			jarallax.addAnimation('.footer', [{
				progress: "90%",
				bottom: "-148px",
				event: {
					animating: dotActive
				}
			}, {
				progress: "100%",
				bottom: "0px"
			}]);
		}


	}
	// index - end