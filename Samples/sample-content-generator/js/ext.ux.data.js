Ext.ns('Ext.ux.data');


Ext.ux.data.pageData = [{
	alias: 'home',
	name: 'Home'
}, {
	alias: 'new-inventory',
	name: 'New Inventory'
}, {
	alias: 'used-inventory',
	name: 'Used Inventory'
}, {
	alias: 'about-us',
	name: 'About Us'
}, {
	alias: 'finance-application',
	name: 'Finance Application'
}, {
	alias: 'special-finance',
	name: 'Special Finance'
}, {
	alias: 'new-specials',
	name: 'New Specials'
}, {
	alias: 'used-specials',
	name: 'Used Specials'
}, {
	alias: 'build-your-own',
	name: 'Build Your Own'
}, {
	alias: 'coupons',
	name: 'Coupons'
}, {
	alias: 'commercial-inventory',
	name: 'Commercial Inventory'
}, {
	alias: 'community',
	name: 'Community'
}, {
	alias: 'hours-location',
	name: 'Location'
}, {
	alias: 'new-car-info',
	name: 'New Car Info'
}, {
	alias: 'order-parts',
	name: 'Order Parts'
}, {
	alias: 'contact-us',
	name: 'Quick Contact'
}, {
	alias: 'schedule-service',
	name: 'Schedule Service'
}, {
	alias: 'value-your-trade',
	name: 'Value Your Trade'
}, {
	alias: 'view-our-ad',
	name: 'View Our Ad'
}, {
	alias: 'body-shop',
	name: 'Body Shop'
}, {
	alias: 'all-content',
	name: 'Get All Content'
}];


Ext.ux.data.variableTypes = [
    ["name", "Dealer Name", false],
    ['url', 'Website URL', false],
    ['city1', 'Primary City', false],
    ['secondaryCities', 'Surrounding Areas ONLY', true],
    ['allcities', 'ALL Areas', true],
    ['phone', 'Phone Number', false],
    ['zip', 'Zip Code', false],
    ['makes', 'Make List', true],
    ['models', 'Model List', true]
];



Ext.ux.data.defaultColorData = [{
	name: 'header-bg-color',
	value: '363636'
}, {
	name: 'header-color',
	value: 'FFFFFF'
}, {
	name: 'border-color',
	value: '363636'
}, {
	name: 'text-color',
	value: '000000'
}, {
	name: 'bg-color',
	value: 'FFFFFF'
}, {
	name: 'link-color',
	value: '535c77'
}, {
	name: 'modelList-color',
	value: '000000'
}, {
	name: 'modelList-bg-color',
	value: 'FFFFFF'
}];

Ext.ux.data.convertCustomerData = function(data) {
	data.cities = [];
	for(var i = 1; i < 7; i++) {
		if(data['city'+i] && data['city'+i].trim() != '')
			data.cities.push(data['city'+i]);
	}
	data.dealership = data.dealershipName;
	return data;
};

Ext.ux.data.DealerRecord = Ext.extend(Ext.data.Record, {
									  
	constructor: function(config) {
		
		Ext.apply(this, config);
	},
	
	/*
		obj : [varName, (delim), (article), (linkHref), (linkName)]
	*/
	get: function(name) {

		var egg = null;


		switch(name) {
		
			case 'primaryCity':
				egg = this.data.cities[0];
				break;
				
			case 'dealership':
				egg = this.data.dealershipName;
				break;
				
			case 'secondCities':
				egg = this.data.cities.slice(1);
				break;
				
			case 'allCities':
				egg = this.data.cities;
			 	break;
				
			case 'packageType':
				egg = this.data['seoPackageSelect'];
				break;
				
			default:
				egg = Ext.ux.data.DealerRecord.superclass.get.call(this,name);
				break;
		}
		
		return egg;
		
	}
	
});

Ext.ux.data.findHash = function(phrase) {
	
		var hash = [];
		
		var h = 0;
		var start = phrase.indexOf('{', h);
		var end = phrase.indexOf('}') + 1;
		
		var test = null;
		
		while(start != -1) {
			test = phrase.substring(start,end);
			hash.push([start, end]);
			h = end;
				
			start = phrase.indexOf('{', h);
			end = phrase.indexOf('}', h) + 1;
		}
		
		return hash;
		
};

