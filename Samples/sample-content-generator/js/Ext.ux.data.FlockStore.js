
Ext.ux.data.FlockStore = Ext.extend(Ext.data.JsonStore, {

	packageNames: ['hampster', 'dog', 'lion'],

	getFlock: function(id) {

		

		var flockObj = this.getById(id);

		var flock = flockObj.data.flock;

		var retThis = [];
		
		var packagesAllowed = this.packageNames.slice(0, this.packageLevel+1);
		
		if(window.console) console.log('packages allowed: ', packagesAllowed);

		for(var i = 0; i < flock.length; i++) {
			
				var tags = flock[i].tags[0];
				
				if(window.console) console.log('tags: ', tags);				
			
				if($.inArray(tags, packagesAllowed) > -1 || !tags) {
	
					var phrase = flock[i].items[Math.floor(Math.random() * flock[i].items.length)].text;
	
					retThis.push(phrase);
				}

		}

		return retThis;

	}

});



