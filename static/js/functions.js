// The functionality still needs to optimized, specifically by using "transform(translate)" to adjust the position of the slides rather than animating the "top" property, as the current method will expend more resources as the browser re-renders (or may not need to worry about it because it's using jQuery's "animate", not any CSS transitions or animations?). Could most likely optimize the selectors, such as storing them to be re-used whenever possible.
$(document).ready(function(){

	var win = $(window);

	// Slider Setup
	// ============

	// Slider object construtor
	var Slider = function(selector,params) {
		// Alias 'this'
		var self = this;
		// Store jQuery selector for the whole slider
		self.element = $(selector);
		// Store jQuery selector for the slider wrapper (this will be moved when
		//  switching between slides)
		self.wrapper = self.element.children('.slider-wrapper');
		// Set slider's direction for changing slides
		self.direction = (self.element.hasClass('vertical') ? "vertical" : "horizontal");
		// Init variable for slider navigation selectors
		self.navigation = null;
		self.navigation_links = null;
		self.prev_link = null;
		self.next_link = null;
		// Store array of child DOM elements with class 'slide'
		self.slides = self.element.find('.slide');
		// Init object for phantom first and last slides on horizontal slider
		if (self.direction == "horizontal") {
			// Add a phantom last slide to the beginning of the slider
			self.wrapper.prepend($(self.slides[self.slides.length - 1]).clone());
			phantom_last = $(self.wrapper.children()[0]);
			phantom_last.removeClass("slide").addClass("slide-phantom-last");
			// Add a phantom first slide to the end of the slider
			self.wrapper.append($(self.slides[0]).clone());
			phantom_first = $(self.wrapper.children()[self.wrapper.children().length - 1]);
			phantom_first.removeClass("slide").addClass("slide-phantom-first");
			self.phantom_slides = {
				first: phantom_first,
				last: phantom_last
			}
		}
		// Initialize the active slide
		self.active_slide = 0
		// Initialize the pseudoY variable
		self.pseudoY = 0
		// Initialize the max_pseudoY variable
		self.max_pseudoY = $(window).height() * (self.slides.length - 1);

		self.scrollToSlide = function(i,method) {
			// If the slider is horizontal, allow it to loop
			if (self.direction == "horizontal") {
				if (i >= self.slides.length) {
					i = 0;
				}
				if (i < 0) {
					i = self.slides.length - 1;
				}
			}
			// Initialize "loop" as being false
			var loop = false;
			// If the specified slide is already selected,
			// the specified slide is not a negative number,
			// and the specified slide is within the range of the slider
			if (self.active_slide != i && i >= 0 && i < self.slides.length) {
				// Calculate the number of slides between the specified slide
				// and the currently active slide
				diff = Math.abs(self.active_slide - i);
				// Remove the "active" class from the current slide and
				// its matching link in the slider navigation
				$(self.slides[self.active_slide]).removeClass('active');
				$(self.navigation_links[self.active_slide]).removeClass('active');
				// Store the active slide when the method was started
				var prev_active_slide = self.active_slide;
				// Set the active slide variable to the specified slide
				self.active_slide = i;
				// Add the "active" class to the specified slide amd
				// its matching link in the slider navigation
				$(self.slides[i]).addClass('active');
				$(self.navigation_links[i]).addClass('active');
				// Animate the slider to up or down to switch to the
				// specified slide, 250ms per slide moved
				if (self.direction == "vertical") {
					self.wrapper.animate({
						'top': (0 - (i * self.element.height())) + "px"
					},{
						duration: 250 * diff,
						complete: function(){
							// If the slide was changed by a keyboard event
							// or a slider navigation link
							if (method && (method == 'jump' || method == 'left' || method == 'right')) {
								// update the pseudoY variable
								self.pseudoY = i * self.element.height();
							}
						}
					});
				}
				else {
					// Initialize "anim_i" as null
					var anim_i = null;
					// Check to see if the requested slide is at the opposite end
					// of the list of slides. If so, set "anim_i" as being
					// incremented once more in the direction requested
					// (either left or right) and set loop as true
					if (i == 0 && prev_active_slide == self.slides.length - 1 && method == "right") {
						anim_i = self.slides.length;
						loop = true;
						diff = 1;
					}
					else if (i == self.slides.length - 1 && prev_active_slide == 0 && method == "left") {
						anim_i = -1;
						loop = true;
						diff = 1;
					}
					else {
						anim_i = i;
					}
					anim_i++;
					i++;
					self.wrapper.animate({
						'left': (0 - (anim_i * self.element.width())) + "px"
					},{
						duration: 250 * diff,
						step: function(){
							// console.log(self.wrapper.css('left'));
						},
						complete: function(){
							if(loop) {
								self.wrapper.css('left',(0 - (i * self.element.width())) + "px")
								loop = false;
							}
						}
					});
				}

				if (self.direction == "vertical") {
					// If the specified slide is the last slide in the slider
					if (self.active_slide >= self.slides.length - 1) {
						// Hide the "slider-next" link
						$(self.next_link).fadeOut(200);
					}
					// If the "slider-next" link is not visible
					else if ($(self.next_link).css('display') == "none") {
						// Show the "slider-next" link
						$(self.next_link).fadeIn(200);
					}
				}
			}
		}

		// Function to initialize navigation and return nav element
		self.initNavigation = function() {
			// Append slider-nav to the end of the slider element
			self.element.append('<ul class="slider-nav"></ul>');
			self.navigation = self.element.children('.slider-nav');
			// Give the slider-nav the "vertical" class if its parent has it
			if (self.direction == "vertical") {
				self.navigation.addClass('vertical');
				self.element.append('<div class="slider-controls"><a href="" class="slider-next">&darr;</a></div>');
				self.next_link = self.element.find('.slider-next');
			}
			else {
				self.element.append('<div class="slider-controls"><a href="" class="slider-prev">&larr;</a><a href="" class="slider-next">&rarr;</a></div>');
				self.prev_link = self.element.find('.slider-prev');
				self.next_link = self.element.find('.slider-next');
				$(self.prev_link).on('click',function(e){
					e.preventDefault();
					// Jump to the previous slide
					self.scrollToSlide(self.active_slide - 1,"left");
				});
			}
			$(self.next_link).on('click',function(e){
				e.preventDefault();
				// Jump to the next slide
				self.scrollToSlide(self.active_slide + 1,"right");
			});

			// For each slide in the slider, add a link to the slider navigation
			for(var i=0;i<self.slides.length;i++){
				self.navigation.append('<li class="slider-link" data-slide="'+i+'"></li>');
			}
			self.navigation_links = self.navigation.children();

			// Attach event listener to each nav link element
			self.navigation_links.on('click',function(){
				// Alias the specified link from the "data-slide" attribute
				var new_active_link = parseInt($(this).attr('data-slide'));
				// Jump to the specified slide
				self.scrollToSlide(new_active_link,'jump');
			});
		}

		// Function to resize slider to fit window
		self.resizeSlider = function() {
			self.element.css({
				'width': $(window).width() + 'px',
				'height': $(window).height() + 'px'
			});
			self.wrapper.css('height', self.element.height());
			if (self.direction == "horizontal") {
				self.wrapper.css({
					'width': self.element.width() * (self.slides.length + 2),
					'left': (0 - self.element.width())
				})
			}
			for(var i=0;i<self.slides.length;i++){
				if (self.direction == "vertical") {
					$(self.slides[i]).css('top',i*self.element.height());
					self.navigation.css('margin-top',0 - (self.navigation.height() / 2) + "px");
				}
				else {
					$(self.slides[i]).css('left',(i + 1) * self.element.width());
				}
				self.resizeImg(self.slides[i]);
			}
			if (self.direction == "horizontal") {
				self.phantom_slides.last.css('left',0);
				self.phantom_slides.first.css('left',((self.slides.length + 1) * self.element.width()));
				self.resizeImg(self.phantom_slides.first);
				self.resizeImg(self.phantom_slides.last);
			}
		}

		self.resizeImg = function(slide) {
			// NOTE: this could be simplified for the current use case by
			// attaching the image's size in attributes on its tag.
			img = $(slide).children('img');
			// Set the image width to the width of the window
			img.css('width', self.element.width());
			// If the image height is less than the window height,
			// scale the image up until the image covers the window area
			if (img.height() < self.element.height()) {
				img.css('width', img.width() * self.element.height() / img.height());
			}
			// Adjust the image's left property to center the image in the window
			img.css('left', ($(window).width() - img.width()) / 2);
		}

		self.resizeImgs = function() {
			for(var i=0;i<self.slides.length;i++){
				self.resizeImg(self.slides[i]);
			}
		}

		self.initSlides = function() {
			for(var i=0;i<self.slides.length;i++){
				$(self.slides[i]).attr('id','slide'+i);
				if (self.navigation_links != null) {
					$(self.navigation_links[i]).attr('id','slide_link'+i);
				}
				if (i==0) {
					$(self.slides[i]).addClass('active');
					$(self.navigation_links[i]).addClass('active');
				}

				self.resizeImg(self.slides[i]);
			}
		}

		self.onScrollEvent = function(e) {
			if (self.direction == 'vertical') {
				y = e.originalEvent.deltaY;
				if (y == -0) {
					y = 0;
				}
				if (y != 0) {
					self.pseudoY += ((Math.sqrt(Math.abs(y)) * 3) + (Math.abs(y) * 1 / 4)) * (y / Math.abs(y));
					if (self.pseudoY > self.max_pseudoY) {
						self.pseudoY = self.max_pseudoY;
					}
					if (self.pseudoY < 0) {
						self.pseudoY = 0;
					}
					// console.log(pseudoY);
					var new_active_slide = Math.round(self.pseudoY / $(window).height());
					if (new_active_slide != self.active_slide) {
						self.scrollToSlide(new_active_slide);
					}
				}
			}
		}

		self.init = function() {
			self.initNavigation();
			self.resizeSlider();
			self.initSlides();
		}
	}

	// Initialize sliders
	sliders = [];
	$('.slider').each(function(){
		var new_slider = new Slider(this);
		new_slider.init();
		sliders.push(new_slider);
	});

	// If there is a vertical slider, attach event handlers
	if ($('.slider.vertical')[0]) {
		$(window).on('wheel',function(e){
			for(var i=0;i<sliders.length;i++){
				sliders[i].onScrollEvent(e);
			}
		});
	}

	// If there are sliders, attach event handlers
	if (sliders.length) {
		// Alias keys
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = {32: 1, 33: -1, 34: 1, 37: -1, 38: -1, 39: 1, 40: 1};
		// On keydown event
		$(window).on('keydown',function(e){
			// If pressed key is one of the keys being listened for
			if (e.keyCode in keys) {
				for(var i=0;i<sliders.length;i++){
					method = "jump";
					if (sliders[i].direction == "horizontal") {
						if (e.keyCode == 37) {
							method = "left";
						}
						else if (e.keyCode == 39) {
							method = "right";
						}
					}
					// Jump to the previous or next slide, using either
					// 1 or -1 from the "keys" object
					sliders[i].scrollToSlide(sliders[i].active_slide + keys[e.keyCode],method);
				}
			}
		});

		$(window).on('resize',function(e){
			for(var i=0;i<sliders.length;i++){
				sliders[i].resizeSlider();
			}
		});

		$(window).on('load',function(e){
			for(var i=0;i<sliders.length;i++){
				sliders[i].resizeImgs();
			}
		});
	}
	// END Slider logic


	// Fallback for "background-size: cover"
	if(!Modernizr.backgroundsize) {
		$('.in-list__image').each(function(){
			if($(this).css('background-image') != "none") {
				imgWidth = $(this).attr('data-img-width');
				imgHeight = $(this).attr('data-img-height');
				blockWidth = $(this).width();
				blockHeight = $(this).height();

				newImgWidth = blockWidth;
				newImgHeight = newImgWidth / imgWidth * imgHeight;

				if(newImgHeight < blockHeight) {
					newImgWidth = imgWidth * blockHeight / imgHeight;
					newImgHeight = blockHeight;
				}
				bgSize = newImgWidth + "px " + newImgHeight + "px";
				$(this).css('background-size',bgSize);
			}
		});
	};


	// Fallback for SVG
	if(!Modernizr.svg) {
		$("img[src$='.svg']").each(function(){
			if($(this).hasAttr('data-fallback')) {
				$(this).attr('src',$(this).hasAttr('data-fallback'));
			}
			else {
				$(this).attr('src',$(this).attr('src').replace('svg','png'));
			}
		})
	}
});
