// JavaScript Document

Ext.namespace('Ext.ux.data');

	
Ext.ux.data.dealerModels = Ext.extend(Ext.data.JsonStore, {
	
	numberListed: 0,
	displayingMode: false,
	
	constructor: function(config) {
		
		
		var myConfig = {
			listeners: {
				'update': {
					fn: this.onUpdate
				}
			}
		};
		config.data = this.CleanData(config.data);
		Ext.apply(this, Ext.apply(myConfig, config));
		Ext.ux.data.dealerModels.superclass.constructor.call(this, config);
		
		
		//if(this.fields
		
	},
	
	CleanData: function(mdls) {
		var a = new Array();
		for(var i = 0; i < mdls.length; i++) {
			for(var j = 0; j < mdls[i].length; j++) 
				a.push(mdls[i][j]);	
		}
		return a;
	},
	
	ListMakes: function() {
		
		var ret = [];
		this.each(function(r) {
			if(this.indexOf(r.data.makename) < 0) 
				this.push(r.data.makename);
		}, ret);
		/*console.log(this.data);
		var ret = this.collect('makeName');*/
		return ret;		
	},
	
	ListModels: function() {
	
		if(window.console) console.log('Listing Models',this);	
		var ret = [];
		var makes = this.ListMakes();
		var numToList = (function(list) {
			var numModels = 1;
			if(list.length == 1) return (3 * numModels);
			if(list.length == 2) return 4;
			if(list.length >= 3) return list.length;			
		})(makes);
		var numlisted = 0; 

		this.each(function(r){
			if(this.l >= this.n) return false;
			
			if(this.mList.length == 0)
				this.mList = this.store.ListMakes();				
				
			//if(window.console) console.log(r, r.get('makename'), Ext.ux.data.in_array(r.get('makename'), this.mList), r.get('shown'));
			if(	
			   Ext.ux.data.in_array(r.get('makename'), this.mList) &&	
			   r.get('shown') == 'false' && 
			   r.get('isChecked') == true) {
				
				if(window.console) console.log('showing:',r);
				r.set('shown', 'true');
				this.l++;
				this.mList.remove(r.get('makeName'));
				this.list.push(r);
			}
		}, {mList: makes, n: numToList, l: numlisted, list: ret, store: this});
		

		return ret;
	},
	
	getModel: function() {
	
		var models = this.queryBy(function(rec, id) {
			//console.log(rec, rec.get('shown'), rec.get('isChecked'));
			if(rec.get('shown') == true && rec.get('isChecked') == true) return true;
			else return false;
		});
		
		
		if(models.getCount() == 0)
			models = this.resetModels();
			
			
		var rand = Math.floor(Math.random() * models.getCount());
		var rec = models.itemAt(rand);
		
		rec.data['shown'] = 'true';
		
		return rec;
	},
	
	resetModels: function() {
		
		this.each(function(r) {
			r.data['shown'] = 'false';
		});
		return this.query('shown', 'false');
	},
	
	getTotalListed: function(){
		return this.numberListed;
	},
	
	getAll: function(make) {
		var ret = [];
		this.each(function(r) {
			if(r.data['makename'] == make) 
				this.push(r.data['modelname']);
	   	}, ret);
		return ret;
	},
	
	onUpdate: function(s, r, o) {
		
		if(this.displayingMode) {
			var availModels = this.query('shown', 'false');
			if(availModels.length == 0) {
				availModels = this.resetModels();
				
			}
		}
	
	},
	
	addMake: function(m) {
			
	}
});


	
Ext.ux.data.customModels = Ext.extend(Ext.data.JsonStore, {
	
	constructor: function(config) {
		
		/*
		var myConfig = {
			listeners: {
				'update': {
					fn: this.onUpdate
				}
			}
		};
		Ext.apply(this, Ext.apply(myConfig, config));*/
		Ext.ux.data.customModels.superclass.constructor.call(this, config);
		
		
	},
	
	ListModels: function() {
		var ret = [];
		this.each(function(r) {
			this.push(r.get('modelName'));
		}, ret);
		return ret;
	},
	
	onUpdate: function() {
			
	}
});

Ext.ux.data.convertModelData = function(data) {
	var ret = [];
	var indexName = "models";
	for(var i = 0; i < data.length; i++) {
		for(var j = 0; j < data[i].models.length; j++) {
			ret.push({
				modelID: data[i].models[j].id,
				modelName: data[i].models[j].name,
				makeID: data[i].id,
				makeName: data[i].name
			});
		}
	}
	
	//console.log(ret);
	
	return ret;
};

Ext.ux.data.FormatMMList = function(list) {
	
	var ret = [];
	var tempObj = {};
	var make, model = null;
	
	for(var i = 0; i < list.length; i++) {
		make = list[i].get('makename');
		model = list[i].get('modelname');
		
		if(make in tempObj) tempObj[make].push(model);
		else 	tempObj[make] = [model];
	}
	
	return tempObj;
};


Ext.ux.data.modelInfo = [{
	id: 39,
	name: 'Lotus',
	models: [{
		id: 336,
		name: 'Elise'
	}, {
		id: 337,
		name: 'Evora'
	}, {
		id: 338,
		name: 'Exige'
	}]
}, {
	id: 8,
	name: 'Jeep',
	models: [{
		id: 40,
		name: 'Wrangler'
	}, {
		id: 41,
		name: 'Grand Cherokee'
	}, {
		id: 42,
		name: 'Liberty'
	}, {
		id: 43,
		name: 'Compass'
	}, {
		id: 44,
		name: 'Commander'
	}, {
		id: 45,
		name: 'Patriot'
	}, {
		id: 156,
		name: 'Wrangler Unlimited'
	}]
}];