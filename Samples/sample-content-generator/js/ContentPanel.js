
Ext.ux.ds.ContentPanel = Ext.extend(Ext.form.FormPanel, {
	
	defaultType: 'mytextarea',
	labelWidth: 125,
	defaults: {
	},
	bodyStyle: {overflow: 'scroll'},
	
	frame: false,
	initContent: '',
	hasLinks: true,
	
	initComponent: function() {
		var alias = this.initialConfig.alias;
		var config = {
			defaults: { enableKeyEvents: true},
			items: [{
				id: alias+'-title-text',
				fieldLabel: alias + ' Title'
			}, {
				id: alias+'-desc-text',
				fieldLabel: alias + ' Description'
			}, {
				height: 200,
				width: 550,
				id: alias+'-content-text',
				xtype: 'textarea',
				fieldLabel: alias + ' Content'
			}, {
				xtype: 'panel',
				id: alias+'-html',
				title: "Content Preview",
				width: '100%',
				height: 350,
				width: 925,
				bodyStyle: {overflow: 'scroll', padding: '10px'}
			}],
			
			tbar: [{
				text: 'Copy Title',
				icon: 'img/copy_icon.png',
				id: 'getTitle-'+alias,
				handler: function(o, e) {
					this.getTitleEl().selectText();
				},
				scope: this
			}, {xtype: 'tbspacer', width: 50}, {
				text: 'Copy Description',
				icon: 'img/copy_icon.png',
				id: 'getDescription-'+alias,
				handler: function(o, e) {
					this.getDescriptionEl().selectText();
				},
				scope: this
			}, {xtype: 'tbspacer', width: 50}, {
				text: 'Copy Content',
				icon: 'img/copy_icon.png',
				handler: function(o, e) {
					this.getPageContentEl().selectText();
				},
				scope: this
			}, {xtype: 'tbspacer', width: 50}]
		}; // end config
		
		//Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.apply(this, config);

		// call parent
		Ext.ux.ds.ContentPanel.superclass.initComponent.apply(this, arguments);	
	},
	
	updateContent: function(val) {
			this.getPageContentEl().setValue(val);
			this.getContentPreviewEl().update(val);
	},
	
	updateMeta: function(obj) {
		this.getTitleEl().setValue(obj.title);
		this.getDescriptionEl().setValue(obj.desc);;
	},
	
	setContent: function(val) {
		this.initContent = val;
		this.updateContent(val);
		if(!this.linksAllowed) this.toggleLinks();
	},
	
	toggleLinks: function()  {
		if(this.hasLinks) {
			this.initContent =  this.getPageContentEl().getValue();
			var val = $('<blockquote/>').append(this.initContent);
			$(val).find('a').replaceWith(function() { return this.innerHTML; });
			
			if(this.linksAllowed) this.hasLinks = false;
			
			this.updateContent($(val).html());
		}
		else {
			this.hasLinks = true;
			this.updateContent(this.initContent);
		}
	},
	
	getPageContentEl: function() {
		return this.getComponent(this.alias+'-content-text');	
	},
	
	getContentPreviewEl: function() {
		return this.getComponent(this.alias+'-html');
	},
	
	getTitleEl: function() {
		return this.getComponent(this.alias+'-title-text');	
	},
	
	getDescriptionEl: function() {
		return this.getComponent(this.alias+'-desc-text');	
	}
	
});