Ext.ux.data.parseFlock = function(obj) {
	
	var start, end = 0;
	var text, statement, href, action, egg= null;
	var matchThis = [];
	var returnThis = obj.phrase;
	
	for(var i = 0; i < obj.h.length; i++) {
		// Loop through array of hashes
		
		egg = null;
		href = null;
		var printText = "";
		start = obj.h[i][0];
		end = obj.h[i][1];
		
		text = obj.phrase.slice(start, end);
		statement = text.slice(1, -1).split(';');
		
		if(statement[0].indexOf(':') != -1) {
			//statement declaring a link
		
			href = {};
			action = statement[0].split(':');
			action = action[1];
			//if(action == 'ListMakes' || action == 'ListModels') href.make = 
			href.url = 'http://'+obj.c.get('dealerURL')+'/'+statement[statement.length-1];
		}
		
		else {
			action = statement[0];	
		}
		
		//Find Value of egg
		// egg is the string that will replace action
		if(obj.c.contentType == 'u' && action == 'ListMakes') action = "ListCustomMakes";
		switch(action) {
			
			case 'list':
				egg = statement[1 + Math.floor(Math.random()*(statement.length - 2))];
				printText = egg;
				break;
				
			case 'ListMakes':
				egg = obj.m.ListMakes(statement[1], statement[2]);
				
				if(href) {
					for(var j = 0; j < egg.length; j++) {
						egg[j] = '<a href="'+href.url+'/'+Ext.ux.data.urlFormat(egg[j])+'">'+egg[j]+'</a>';
					}
				}
				printText = Ext.ux.data.printList(egg, statement[1], statement[2]);
				break;
				
			case 'ListModels':
				//if(window.console) console.log(obj.m);
				var mmList =  Ext.ux.data.FormatMMList(obj.m.ListModels());
				if(href) {
					egg = [];
					Ext.iterate(mmList, function(key, list, obj) {
						for(var p = 0; p < list.length; p++) {
							var v = list[p];
							this.push('<a href="'+href.url+'/'+Ext.ux.data.urlFormat(key)+'-'+Ext.ux.data.urlFormat(v)+'">'+key+' ' + v + '</a>');
							
						}
					}, egg);
				}
				else {
					egg = [];
					for(var key in mmList) {
						for(var q = 0; q < mmList[key].length; q++)
							egg.push(key + " " + mmList[key][q]);
					}
				}
					
				printText = Ext.ux.data.printList(egg, statement[1], statement[2]);
				break;
					
			case 'ListCustomMakes':
				
				egg = obj.m.ListModels();
				printText = Ext.ux.data.printList(egg, statement[1], statement[2]);
				
				break;
				
			default:
				egg = obj.c.get(action);
				if(egg == null && href != null) {
					//Must be a link
					egg = action;
					if(href) 
						egg = '<a href="'+href.url+'">'+egg+'</a>';
				}
			    
				if(action == 'secondCities' || action == 'allCities') 
					printText = Ext.ux.data.printList(egg, statement[1], statement[2]);
				else
					printText = egg;
				break;
				
		}
		
		
	
		matchThis.push({text: text, egg: printText});

	}
	
	
	
	for(var k = 0; k < matchThis.length; k++) {
		returnThis = returnThis.replace(matchThis[k].text, matchThis[k].egg);
	}
	
	return returnThis;
}

Ext.ux.data.FlipFlock = function(f,obj) {
	
	var hashes = Ext.ux.data.findHash(f);
		
	
	var c = Ext.ux.data.parseFlock({phrase: f, h: hashes, c: obj.customer, m: obj.modelInfo});
	
	return c;
}

Ext.ux.data.urlFormat = function(s) {
	var ret = s.replace(" ", "+");
	ret = ret.replace("-", "_");
	return ret;
}

Ext.ux.data.printList = function(data, d, article) {
	var ret = '';
	var n = data.length;
	if(article == '_') article = '';
	
	for(var i = 0; i < n; i++) {
		
		ret += data[i];
		if(i <= n-2 && n > 2) ret += d + ' ';
		if(n <= 2) ret += ' ';
		if(i == n-2 && n >= 2)  {
			ret += article;
			if(article != '') ret += ' ';
		}
	}
	
	return ret;
}



Ext.ux.data.in_array = function(string, array) {
	for (i = 0; i < array.length; i++)
	{
		if(array[i] == string)
		{
			return true;
		}
	}
	return false;
}


Ext.ux.data.isArray = function(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

var Cookie = {
  data: {},
  options: {expires: 1, domain: "", path: "", secure: false},

init: function(options, data) {
  Cookie.options = $.extend(Cookie.options, options || {});

  var payload = Cookie.retrieve();
        if(payload) {
            Cookie.data = Ext.decode(payload);
        }
        else {
            Cookie.data = data || {};
        }
        Cookie.store();
    },
    getData: function(key) {

		if(key) return Cookie.data[key];
		
		else return Cookie.data
    },
    setData: function(key, value) {
        Cookie.data[key] = value;
        Cookie.store();
    },
    removeData: function(key) {
        delete Cookie.data[key];
        Cookie.store();
    },
    retrieve: function() {
        var start = document.cookie.indexOf(Cookie.options.name + "=");

        if(start == -1) {
            return null;
        }
        if(Cookie.options.name != document.cookie.substr(start, Cookie.options.name.length)) {
            return null;
        }

        var len = start + Cookie.options.name.length + 1;   
        var end = document.cookie.indexOf(';', len);

        if(end == -1) {
            end = document.cookie.length;
        } 
        return unescape(document.cookie.substring(len, end));
    },
    store: function() {
        var expires = '';

        if (Cookie.options.expires) {
            var today = new Date();
            expires = Cookie.options.expires * 86400000;
            expires = ';expires=' + new Date(today.getTime() + expires);
        }

        document.cookie = Cookie.options.name + '=' + escape(Ext.encode(Cookie.data)) + Cookie.getOptions() + expires;
    },
    erase: function() {
        document.cookie = Cookie.options.name + '=' + Cookie.getOptions() + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    },
    getOptions: function() {
        return (Cookie.options.path ? ';path=' + Cookie.options.path : '') + (Cookie.options.domain ? ';domain=' + Cookie.options.domain : '') + (Cookie.options.secure ? ';secure' : '');      
    }
};