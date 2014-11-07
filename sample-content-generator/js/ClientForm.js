// JavaScript Document
Ext.ns('Ext.ux.ds', 'Ext.ux.data');

ClientFormPanel = Ext.extend(Ext.form.FormPanel, {
	
	constructor: function(config) {
		
		var customerFS = { 
			xtype: 'fieldset',
			columnWidth: .5,
			title: 'General Info',
			defaultType: 'textfield',
			autoHeight: true,
			items: [{
				fieldLabel: 'Dealership Name',
				name: 'dealershipName',
				id: 'dealershipName'
			}, {
				fieldLabel: 'website URL',
				name: 'dealerURL',
				width: 205,
				id: 'dealerURL'
			}, {
				fieldLabel: 'Site Specific Folder Name',
				name: 'sitespecific',
				id: 'sitespecific'
			}, {
				fieldLabel: 'Main Location',
				name: 'city1',
				id: 'city1'
			}, new Ext.form.ComboBox({
				tpl: '<tpl for="."><div ext:qtip="{id}." class="x-combo-list-item">{state}</div></tpl>',
				width: 150,
				id: 'stateSelect',
				store: new Ext.data.SimpleStore({
					fields: ['abbr', 'state', 'id'],
					data: Ext.dubbData.states
				}),
				displayField:'state',
				fieldLabel: 'State',
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				emptyText:'Select a state...',
				selectOnFocus:true,
				name: 'state'
			 }), {
				fieldLabel: 'Phone Number',
				name: 'phone',
				id: 'phone'
			}, {
				fieldLabel: 'Street Address',
				name: 'address',
				id: 'address'
			}, {
				fieldLabel: 'Zip Code',
				name: 'zip',
				id: 'zip'
			}]
		}; // END CUSTOMER FIELDSET
		
		var locationFS ={
			xtype: 'fieldset',
			columnWidth: .5,
			title: 'Surrounding Areas',
			itemId: 'second-cities-fs',
			defaultType: 'textfield',
			autoHeight: true,
			tbar: [{
				text: 'Google Maps',
				handler: this.showLocale,
				scope: this
			}, {
				text: 'City Data',
				handler: this.showLocale,
				scope: this
			}, {
				text: 'Epodunk',
				handler: this.showLocale,
				disabled: true,
				scope: this
			}], 
			items: [{
				fieldLabel: 'City 2',
				name: 'city2',
				id: 'city2'
			}, {
				fieldLabel: 'City 3',
				name: 'city3',
				id: 'city3'
			}, {
				fieldLabel: 'City 4',
				name: 'city4',
				id: 'city4'
			}, {
				fieldLabel: 'City 5',
				name: 'city5',
				id: 'city5'
			}] //end Cities fieldset
		}; // end LOCATION FIELDSET
		
		var defaults = {
	
			labelWidth: 150,
			defaults: {
				bodyStyle:  'padding: 15px'
			},
			contentType: 'g',
			title: 'Generate Your Content',
			name: 'clientForm',
			itemID: "clientForm",
			items: [{
				border: false,
				layout: 'column',
				defaults: {
					bodyStyle:  'padding: 5px'
				},
				itemId: 'siteFS',
				items: [ 
					customerFS,
					locationFS
				]
			},  {
				xtype: 'fieldset',
				title: 'More Info...',
				autoHeight: true,
				itemId: 'inventoryFS',
				items: [{
					xtype: 'combo',
					id: 'seoPackageSelect',
					fieldLabel: 'Select your SEO package',
					mode: 'local',
					store: new Ext.data.ArrayStore({
						id: 0,
						fields:  ['id', 'package'],
						data: [
							[0, 'Package 1'],
							[1, 'Package 2'],
							[2, 'Package 3'],
						]
					}),
					valueField: 'id',
					displayField: 'package',
					width: 150,
					autoSelect: true
				},{
					xtype: 'contenttype-rg',
					id: 'contentType-rg',
					itemId: 'contentType-rg',
					fieldLabel: 'Content Type',
					form: this,
					listeners: {
						'change': {
							fn: this.contentTypeChange,
							scope: this
						}
					}
				}, {					
					xtype: 'makepanel',
					id: 'make-display-panel',
					form: this
				}, {
					xtype: 'modelpanel',
					id: 'model-display-panel'
				}]
			}// end FormPanel
			]
		}; // end defaukt config
		
		config = Ext.apply(defaults, config);
		
		ClientFormPanel.superclass.constructor.call(this, config);
		
		/*this.getTopToolbar().on({
			'render': {
				
			}
		})*/
		
	},
	
	onRender: function() {
		ClientFormPanel.superclass.onRender.apply(this, arguments);
		this.displayMakes();
	},
	
	GetFormValues:  function() {
		
		var fVals = {};
		
		this.getForm().items.each(function(item) {
			if (item.isFormField && $.trim(item.getValue()) != "") {
                
				switch(item.getXType()) {
					
					//case 'combo': 
					
					//case 'radiogroup':	
					
					case 'checkboxgroup':
					
					
				}
				
				this[(item.name) ? item.name : item.id] = (item.getValue() != 'undefined') ? item.getValue() : '';
            	}        
      	},fVals);
		//var doSerialize contains array of content types for whish require the models to be serialize
		var doSerialize = ["g", "u"];
		
		//console.log(this.get('seo-package-select'));
		
		fVals.contentType = this.contentType;
		fVals.makeGroup = this.getSelectedMakes();
		fVals.makes = new Array();
		
		if(Ext.ux.data.in_array(fVals.contentType, doSerialize))  {
			if(Ext.ux.data.isArray(fVals.makeGroup) && fVals.contentType == 'g') {
				for(var i = 0; i < fVals.makeGroup.length; i++) {
					if(window.console) console.log('saving make data',fVals.makeGroup[i]);
					fVals.makes.push(fVals.makeGroup[i]);
					fVals.makeGroup[i] = this.getModelPanel().getTreeContents('modelList-'+fVals.makeGroup[i]);	
					
				}
			}
			
			else if(fVals.contentType == 'u') {
				
				
				for(var i = 0; i < 5; i++) {
					var m = Ext.util.Format.trim(fVals['custom-model-make-'+i]);
					if(window.console) console.log('saving custom model:', m);
					if(m != "" && m != 'undefined') {
						fVals['makes'].push(m);
						delete fVals['custom-model-make-'+i];
					}
				}
			}
			
			else
				fVals.makeGroup = this.getModelPanel().getTreeContents('modelList-'+fVals.makeGroup);	
		}
		
		
		var p = this.getSecondCitiesPanel();
		fVals.cities = new Array(fVals.city1);
		for(var j = 0; j < p.items.length; j++) {
			var tf = p.items.get(j);
			var tfVal = tf.getValue();
		
			if($.trim(tf.getValue()) != "") fVals.cities.push(tfVal);
			delete fVals[tf.id];
		}
		
		
		fVals.fkSite = this.getSiteID();
		
		delete fVals['contentType-rg'];
		delete fVals['defaultMakes-cg'];
		delete fVals['city1'];
		
		
		if(fVals.fkSite)
			return fVals;
		else
			return false;
		//fp.getForm().submit();
		
		
		
		

	},
	
	displayMakes: function() {
		
		this.makeStore.addListener({
			'load': {
				fn: function(store, recs, opts) {
					
					this.getMakePanel().initDisplay(recs,opts);
				},
				scope: this
			},
			'update': {
				fn: function(s, rec, op) {
					//s: store, rec: changed record, op: operation that was preformed
					
					var trees = this.getModelPanel();
					
					if(rec.get('Selected')) {
						this.getModelPanel().initTree(rec);
					}
					else {
						this.getModelPanel().removeTree(rec);
					}
				},
				scope: this
			}
		});
		this.makeStore.load();
		
	},
		
	displayModels: function(b, e) {

	},

	clearModels: function() {
		var cmp = Ext.getCmp('modelDisplay');
		var r = cmp.removeAll(false);
		Ext.each(Ext.query('.x-tree'), function(obj, index, all) {
			Ext.getCmp(obj.id).destroy();
		});
		cmp.doLayout(false, true);
	},
	
	getSelectedMakes: function() {
		var selected = this.makeStore.query('Selected', true);
		
		return selected.keys;
	},
	
	onMakeSelect: function(c, val) {
		
		
		var id = c.inputValue;
		var r = this.makeStore.getById(id);
			
		if(val && r) {  
			r.set('Selected', true);
		}
			
		else if(r)
			r.set('Selected', false);
		/*var values = this.makeStore.query('Selected',true);
		var trees = this.getModelPanel().items;
		
		if(values.getCount() > trees.getCount() {
			this.getModelPanel().initTree
		}
		Ext.each(trees, function(obj, i, group) {
		 	
		}, this);
		*/
		
	},
	
	setFormValues: function(data) {
		//first, set all textField values
		this.getForm().setValues({
			dealershipName: data.dealershipName,
			dealerURL: data.dealerURL,
			city1: data.cities[0],
			phone: data.phone,
			address: data.address,
			zip: data.zip,
			city2: (data.cities[1] || ""),
			city3: (data.cities[2] || ""),
			city4: (data.cities[3] || ""),
			city5: (data.cities[4] || ""),
			state: data.state
		});
		
		
		this.getPackageSelectBox().setValue(data['seoPackageSelect']);
		
		//set content tyoe
		this.getContentTypeGroup().setValue('radio-'+new String(data.contentType), true);
		
		if(data.contentType == "g") {
			//set make info, then send model data to disModels()
			for(var i = 0; i < data.makes.length; i++) {
				var m = data.makes[i];
				
				this.getMakePanel().setMakes(m);
				
				/*if(data['modelList-'+m]) 
					this.getModelPanel().selectModels(m, data['modelList-'+m]);*/
			}
			
		}
		else {
			if(window.console) console.log(this, this.getForm());
			for(var i = 0; i < data.makes.length; i++) {
				this.getForm().setValues([{
					id: 'custom-make-name-'+i, 
					value: (data.makes[i] || "")
				}]);
			}
		}
	},
	
	getSiteID: function() {
		var v = this.getTopToolbar().getComponent('fkSite').getValue();
		
		return (v != ("" || 'undefined')) ? v : false;
	
	},
	
	getPackageSelect: function() {
		return this.getComponent('inventoryFS').getComponent('seo-package-select');
	},
	
	getContentTypeGroup: function() {
		return this.getComponent('inventoryFS').getComponent('contentType-rg');
	},

	getPackageSelectBox: function() {
		return this.getComponent('inventoryFS').getComponent('seoPackageSelect');
	},
	
	getMakePanel: function() {
		return this.getComponent('inventoryFS').getComponent('make-display-panel');
	},
	
	
	getModelPanel: function() {
		return this.getComponent('inventoryFS').getComponent('model-display-panel');
	},
	
	getSecondCitiesPanel: function() {
		
		return this.getComponent('siteFS').getComponent('second-cities-fs');
	},
	
	contentTypeChange: function(f, newValue) {
		if(typeof newValue == 'object') newValue = newValue.inputValue;
		switch(newValue) {
			case 'g':
				this.getMakePanel().layout.setActiveItem("defaults-makes-panel");
				break;
			case 'u':
				this.getMakePanel().layout.setActiveItem("custom-models-panel");
				break;
			case 'm':
				//Ext.MessageBox.alert("Notice", "Please note not all makes have Make Specific content. Make sure this make has content.");
			
		}
		this.contentType = newValue;
		
	},
	
	showLocale: function(b, e) {
		var url = "";
		var values = this.getForm().getValues();
		var zip = values.zip;
		var city = values.city1;
		var state = values.state;
		var id = stateStore.query('state',state).get(0).data.id;
		
		switch(b.text) {
			case 'Google Maps':
				if(zip != "")	url = "http://maps.google.com/maps?f=q&hl=en&q=" + zip;
				else Ext.MessageBox.alert('Warning', 'Please Supply a zip code before using this button.');
				break;
				
			case 'City Data':
				if(city != "" && state != "")	
					url = "http://www.city-data.com/city/" + city.replace(/ /g, '-') + "-" + state.replace(/ /g, '-') + ".html";
				else 	Ext.MessageBox.alert('Warning', 'Please supply a city and state before using this button.');
				break;
			case 'Epodunk':
				if(city != "" && state != "") {	
					url = "http://epodunk.com/cgi-bin/localSearch.php?searchStr=" + city + "&parseMethod=phrase&state=" +
						id + "&submit=Search";
				}
				else 	Ext.MessageBox.alert('Warning', 'Please supply a city and state before using this button.');
			
				break;
		}
		window.open(url, "local-info");
	}

});


Ext.reg('clientform', ClientFormPanel);

Ext.form.BasicForm.override({
    getObjectValues: function() {
        var o = {};
        this.items.each(function(item) {
			if (item.isFormField && $.trim(item.getValue()) != "") {
                o[(item.name) ? item.name : item.id] = item.getValue();
            }        
        });
        return o;
    },
	
	setValues:  function(values){
        if(Ext.isArray(values)){ // array of objects
            for(var i = 0, len = values.length; i < len; i++){
                var v = values[i];
                var f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else{ // object hash
            var field, id;
            for(id in values){
                if(!Ext.isFunction(values[id]) && (field = this.findField(id))){
					var val = (values[id] == 'undefined' || values[id] == null) ? '' : unescape(values[id]);
                    field.setValue(val);
                    if(this.trackResetOnLoad){
                        field.originalValue = field.getValue();
                    }
                }
            }
        }
        return this;
    }
});
