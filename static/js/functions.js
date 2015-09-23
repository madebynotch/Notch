$(document).ready(function(){

	var win = $(window);

	var old_window_w = $(window).width()
	var old_window_h = $(window).height()

	// From Modernizr
    function whichTransitionEvent() {
		var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd',
		}

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
			}
		}
	}

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
		// Init variable for tracking if sliding is taking place
		self.sliding = false;
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

		self.realHeight = function() {
			return parseInt($(self.element).css('height').replace('px',''));
		}

		self.scrollToSlide = function(i,method) {
			// Set `sliding` to `true`, preventing unecessary events
			self.sliding = true;
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
				if (self.navigation_links != null) {
					$(self.navigation_links[self.active_slide]).removeClass('active');
				}
				// Store the active slide when the method was started
				var prev_active_slide = self.active_slide;
				// Set the active slide variable to the specified slide
				self.active_slide = i;
				// Add the "active" class to the specified slide amd
				// its matching link in the slider navigation
				$(self.slides[i]).addClass('active');
				if (self.navigation_links != null) {
					$(self.navigation_links[i]).addClass('active');
				}
				// Animate the slider to up or down to switch to the
				// specified slide, 250ms per slide moved
				if (self.direction == "vertical") {
					// $(self.slides[i]).css({
					// 	'top': (0 - self.realHeight()) + "px",
					// });

					for (var j=0;j<self.slides.length;j++) {
						slide = $(self.slides[j]);
						if (j < i) {
							slide.css({
								// 'top': (0 - self.realHeight()) + "px",
								'height': "0px",
							});
							slide.children('.slide-wrapper').css({
								'opacity': 0,
								'transition-delay': "0",
							});
						}
						else {
							slide.css({
								// 'top': 0,
								'height': self.realHeight() + "px",
							});
							slide.children('.slide-wrapper').css({
								'opacity': 1,
								'transition-delay': "0.2s",
							});
						}
					}
					// self.wrapper.animate({
					// 	'top': (0 - (i * self.realHeight())) + "px"
					// },{
					// 	duration: 450 * diff,
					// 	complete: function(){
					// 		// If the slide was changed by a keyboard event
					// 		// or a slider navigation link
					// 		if (method && (method == 'jump' || method == 'left' || method == 'right')) {
					// 			// update the pseudoY variable
					// 			self.pseudoY = i * self.element.height();
					// 		}
					// 	}
					// });
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
							self.sliding = false;
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
			if (self.direction == "vertical") {
				// Append slider-nav to the end of the slider element
				self.element.append('<ul class="slider-nav"></ul>');
				self.navigation = self.element.children('.slider-nav');
				// Give the slider-nav the "vertical" class if its parent has it
				self.navigation.addClass('vertical');
				self.element.append('<div class="slider-controls"><a href="" class="slider-next"><i class="fa fa-long-arrow-down"></i></a></div>');
				self.next_link = self.element.find('.slider-next');
			}
			else {
				self.element.append('<div class="slider-controls"><a href="" class="slider-prev"><i class="fa fa-long-arrow-left"></i></a><a href="" class="slider-next"><i class="fa fa-long-arrow-right"></i></a></div>');
				self.prev_link = self.element.find('.slider-prev');
				self.next_link = self.element.find('.slider-next');
				$(self.prev_link).on('click',function(e){
					e.preventDefault();
					// Jump to the previous slide
					if (self.sliding == false) {
						self.scrollToSlide(self.active_slide - 1,"left");
					}
				});
			}
			$(self.next_link).on('click',function(e){
				e.preventDefault();
				// Jump to the next slide
				if (self.sliding == false || self.direction == "vertical") {
					self.scrollToSlide(self.active_slide + 1,"right");
				}
			});

			if (self.direction == "vertical") {
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
		}

		// Function to resize slider to fit window
		self.resizeSlider = function() {
			// console.log("resizing slider")
			self.element.css({
				'width': ($(window).width() + 2) + 'px',
				'height': ($(window).height() + 2) + 'px'
			});
			if ($(window).width() < 768) {
				// console.log("compensating for shifting nav");
				// self.element.css('height', ($(window).height() + 300) + "px" )
			}
			self.wrapper.css('height', ($(window).height() + 2) + 'px');
			if (self.direction == "horizontal") {
				self.wrapper.css({
					'width': self.element.width() * (self.slides.length + 2),
					'left': (0 - self.element.width())
				})
			}
			for(var i=0;i<self.slides.length;i++){
				if (self.direction == "vertical") {
					$(self.slides[i]).css({
						// 'top': (i * self.realHeight()) + "px",
						'top': 0,
						'z-index': 90 - (i * 10)
					});
					var wrapper = $(self.slides[i]).children('.slide-wrapper');
					// console.log(wrapper.css('margin-bottom'));
					var delay = setTimeout(function(){
						wrapper.css('margin-bottom',(10 - (wrapper[0].clientHeight) / 2) + "px");
					},5);
					// console.log(wrapper.css('margin-bottom'));
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
			if (img.height() < self.realHeight()) {
				img.css('width', img.width() * (self.realHeight()) / img.height());
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
					if (self.navigation_links != null) {
						$(self.navigation_links[i]).addClass('active');
					}
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
						if (!self.sliding) {
							self.scrollToSlide(new_active_slide);
						}
					}
				}
			}
		}

		self.init = function() {
			self.initNavigation();
			self.resizeSlider();
			self.initSlides();

			if (self.direction == "vertical") {
				$(window).on("scroll",function(e){
					e.preventDefault();
				});
				document.addEventListener("touchmove",function(e){
					e.preventDefault();
				});

				var transitionEvent = whichTransitionEvent();
				transitionEvent && self.element[0].addEventListener(transitionEvent, function(e){
					if ($(e.target).hasClass('slide')) {
						self.pseudoY = self.active_slide * self.realHeight();
						self.sliding = false;
					}
				});
			}
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
				if (sliders[i].sliding == false) {
					sliders[i].onScrollEvent(e);
				}
			}
		});
	}

	// If there are sliders, attach event handlers
	if (sliders.length) {
		// Alias keys
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = {33: -1, 34: 1, 37: -1, 38: -1, 39: 1, 40: 1};
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
					if (sliders[i].sliding == false) {
						sliders[i].scrollToSlide(sliders[i].active_slide + keys[e.keyCode],method);
					}
				}
			}
		});

		$(window).on('resize',function(e){
			if (($(window).width() > 768) || (Math.abs($(window).height() - old_window_h) > 40)) {
				for(var i=0;i<sliders.length;i++){
					sliders[i].resizeSlider();
				}
			}
		});

		$(window).on('load',function(e){
			for(var i=0;i<sliders.length;i++){
				sliders[i].resizeImgs();
			}
		});

		// Attach Hammer event handlers
		if (Hammer) {
			hammers = [];
			// body = document.getElementsByTagName('body')[0];
			// bodyHammer = new Hammer(body);
			// bodyHammer.on('swipe',function(e){
			// 	alert(e.type)
			// });

			for(var i=0;i<sliders.length;i++) {
				var slider = sliders[i];
				var hammer = new Hammer(slider.element[0]);
				directions = {
					'swipeup': 1,
					'swipeleft': 1,
					'swipedown': -1,
					'swiperight': -1,
				}
				if (slider.direction == "vertical") {
					hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
					hammer.on('swipeup swipedown',function(e){
						slider.scrollToSlide(slider.active_slide + directions[e.type]);
					});
				}
				else {
					hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
					hammer.on('swipeleft swiperight',function(e){
						var method;
						if (e.type == 'swipeleft') {
							method = "right";
						} else if (e.type == 'swiperight') {
							method = "left";
						}
						slider.scrollToSlide(slider.active_slide + directions[e.type], method);
					});
				}
			}
		}
	}
	// END Slider logic

	bodyScroll = $('#body-scroll-wrapper');

	// Listen for a transition!
    if (document.getElementById("nav") != null) {
        transitionEvent = whichTransitionEvent();
        transitionEvent && $('nav')[0].addEventListener(transitionEvent, function(e){
            if (e.target.id == "nav-right") {
				// console.log("transition end");
				var nav = $(e.target);
				nav.removeClass("fading");
				if (nav.hasClass("fading-in")) {
					nav.addClass("open");
					nav.removeClass("fading-in");
				}
				else if (nav.hasClass("fading-out")) {
					nav.removeClass("fading-out");
					bodyScroll.removeClass('lock');
				}
			}
		});
	}

	// Navigation logic
	var openNav = function() {
		nav = $('.nav-right');
		nav.addClass('fading');
		$('.nav-toggle').addClass('open');
		bodyScroll.addClass('lock');
		var timeout = setTimeout(function(){
			nav.addClass('fading-in');
		},10);

	}

	var closeNav = function() {
		nav = $('.nav-right');
		nav.addClass('fading');
		$('.nav-toggle').removeClass('open');
		var timeout = setTimeout(function(){
			nav.addClass('fading-out');
			nav.removeClass('open');
		},10);
	}

	$('.nav-toggle').on('click',function(e){
		if (!$('.nav-right').hasClass('fading') && !$('.nav-right').hasClass('open')) {
			openNav();
		}
		else {
			closeNav();
		}
	});

	if($('#share-button')[0]) {
		popupTransition = false;

		function openPopup(){
			popupTransition = true;
			popup.removeClass('closed');
			delayClass = setTimeout(function(){
				popup.addClass('open');
				popupTransition = false;
			},10);
		}
		function closePopup(){
			popupTransition = true;
			popup.removeClass('open');
		}

		// Close the popup if anywhere other than the popup is clicked
		$('body').on('click', function(e){
			popup = $('#share__popup');
			isSocialLink = ($(e.target).closest('.popup__social-link')[0] ? true : false);
			isPopup = ($(e.target).closest('#share__popup')[0] ? true : false);
			if(popup.hasClass('open') && (!isSocialLink || !isPopup)) {
				closePopup();
			}
		});

		$('#share-button').on('click', function(e){
			e.preventDefault();
			if(!popupTransition) {
				popup = $('#share__popup');
				if(popup.hasClass('closed')) {
					openPopup();
				}
				else if(popup.hasClass('open')){
					closePopup();
				}
			}
		});

		$('.popup__social-link:not(.email-link)').on('click',function(e){
			e.preventDefault();
			var href = $(this).attr('href');
			if(href.includes('mailto:')) {
				window.location.href = href;
			}
			else {
				// console.log($(this).attr('href'));
				window.open($(this).attr('href'),'Share Case Study','left=20,top=20,width=600,height=450,toolbar=1,resizable=0');
			}
		})

		transitionEvent = whichTransitionEvent();
        transitionEvent && $('#share__popup')[0].addEventListener(transitionEvent, function(e){
			popup = $('#share__popup');
			if(!popup.hasClass('open') && !popup.hasClass('closed')) {
				popup.addClass('closed');
				popupTransition = false;
			}
		});
	}


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
