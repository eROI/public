/****
  *
  *	Date: July, 2014
  *	URL: For Global Use
  *  
  *	
  *	Purpose of this file: 
  *	This file contains two snippets that placee a button inside the DOM of a Product description.
  *	The snippet grabs data on the product and creates a URL containing that data, then places a button 
  *	linking to that URL. One script is for Product Listings pages, one is for Product Details pages.
  ******/
  

$(document).ready(function(){
	$(".InvResultsItem > .twelve.columns").each(
		function(index, el){
	
			//get the vehicle stocktype
			var stockType = $('.NewUsedCertTitle', el).text();
			if(typeof stockType == "string") {
				stockType = $.trim(stockType.toUpperCase());
			}
	
			//get the vehicle description, declare other variables.		
			var desc = $(".invResultsCarTitleDetails", el).text().toLowerCase(), VIN, stickerLink, make, btn;
	
			if(stockType.indexOf("NEW") != -1) {
				//Grab the VIN Value
				VIN = $('.InvResultsDetails', el).find('.Vin').contents().filter(function(index) {   return this.nodeType == 3; }).get(0).nodeValue || "";
				
				//search for the makes in the vehicle description
				make = desc.match(/chrysler|dodge|jeep|ram/gi);
				 
				if(VIN != "" && make) {
					if(make[0] == 'ram') make[0] = 'ramtrucks';
				
					//set the stickerLink variable to the URL of the window sticker		
					stickerLink = "http://www." + make[0] + ".com/hostd/windowsticker/getWindowStickerPdf.do?vin=" + VIN;
				}
				else
					return;
					
				//Create the button linking to the window sticker. Edit the class of the link to alter the look
				btn = $('<a href="' + stickerLink + '" target="blank" class="nice red button windowSticker">View Window Sticker</a>')
					//add a click event to prevent the page from going to the Details page (the default action)
					.click(function(e) {
                   		e.stopPropagation();
                	});
	
				//append the link
				$(el).append(btn);
			
	
			}
				
	});
});

$(function() {
    //DETAILS PAGE
	
	// Get vehicle data from the global ddsVars variable.
	var stockType =  ddsVars.vehicle.stockType.toUpperCase();
    var desc = ddsVars.vehicle.year + ' ' +
                ddsVars.vehicle.make + ' ' +
                ddsVars.vehicle.model;
	
	var VIN = ddsVars.vehicle.vin;
	
	var make = desc.toLowerCase().match(/chrysler|dodge|jeep|ram/gi);
	
	var stickerLink;
    
	if(stockType.indexOf("NEW") != -1) {
		
		if(VIN != "" && make) {
			
			if(make[0] == 'ram') make[0] = 'ramtrucks';
			
			//set the stickerLink variable to the URL of the window sticker
			stickerLink = "http://www." + make[0] + ".com/hostd/windowsticker/getWindowStickerPdf.do?vin=" + VIN;
			
			//attach the button (<A> tag) to the page. Edit the class of the link to alter the look
			$("#InvProfileItemHdr").append('<a href="' + stickerLink +'" target="blank" class="nice red button windowSticker">View Window Sticker</a>');
		}
		
		
	}
});


