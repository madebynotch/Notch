// The functionality still needs to optimized, specifically by using "transform(translate)" to adjust the position of the slides rather than animating the "top" property, as the current method will expend more resources as the browser re-renders (or may not need to worry about it because it's using jQuery's "animate", not any CSS transitions or animations?). Could most likely optimize the selectors, such as storing them to be re-used whenever possible.
$(document).ready(function(){
	var win_w = $(window).width();
	var win_h = $(window).height();
	var slider = $('.slider');
	$('.slider').before('<ul class="slider-nav"></ul>')
	var slide_nav = $('.slider-nav');
	var slides = slider.children('.slide');

	var resizeSlider = function() {
		slider.css({
			'width':win_w + 'px',
			'height':win_h + 'px'
		});
	}

	resizeSlider();

	for(var i=0;i<slides.length;i++){
		$('.slider-nav').append('<li class="slider-link" data-slide="'+i+'"></li>');
	}
	var slide_links = $('.slider-nav').children()

	var resizeImg = function(img) {
		win_a = win_w / win_h

		img.css('width', win_w);
		img_w = img.width();
		img_h = img.height();
		if (img_h < win_h) {
			img.css('width', img_w * win_h / img_h);
			img_w = img.width();
		}
		img.css('left', (win_w - img_w) / 2)
	}

	for(var i=0;i<slides.length;i++){
		img = $(slides[i]).children('img');
		img.each(function(){
			resizeImg($(this));
		});
		$(slides[i]).attr('id','slide'+i);
		$(slide_links[i]).attr('id','slide_link'+i);
		$(slides[i]).css('top',i*win_h)
		if (i==0) {
			$(slides[i]).addClass('active');
			$(slide_links[i]).addClass('active');
		}
	}
	slide_nav.css('margin-top',0 - (slide_nav.height() / 2) + "px");
	pseudoY = 0;
	maxPseudoY = win_h * (slides.length - 1);
	active_slide = 0;

	function scrollToSlide(i,method) {
		if (active_slide != i && i >= 0 && i < slides.length) {
			diff = Math.abs(active_slide - i);
			active_slide = i;
			$('.slide.active').removeClass('active');
			$('.slider-link.active').removeClass('active');
			$(slides[i]).addClass('active');
			$(slide_links[i]).addClass('active');
			$('.slider').animate({
				'top': (0 - (i * win_h)) + "px"
			},{
				duration: 250 * diff,
				complete: function(){
					if (method && method == 'jump') {
						pseudoY = i * win_h;
						// console.log(pseudoY);
						$('.progress-bar').animate({
							'width': (pseudoY / maxPseudoY * 100) +"%"
						},200);
					}
				}
			});
		}
	}

	$(window).on('resize',function(e){
		win_w = $(window).width();
		win_h = $(window).height();

		resizeSlider();

		for(var i=0;i<slides.length;i++) {
			img = $(slides[i]).children('img');
			img.each(function(){
				resizeImg($(this));
			});
		}
	})

	$(window).on('wheel',function(e){
		y = e.originalEvent.deltaY;
		if (y == -0) {
			y = 0;
		}
		if (y != 0) {
			pseudoY += ((Math.sqrt(Math.abs(y)) * 3) + (Math.abs(y) * 1 / 4)) * (y / Math.abs(y));
			if (pseudoY > maxPseudoY) {
				pseudoY = maxPseudoY;
			}
			if (pseudoY < 0) {
				pseudoY = 0;
			}
			// console.log(pseudoY);
			var new_active_slide = Math.round(pseudoY / win_h);
			if (new_active_slide != active_slide) {
				scrollToSlide(new_active_slide);
			}
			$('.progress-bar').css('width',(pseudoY / maxPseudoY * 100)+"%");
		}
	});

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {32: 1, 33: -1, 34: 1, 37: -1, 38: -1, 39: 1, 40: 1};
	$(window).on('keydown',function(e){
		if (e.keyCode in keys) {
			scrollToSlide(active_slide + keys[e.keyCode],'jump');
		}
	})

	$('.slider-link').on('click',function(){
		var new_active_link = parseInt($(this).attr('data-slide'));
		scrollToSlide(new_active_link,'jump');
	})

	// $('body').click(function(){
	// 	$(window).scrollTop(0);
	// })
});