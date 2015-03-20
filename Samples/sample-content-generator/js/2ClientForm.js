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
				id: 'dealershipName',
				value: 'Wilky Motors'
			}, {
				fieldLabel: 'website URL',
				name: 'dealerURL',
				width: 205,
				id: 'dealerURL',
				value: "www.wilkyMotors.com"
			}, {
				fieldLabel: 'Site Specific Folder Name',
				name: 'sitespecific',
				id: 'sitespecific'
			}, {
				fieldLabel: 'Main Location',
				name: 'city1',
				id: 'city1',
				value: "Nashville"
			}, new Ext.form.ComboBox({
				tpl: '<tpl for="."><div ext:qtip="{id}." class="x-combo-list-item">{state}</div></tpl>',
				width: 150,
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
				id: 'phone',
				value: "615-488-1490"
			}, {
				fieldLabel: 'Street Address',
				name: 'address',
				id: 'address',
				value: "404 BNA Dr."
			}, {
				fieldLabel: 'Zip Code',
				name: 'zip',
				id: 'zip',
				value: "37214"
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
				id: 'city2',
				value: "Hermitage"
			}, {
				fieldLabel: 'City 3',
				name: 'city3',
				id: 'city3',
				value: "Franklin"
			}, {
				fieldLabel: 'City 4',
				name: 'city4',
				id: 'city4',
				value: "Brentwood"
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
					xtype: 'radiogroup',
					id: 'contentType-rg',
					fieldLabel: 'Content Type',
					form: this,
					items: [
						{boxLabel: 'General', name: 'contentType', inputValue: 'g', id: 'radio-g', checked: true},
						{boxLabel: 'Used', name: 'contentType', inputValue: 'u', id: 'radio-u'},
						{boxLabel: 'Finance', name: 'contentType', inputValue: 'f', id: 'radio-f', disabled: true},
						{boxLabel: 'Commercial', name: 'contentType', inputValue: 'c', id: 'radio-c', disabled: true},
						{boxLabel: 'Make Specific', name: 'contentType', inputValue: 'm', id: 'radio-m', disabled: true}
					],
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
			],
			tbar: [{
				xtype: 'label',
				text: 'Site ID'
			}, {
				xtype: 'textfield',
				name: 'fkSite-field',
				id: 'fkSite'
			}, {
				text: 'Get Data',
				handler: this.GetSiteData
			}, {xtype: 'tbspacer', width: 50}, {
				id: 'sitefind',
				xtype: 'combo',
				width: 200,
				mode: 'local',
				store: new Ext.data.ArrayStore({
					fields: [ 'name', 'value'],
					valueField: 'value',
					displayField: 'name'
				}),
				listeners: {
					'render': {
						fn: function() {
							console.log(Cookie.getData());
							//var data = 
						}
					}
				}
			}]
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
		
		var fVals = new Array();
		
		this.getForm().items.each(function(item) {
			if (item.isFormField && $.trim(item.getValue()) != "") {
                
				var v = null;
				
				switch(item.getXType()) {
					
					case 'radiogroup':	
						v = item.getValue().inputValue;
						break;
						
					case 'checkboxgroup':
						v = item.getValue();
						for(var i = 0; i < v.length; v++) v[i] = v[i].boxLabel;
						break;
					
				}
				
				this[(item.name) ? item.name : item.id] = item.getValue();
            }        
        },fVals);
		//var doSerialize contains array of content types for whish require the models to be serialize
		var doSerialize = ["g", "u"];
		
		fVals.fkSite = this.getSiteID();
		
		fVals.contentType = this.contentType;
		fVals.makeGroup = this.getSelectedMakes();
		if(Ext.ux.data.in_array(fVals.contentType, doSerialize))  {
			if(Ext.ux.data.isArray(fVals.makeGroup)) {
				for(var i = 0; i < fVals.makeGroup.length; i++) {
					fVals.makeGroup[i] = this.getModelPanel().getTreeContents('modelList-'+fVals.makeGroup[i]);	
				}
			}
			else
				fVals.makeGroup = this.getModelPanel().getTreeContents('modelList-'+fVals.makeGroup);	
		}
		console.log('fvals=',fVals);
		
		var p = this.getSecondCitiesPanel();
		fVals.cities = new Array(fVals.city1);
		for(var j = 0; j < p.items.length; j++) {
			var tf = p.items.get(j);
			if($.trim(tf.getValue()) != "") fVals.cities.push(tf.getValue());
		}
		
		
		return fVals;
		//fp.getForm().submit();
		//console.log(Ext.getCmp("contentType-rg").getValue());
		
		
		

	},
	
	displayMakes: function() {
		
		this.makeStore.addListener({
			'load': {
				fn: function(store, recs, opts) {
					//console.log(this);
					this.getMakePanel().initDisplay(recs,opts);
				},
				scope: this
			},
			'update': {
				fn: function(s, rec, op) {
					//s: store, rec: changed record, op: operation that was preformed
					console.log('updated');
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
		//console.log(selected);
		return selected.keys;
	},
	
	onMakeSelect: function(c, val) {
		//console.log(this.makeStore, arguments);
		
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
	
	getSiteData: function() {
		
	},
	
	getSiteID: function() {
		
		return this.getTopToolbar().getComponent('fkSite').getValue();
	
	},
	
	getMakePanel: function() {
		return this.getComponent('inventoryFS').getComponent('make-display-panel');
	},
	
	getModelPanel: function() {
		return this.getComponent('inventoryFS').getComponent('model-display-panel');
	},
	
	getSecondCitiesPanel: function() {
		//console.log(this.getCoponent('siteFS').getComponent('second-cities-fs'));
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
		var values = fp.getForm().getValues();
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
    }
});
