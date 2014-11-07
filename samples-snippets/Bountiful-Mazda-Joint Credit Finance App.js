/****
  *
  *	Date: June, 2014
  *	URL: http://www.bountifulmazda.com/finance/credit-application
  *  
  *	
  *	Purpose of this file: 
  *	This file converts a credit application into  a tabbed form used for Joint Credit App.
  *	The user can toggle form from Individual to joint. As the form toggles, the required fields
  *	for the co-applicant part also taggle.
  *
  *	TODOs: Add in Section headers
  *
  ******/
  

// Function used to make tabs for new tab panel
function customTab(text, target, isActive) {
   
	return $('<a href="#'+target+'" id="'+target+'" rel="'+target+'-Tab">'+text+'</a>').addClass('customTab ' + (isActive ? "active_customTab":"")).click(function(e) {
		e.preventDefault();
		var id = this.rel;
	   
		$('.active_customTab').removeClass('active_customTab');
	   
		$('.customTabContent').hide();
	   
		$(this).addClass('active_customTab');
	   
		$('#'+id).show();
	   
	});
}


	




$(function() {
	
	var primary = {
		start: 0,
		end: $('label:contains(Co-Applicant):first').parent().prev().index('#JointApp form > ul > li'),
		name: "Primary_Form_Section"
	}
	
	var coapp = { start: primary.end,
			end: $('label:contains(Co-Applicant):last').parent().index('#JointApp form > ul > li'),
			name: "Coapp_Form_Section"
	}
	
	var filterEls = function(i, start, end) { return (start <= i && i < end); };
	
	var formToggleTypeEl = $('#JointApp form > ul > li:first');
	
	//console.log(primary, $('form > ul > li').get(primary.end));
	//console.log(coapp, $('form > ul > li').get(coapp.end));
	
	if( primary.start > -1 &&
							primary.end > -1 &&
							coapp.start > -1 &&
							coapp.end > -1) {
								
		
		// Create divs for Primary and Coapp fields
		
		$('#JointApp form> ul').addClass('default_form')
			.before($('<div id="FormToggleTypeField"/>').append(formToggleTypeEl).wrapInner('<ul/>'))
			.before(
				$('<div id="CustomTabs"/>')
					.append('<div id="'+primary.name+'-Tab" class="myFormSection customTabContent"/>')
					.append('<div id="'+coapp.name+'-Tab" class="myFormSection customTabContent"/>')
		);
		
		
		
		
		primary.items = 
		$('#JointApp form > ul > li').filter(function(i) { return filterEls(i, primary.start, primary.end); });
		
		coapp.items = $('#JointApp form > ul > li').filter(function(i) { return filterEls(i, coapp.start, coapp.end); })
		
		if(window.console) console.log(primary, coapp);
		
		primary.items.appendTo('#'+primary.name+'-Tab').wrapAll('<ul/>');
		coapp.items.appendTo('#'+coapp.name+'-Tab').wrapAll('<ul/>');
		
		
		$('ul.default_form').before('<div class="formSectionHeader">Additional Information</div>');
		
		
		if($(window).width() > 767) {
			
			
			// Menu for custom Tab Pane;
			$('<div class="tabMenuContainer"></div>').append(
				$('<ul id="customTabMenu" class=""></ul>').append(
					$('<li></li>').append(customTab('Primary Applicant', primary.name, true)))
				.append(
					$('<li></li>').append(customTab('Co-Applicant', coapp.name))
				)).prependTo('#CustomTabs');
			
			$('#customTabMenu').after('<br clear="both"/>');
			if(window.console) console.log(primary.items.last());
			primary.items.last().after(
				$('<li class="text-right"><a href="#formTop">Continue to Co-Applicant Part</a></li>')
					.click(function(e) { 
						$('html, body').animate({
							scrollTop: $("#CustomTabs").offset().top
						}, 300);
						
						$('#'+coapp.name).trigger('click'); 
					}
				)
			);
		   
			// Activate first tab of tab panel
			$('a.customTab:first').addClass('active_customTab');
		   
		   $('#'+coapp.name+'-Tab').hide();
			
		}
		
		else {
			console.log($('#'+primary.name+'-Tab'));
			$('#'+primary.name+'-Tab').prepend('<div class="formSectionHeader">Primary Applicant Information</div>');
			$('#'+coapp.name+'-Tab').prepend('<div class="formSectionHeader">Co-Applicant Information</div>');
			
		}
		
		
	}
});


