/****
  *
  *	Date: April, 2014
  *	URL: http://www.firsttexashonda.info/inventory-details/2014/Honda/Civic/19XFB2E52EE078296
  *  
  *	
  *	Purpose of this file: 
  *	This file installs a form field used to ssearch inventory by stock number.
  *	The form field is placed in the footer.
  *
  *	Possible stock numbers: 77116, 77542, 76798, WE529872, JS078869, B196193
  *
  *
  ******/

$(function(){
	
	if(!$('html').hasClass('touch')) {
		
		var doSearch = function(val) {
			window.location = window.location.protocol + '//' + window.location.hostname + '/inventory?StockNumber=' + val;
		}
		
		var stockSearch = $('<input id="SearchStock_Global" class="searchStock" type="text" value="Stock #"/>')
			.css({"width":"100%", "font-size": "12px", "color": "#666", "margin-bottom": "6px"})
			.bind({
				"click": function(e) {
					$(this).val("").unbind("click");
				},
				"focusout": function(e) {
					var val = $(this).val();
					if(val && (val = val.replace(/[^\w\d]/gi, '')) != "") {
						$('#SubmitSearchbuttonWrapper a')
							.unbind('click')
							.bind('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
	
								window.location = window.location.protocol + '//' + window.location.hostname + '/inventory?StockNumber=' + val;
					  });
				  }
			  },
			  "keypress": function(e){
					if (e.keyCode == 13){
						e.preventDefault(); doSearch($(this).val());
					}
				}
		  });
		  
		  
		  
		  var submitBtn = $('<a href="#" class="" title="Search">Search<span class="invIcon tiny search"></span></a>').click(function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			var val = $.trim($('#SearchStock_Global').val());
			var regex = new RegExp(/[A-Za-z0-9][A-Za-z0-9_]*$/);
			
			if(regex.test(val)) doSearch(val);
			
		  });
		  
		  $('#homeInvSearch').append(stockSearch);
		  
		  $('<span class="SubmitSearchbutton button radius small smIcon"/>').append(submitBtn).appendTo('#homeInvSearch').wrap('<div id="InvSearchBoxSubmit"/>')
	}
});
