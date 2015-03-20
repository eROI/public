// JavaScript Document

SiteDubbingTool = Ext.extend(Ext.Viewport, {
	
	clientInfo: null,
	
	constructor: function(config) {
				
		var makeStore= new Ext.data.JsonStore({
			url: 'ajax.php',
			baseParams: {
				method: 'getMakeList',
				data: ''
			},
			fields: ['ID', 'MakeName', {name: 'Selected', defaultValue: false}],
			root: 'response',
			idProperty: 'ID',
			listeners: {
				'load': {
					fn: function() { this.hideMask(1); },
					scope: this
				}
			}
		});
		
		
		config = Ext.apply({
				layout: 'card',
				activeItem: 0,
				items: [{
					layout: 'fit',
					html: '<img src="resources/extanim32.gif" width="32" height="32" style="margin-right:8px;" align="absmiddle" /> Loading&hellip;',
					itemId:'mask'
				},{
					xtype: 'clientform',
					autoScroll: true,
					itemId: 'client',
					makeStore: makeStore,
					tbar: [{
						xtype: 'label',
						text: 'Site ID'
					}, {
						xtype: 'textfield',
						name: 'fkSite-field',
						id: 'fkSite'
					}, {
						text: 'Get Data',
						handler: this.getSiteData,
						scope: this
					}, {xtype: 'tbspacer', width: 50}, {
						id: 'sitefind',
						xtype: 'combo',
						width: 200,
						mode: 'local',
						store: new Ext.data.ArrayStore({
							fields: [ 'name', 'value'],
							valueField: 'value',
							displayField: 'name',
							listeners: [{
								
							}]
						}),
						listeners: {
							'render': {
								fn: function() {
								
								}
							}
						}
					}],
					bbar: {
						height: 30,
						items: [{
							text: 'Get Content',
							id: 'submitBtn',
							handler: function() {	Ext.History.add("generate"); },
							scope: this
						}, {
							text: 'Reset',
							handler: this.resetClient,
							scope: this
						}]
					}						
				}]
				
			}, config);
		
		/*var cookies = Cookie.getData();
		
		Cookie.init({name: "dubbs", expires: 420});*/
		
		this.initHistory();
		
		 //$.history.init(this.submitClient);
		SiteDubbingTool.superclass.constructor.call(this, config);
	},
	/*
	onRender: function() {
		
		this.getComponent('clientform').
	
	},*/
	
	showMask: function() { this.layout.setActiveItem(0); },
	
	hideMask: function(n) { this.layout.setActiveItem(n); },
	
	changeHistory: function(token) {
		
		
		var token = token || "";
		switch(token) {
			case 'generate' : this.submitClient(); break;
			case '': this.hideMask(1); break;			
		}
		
	},
	
	initHistory: function() {
		
		this.historyForm = Ext.getBody().createChild({
			tag:    'form',
			action: '#',
			cls:    'x-hidden',
			id:     'history-form',
			children: [{
				tag: 'div',
				children: [{
					tag:  'input',
					id:   Ext.History.fieldId,
					type: 'hidden'
				}, {
					tag:  'iframe',
					id:   Ext.History.iframeId
				}]
			}]
		});
		
		//initialize History management
		Ext.History.init();
		Ext.History.on('change', this.changeHistory, this);
	},
	
	submitClient: function() {
		
		
		this.showMask();
		
		var client = this.getComponent('client').GetFormValues();
		//if(window.console) console.log(client);
		if(client) {
			
			var d = this;
			
			this.saveSiteData(client);
			
		
			$.getScript('js/'+this.includes[client.contentType], function() {
				 //$.history.load(client);
				 //location.hash = 'submit';
				 if(window.console) console.log(client);
				d.initContent(client);
			});
		}
		
		else {
			this.hideMask();	
		}
		
	},
	
	initContent: function(c) {
		
		var vp = new DubbingWindow({
			id: 'dubbs',
			customer: new Ext.ux.data.DealerRecord({data: c}),
			modelInfo: new Ext.ux.data.dealerModels({
				data: c.makeGroup,
				fields: ['makeID', 'makename', 'modelid', 'modelname', 'isChecked', {name: 'shown', defaultValue: 'false'}]
			}),		
			flockStore: new Ext.ux.data.FlockStore({
				data: Ext.ux.data.flockData,
				fields: [{name: 'alias', type: 'string'}, {name: 'flock', type: 'array'}, {name: 'tags', type: 'array',defaultValue: null }],
				idProperty: 'alias',
				packageLevel: c['seoPackageSelect']
			})
		});
		
		this.add(vp);
		this.hideMask(2);
		
	},
	
	resetClient: function() {
		this.getComponent('clientform').getForm().reset();
	},
	
	getSiteData: function() {

		var siteID = this.getComponent('client').getTopToolbar().get('fkSite').getValue();
		if(!isNaN(siteID)) {
	
			// ajax call to get site data
			Ext.Ajax.request({
				url: 'ajax.php',
				method: 'POST',
				params: {
					method: 'getSiteData',
					data: siteID
				},
				scope: this,
				success	: function(response, opts) {
					
					data = Ext.decode(response.responseText);
					this.getComponent('client').setFormValues(data);
				}
			});
		}
	},
	
	saveSiteData: function(d)  {
		var data = $.extend(true, {}, d);
		var toEscape = ['address', 'cities', 'makes', 'dealershipName', 'phone'];
		
		delete data['makeGroup'];
		
		
		for (var i = 0; i < toEscape.length; i++) {
			
			var key = toEscape[i];
			if(data[key] && !$.isArray(data[key]))  data[key] = escape(data[key]);
				
			else {
				
				// if data[key] is Array
				for(var j = 0; j < data[key].length; j++) {
					data['cities'][j] = escape(data['cities'][j]);
				}
			}
			
				/*
			else if(key == ('makeGroup' || 'cities')) {
				
				if(key == 'cities') {
		
					for(var j = 0; j < data[key].length; j++) {
						data['cities'][j] = escape(data['cities'][j]);
					}
					
				}
				
				else if(key == 'makeGroup') {
					data['makes'] = new Array();
					if(data['contentType'] == 'g') {
						
						for(var j = 0; j < data['makeGroup'].length; j++) {
							data['makes'].push(data['makeGroup'][j][0].makeID);
						}
					}
					
					else {
						
						for(var j = 0; j < 5; j++) {
							var m = Ext.util.Format.trim(data['custom-model-make-'+j]);
							if(window.console) console.log(m);
							if(m != "" && m != 'undefined') {
								data['makes'].push(m);
								delete data['custom-model-make-'+i];
							}
						}
						
					}
					
					delete data['makeGroup'];
				
				}
			}*/
		}
		if(window.console) console.log('saving site data', d, data);
		Ext.Ajax.request({
			url: 'ajax.php',
			method: 'POST',
			params: {
				method: 'saveData',
				data: Ext.encode(data)
			},
			scope: this,
			success	: function(response, opts) {
				
			},
			failure: function() {
				Ext.MessageBox.alert('Error', "The site data didn't save.");
			}
			
		
		});
	}
});