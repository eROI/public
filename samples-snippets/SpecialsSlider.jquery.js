/****
  *
  *	Date: June, 2014
  *	URL: http://www.koonsoffredericksburg.com/
  *  
  *	
  *	Purpose of this file: 
  *	This file converts a group of Specials into a Sliding widget
  *
  *	Requirements: Elastislide
  *
  ******/
  
  (function($) {
	
	$.SpecialsSlider = function(options) {
		
		var defaultOptions = {
			margin: 16,
			designFunc: function(i, el) {
				$('.InvInfoBox', el).removeClass('row').find('.columns').removeClass('columns eight four');
				$(el).removeClass('row').children('columns twelve');
			},
			class: '',
			showFlexSlider: true
		}
		
		var myOptions = $.extend({}, defaultOptions, options);
		
		var isPhone = ($(window).width() < 767);
		
		var maxHeight = 0;
		
		//$('<div class="InvSpecialBox isEmpty"/>').appendTo('#InvSpecialsBoxWrapper');
		
		//BEGIN OPERATIONS
		$('#InvSpecialsBoxWrapper .InvSpecialBox')
			//Manipulate each special to fit the desired design
			.each(myOptions.designFunc)
			//place specials in a list; wrap each special in a List Item
			.wrapAll('<ul id="SpecialsSlider"/>').wrap('<li/>')
		
		
		// if display is phone size, and the option to show Flexslider is true, show specials in flex slider
		if(isPhone && myOptions.showFlexSlider) {
			
			// Check to see Flexslider exists on page
			// If not, show error message
			if($.flexslider) {
				$('#SpecialsSlider').addClass('slides');
				$('#InvSpecialsBoxWrapper').addClass('flexslider ' + myOptions.class).flexslider({
					animation: 'fade',
					slideshow: false,
					slideshowSpeed: 2000,
					animationDuration: 600,
					controlsContainer: '.flex-container',
					controlNav: false    
				});    
			}
			else {
				if(window.console) console.log("ERROR: Flexslider not included");
			}
			
		}
		else {
			
			$('#InvSpecialsBoxWrapper').addClass('es-carousel ' + myOptions.class).elastislide({
				margin: myOptions.margin,
				onClick: function(el) {
					$('.InvSpecialVehicle', el).trigger('click');
				}
			}).wrap('<div id="SpecialsSliderContainer" class="es-carousel-wrapper"/>');
			
			
			// make all specials equal height
			$('#SpecialsSlider > li > .InvSpecialBox').each(function(i, el) {
				
				var h = $(el).height();
				if(h > maxHeight) maxHeight = h;
			}).height(maxHeight + 25);
			
			//.$('.InvSpecialBox.isEmpty').parent('li').css('background-color', 'transparent');
		}
		//if(window.console) console.log(maxHeight);
	};
	
})(jQuery);
