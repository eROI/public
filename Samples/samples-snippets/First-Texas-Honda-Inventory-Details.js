/****
  *
  *	Date: April, 2014
  *	URL: http://www.firsttexashonda.info/inventory-details/2014/Honda/Civic/19XFB2E52EE078296
  *  
  *	
  *	Purpose of this file: 
  *	This file customizes the layout for a Vehicle Description page for First Texas Honda
  *	This is a prototype for the other Continental pages.
  *
  *	FEATURES:
  *	 	- Shows price difference if a vehicle has two prices assigned to it.
  *		- Displays all vehicle images in a grid format. Each image will show a larger image in a modal window.
  *		- Modal windows have paging controls
  *
  ******/
if(!window.CMS) {
	$(function() {

		$('.InvDetails').hide();
		
		$('dl.invPaymentCalc').removeClass('hide-on-phones').hide().next().hide();
		
		// Hide generic disclaimer for MPG
		$('#MPGWrap .disclaimer').hide();   
		
		
		// Add disclaimer notice to MPG section
		$('.invProfileMPG').append('<span style="font-size: 70%;"> [1]</span>');
		
		//Move mpg
		$('#InvProfileItemHdr').prepend($('#MPGWrap')); 
		$('#MPGWrap').addClass('hide-on-phones').attr('style', 'float:right; margin:5px;');
		
		
		$('#invProfileOptionsBlock').prepend($('#invProfileCommentsBlock'));
		$('.invCommentContainer').append($('#pureCars'));
		
		$('#invProfileFormBlock h6').text('This Is My Next Car!');
		
		$('label[for="Mail"]').hide();
		$('#IdAddress2').hide();
		$('#IdAddress1').hide();
		$('#IdCity').hide();
		$('#IdState').hide();
		$('#IdZipCode').hide();
		$('label[for="Text"]').hide();
		
		$('#invProfileMapBlock').hide();
		
		$('#invProfileMediaInfoBlock').append($('#invProfileFormBlock').removeClass('five columns'));
		
		$('#invProfileFormBlock').css('margin-left','0px');
		//$('#InvProfileDealerInfo').removeClass('seven').addClass('twelve');
		$('#invProfileOptionsBlock').append($('#InvProfileDealerInfo'));
		$('#InvProfileDealerInfo').removeClass('seven').addClass('twelve').css('margin-left','0px');
		//$('#invProfileMapBlock').before($(".invResultsItemFooter"));
		
		//Hide options and features
		$('#invOptionsTab, #FeaturesBox').parent().hide();
		$('#OptionsBox, #FeaturesBox').parent().parent().hide();
		//$('#invProfileOptionsBlock').append($('#invProfileFormBlock'));
		//$('#invProfileFormBlock').css('margin-bottom','10px');
		
		
		if(ddsVars.vehicle.stockType == 'new')   
			$('#invProfileFormBlock').prependTo('#invProfileOptionsBlock');
	
 
		var stockType = $("#NewUsedCertTitle").text().toUpperCase();
		var desc = $("#InvProfileItemHdr").text().toUpperCase();

		if (stockType.indexOf("NEW") != -1) {
			//get the end of the current URL (should end with VIN)
			var rel = window.location.href;
			var VIN = rel.substr(rel.length - 17);
			var link = "http://onecar.aisrebates.com/dlr2/inline/IncentiveOutput.php?vID=" + VIN + "&modelcode=&wID=cfebc6dbbb8452af0c403e691c3aafc3&zID=78757";
			//add the link
			//$("#InvProfileItemHdr").after('<a href="'+ link+'" target="blank" class="nice button">View All Incentives</a>')
		}

		else {
			//$('#MPGWrap').hide();  
			$('.invPricingHeader').removeClass('block-grid two-up');
		 
		}

		// Pricing Subtraction 
		showPriceSubtraction();
		
		initCustomImageDisplay();
	
	
		$('.no-touch #InvContainer').one('mouseenter', function() {
	
	
	
			
			var Photobox = new $.InventoryPicturePaging({type: 'details'});
			var invModal = new $.InventoryPicturePaging({type:'details-modal'});
				
			
		});
		$('.InvDetails').show()
	});
}


function showPriceSubtraction() {
	
	
	var primaryPrice = $('.PriceAmount').text();	
	var primaryPriceInt = parseInt(primaryPrice.replace(/[\$,]/g,''));	
	
    var secondPrice = $('.Price2 .PriceValue').text();
	var secondPriceInt = parseInt(secondPrice.replace(/[\$,]/g,''));
	
    if (secondPrice == '' || secondPrice.toLowerCase().indexOf('call') > -1){ // There is no second price 
      $('.Price2').hide();
      $('.PriceValue').addClass('BigPrice single');
    }
	
	else {
		
		var difference = primaryPriceInt - secondPriceInt;
		
		if(difference > 0) {
			
			$('.PriceAmount').css('text-decoration','line-through');
			$('.InvResultsItemHdr .five').append($('.invPricing.row'));
			
		  var priceDif = toUSD(difference);
		  $('.Price2').after('<li class="YourSavings"><span class="PriceTitle">Your Savings: </span><span class="PriceDiff"> ' + priceDif + '</span></li>').addClass('BigPrice');
		  
		}
			  
		else {
		  $('.Price2').hide();
		  $('.PriceValue').addClass('BigPrice single');
		}
		
    }

}

function toUSD(number) {
    var number = number.toString(), 
    dollars = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars;
}


function initCustomImageDisplay() {

	var imgs = $('<div id="CustomImageGrid"/>').append($('#PhotosBox .invCarImg:not(:first)').clone(false)).insertBefore('#invProfileBottomWrap');;
	
	$('.invCarImg', imgs).each(function(i, el) {
        $(el).removeAttr('style').attr('id', 'CustomImageGrid_'+(i+1));
		$(el).wrap('<li/>').wrapInner('<a href="#"/>'); 
    });
	$('li', imgs).wrapAll('<ul class="block-grid two-up"/>');
	$('img', imgs).each(function() {
		
		var src = $(this).attr('src');
		$(this).width('100%');
		$(this).parentsUntil('ul', 'li').data('preview', src).click(function(e) {
			
			e.stopImmediatePropagation();
			e.preventDefault();
			
			var i = $(this).index('#CustomImageGrid li');
			$('.invModal.invPhotos').data('target', 'LargeThumbs').data('index', (i+1)).reveal();
			
		});
		 
    });
	
} 