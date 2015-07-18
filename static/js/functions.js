// The functionality still needs to optimized, specifically by using "transform(translate)" to adjust the position of the slides rather than animating the "top" property, as the current method will expend more resources as the browser re-renders (or may not need to worry about it because it's using jQuery's "animate", not any CSS transitions or animations?). Could most likely optimize the selectors, such as storing them to be re-used whenever possible.
$(document).ready(function(){

	var win = $(window)

	// Slider Setup
	// ============

	var slider = $('.slider');
	// Add and alias slider navigation
	slider.before('<ul class="slider-nav"></ul>');
	var slider_nav = $('.slider-nav');
	// Alias slides in slider
	var slides = slider.children('.slide');

	// Function to resize slider to fit window
	var resizeSlider = function() {
		slider.css({
			'width': win.width() + 'px',
			'height': win.height() + 'px'
		});
	}

	resizeSlider();

	// For each slide in the slider, add a link to the slider navigation
	for(var i=0;i<slides.length;i++){
		slider_nav.append('<li class="slider-link" data-slide="'+i+'"></li>');
	}
	// Alias the links in the slider navigation
	var slide_links = slider_nav.children()

	// Function to resize slider images
	var resizeImg = function(img) {
		// Set the image width to the width of the window
		img.css('width', win.width());
		// If the image height is less than the window height,
		// scale the image up until the image covers the window area
		if (img.height() < win.height()) {
			img.css('width', img.width() * win.height() / img.height());
		}
		// Adjust the image's left property to center the image in the window
		img.css('left', (win.width() - img.width()) / 2)
	}

	// Loop through the slides in the slider
	for(var i=0;i<slides.length;i++){
		// Alias the slide's image
		img = $(slides[i]).children('img');
		// Resize the slide's image to fit the window
		resizeImg(img);
		// Set slide's "id" attribute
		$(slides[i]).attr('id','slide'+i);
		// Set the "id" attribute on the matching link in
		// the slider navigation
		$(slide_links[i]).attr('id','slide_link'+i);
		// Position the slide appropriately in the list of slides
		$(slides[i]).css('top',i*win.height())
		// If this slide is the first, set the slide and its link
		// as having the "active" class
		if (i==0) {
			$(slides[i]).addClass('active');
			$(slide_links[i]).addClass('active');
		}
	}
	// position slider navigation in the center of the slider
	slider_nav.css('margin-top',0 - (slider_nav.height() / 2) + "px");


	// Initialize pseudoY, maxPseudoY, and active_slide variables
	pseudoY = 0;
	maxPseudoY = win.height() * (slides.length - 1);
	active_slide = 0;

	// Function to scroll to the specified slide in the slider
	function scrollToSlide(i,method) {
		// If the specified slide is already selected,
		// the specified slide is not a negative number,
		// and the specified slide is within the range of the slider
		if (active_slide != i && i >= 0 && i < slides.length) {
			// Calculate the number of slides between the specified slide
			// and the currently active slide
			diff = Math.abs(active_slide - i);
			// Set the active slide variable to the specified slide
			active_slide = i;
			// Remove the "active" class from the current slide and
			// its matching link in the slider navigation
			$('.slide.active').removeClass('active');
			$('.slider-link.active').removeClass('active');
			// Add the "active" class to the specified slide amd
			// its matching link in the slider navigation
			$(slides[i]).addClass('active');
			$(slide_links[i]).addClass('active');
			// Animate the slider to up or down to switch to the
			// specified slide, 250ms per slide moved
			$('.slider').animate({
				'top': (0 - (i * win.height())) + "px"
			},{
				duration: 250 * diff,
				complete: function(){
					// If the slide was changed by a keyboard event
					// or a slider navigation link
					if (method && method == 'jump') {
						// update the pseudoY variable
						pseudoY = i * win.height();
					}
				}
			});
			// If the specified slide is the last slide in the slider
			if (active_slide >= slides.length - 1) {
				// Hide the "slider-next" link
				$('.slider-next').fadeOut(200);
			}
			// If the "slider-next" link is not visible
			else if ($('.slider-next').css('display') == "none") {
				// Show the "slider-next" link
				$('.slider-next').fadeIn(200);
			}
		}
	}

	// When the "slider-next" button is clicked
	$('.slider-next').on('click',function(e){
		// Prevent default link behavior
		e.preventDefault();
		// Slide to the next link
		scrollToSlide(active_slide + 1);
	});

	// When the window is resized
	$(window).on('resize',function(e){
		resizeSlider();

		// Loop through slides
		for(var i=0;i<slides.length;i++) {
			// Alias the slide's image
			img = $(slides[i]).children('img');
			// Resize the slide's image to fit the window
			resizeImg(img);
		}
	})

	// On scroll or mousewheel events
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
			var new_active_slide = Math.round(pseudoY / win.height());
			if (new_active_slide != active_slide) {
				scrollToSlide(new_active_slide);
			}
			$('.progress-bar').css('width',(pseudoY / maxPseudoY * 100)+"%");
		}
	});

	// Alias keys
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = {32: 1, 33: -1, 34: 1, 37: -1, 38: -1, 39: 1, 40: 1};
	// On keydown event
	$(window).on('keydown',function(e){
		// If pressed key is one of the keys being listened for
		if (e.keyCode in keys) {
			// Jump to the previous or next slide, using either
			// 1 or -1 from the "keys" object
			scrollToSlide(active_slide + keys[e.keyCode],'jump');
		}
	});

	// When a "slider-link" button is clicked
	$('.slider-link').on('click',function(){
		// Alias the specified link from the "data-slide" attribute
		var new_active_link = parseInt($(this).attr('data-slide'));
		// Jump to the specified slide
		scrollToSlide(new_active_link,'jump');
	});
});