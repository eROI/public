
Ext.ux.ds.hpContentPanel = Ext.extend(Ext.form.FormPanel, {

	defaultType: 'textarea',
	labelWidth: 125,
	defaults: {
		width: 550,
		height: 60,
		style: {
			margin: '5px 0 20px 10px'
		}
	},
	bodyStyle: {overflow: 'scroll'},
	colorpicker: null,
	colorStore: null,
	initContent: '',
	hasLinks: true,

	

	
	initComponent: function() {
		var alias = this.initialConfig.alias;
		
		var config = {
			xtype: 'box',
			id: 'home-content-panel',
			height: 385,
			width: 1000,
			tbar: [],
			items: [{
				xtype: 'panel',
				id: alias+'-html-preview',
				title: "Content Preview",
				height: 375, 
				width: 950,
			}, {
				xtype: 'tabpanel',
				height: 500,
				width: 750,
				id: 'home-control-panel',
				items: [{
					layout: 'form',
					title: 'Meta Content',
					labelAlign: 'top',
					id: 'meta-panel',
					defaultType: 'textarea',
					defaults: {
						width: 550,
						height: 60,
						style: {
							margin: '5px 0 20px 10px'
						}
					},
					tbar: [{
					   text: 'Copy Title',
						icon: 'img/copy_icon.png',
						handler: function(o, e) {
							this.getTitleEl().selectText();
						},
						scope: this
					}, {xtype: 'tbspacer', width: 50}, {
					    text: 'Copy Description',
						icon: 'img/copy_icon.png',
						handler: function(o, e) {
							this.getDescriptionEl().selectText();
						},
						scope: this
					}],
					items: [{
						id: alias+'-title-text',
						fieldLabel: alias + ' Title'
					}, {
						id: alias+'-desc-text',
						fieldLabel: alias + ' Description'
					}]
				}, {
					layout: 'form',
					title: 'Page Content',
					id: 'page-panel',
					defaultType: 'textarea',
					defaults: {
						width: 550,
						height: 180,
						style: {
							margin: '5px 0 20px 10px'
						}
					},
					tbar: [{
					   text: 'Copy HTML',
						icon: 'img/copy_icon.png',
						handler: function(o, e) {
							this.getPageContentEl().selectText();
						},
						scope: this
					}, {xtype: 'tbspacer', width: 50}, {
					    text: 'Copy CSS',
						icon: 'img/copy_icon.png',
						handler: function(o, e) {
							this.getCssEl().selectText();
						},
						scope: this
					}],
					items: [{
						id: 'home-html',
						fieldLabel: 'Home HTML Code'
					}, {
						id: 'home-css',
						fieldLabel: 'Home CSS Code'
					}]
				}, {
					layout: 'form',
					defaultType: 'textfield',
					title: 'Colors',
					id: 'color-panel',
					defaults: { cls: 'colorInput', style: { margin: '5px 10px'} },
					items: [{
						id: 'header-bg-color',
						fieldLabel: 'Header Background'
					}, {
						id: 'header-color',
						fieldLabel: 'Header Color'
					}, {
						id: 'border-color',
						fieldLabel: 'Border Color'
					}, {
						id: 'text-color',
						fieldLabel: 'Text Color'
					}, {
						id: 'bg-color', 
						fieldLabel: 'Background Color'
					}, { 
						id: 'link-color',
						fieldLabel: 'Link Color'
					}, { 
						id: 'modelList-color',
						fieldLabel: 'Model List Subheader Color'
					}, { 
						id: 'modelList-bg-color',
						fieldLabel: 'Model List Subheader Background'
					}]
				}]
			}]
		};
	
		//Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.apply(this, config);

		// call parent
		Ext.ux.ds.hpContentPanel.superclass.initComponent.apply(this, arguments);		
		
		this.colorpicker = new Ext.ux.ColorDialog({
			title: 'Pick a Color!',
			resizable: true,
			closable: false,
			xcloseAction: 'hide',
			hsv: {h:120, s:20, v:50},
			id:'myCPicker',
			activeEl: null,
			shadow: true,
			modal: true,
			floating:true,
			bbar: new Ext.Toolbar({
				id: 'cpbbar',
				items: [
					new Ext.Button({
						text: 'Select Color',
						id: 'saveColor',
						handler: function() {
							var color = this.colorpicker.getColor(false);
							var id = this.colorpicker.activeEl;
							this.saveColor(id, color);
						},
						scope: this
					}), new Ext.Button({
						text: 'Cancel',
						id: 'cancelColor',
						handler: function() { 
							this.resetColor(this.colorpicker.activeEl, this.colorStore.getById(this.colorpicker.activeEl).data.value)
							this.colorpicker.hide(); },
						scope: this
					})
				]
			}),
			y: 50
		});
		
		this.colorpicker.on('pickcolor', this.onChooseColor, this);
		
		this.colorStore = new Ext.data.JsonStore({
			data: Ext.ux.data.defaultColorData,
			idProperty: 'name',
			fields: ['name','value', {name: 'isAuto', defaultValue: 'false'}]
		});
		
		this.getTabPanel().setActiveTab('color-panel');
		
		this.getTabPanel().on('afterrender' , function() {
			Ext.each(this.findByType('textfield'), function(obj, n, group) {
				var id = obj.id;
				if(id.indexOf("color") >= 0) {
					var el = $('#x-form-el-'+id);
					var color = this.colorStore.getById(id).data.value;
		
					el.append('<span class="colorwheel" name="'+id+'">&nbsp;</span>' + " <a class='colorbox' href='#' rel='"+id+"'>&nbsp;</a>");
					el.append('<span class="toggleColor green" id="'+id+'-toggle">&nbsp;</span>');					
					el.bind('click',{panel:this, el: id},this.showColorPicker);
					el.find('input').bind('blur', {panel: this}, this.validateHex);
					el.find('input').bind('keydown', {panel: this}, this.validateHex);
					el.find('.toggleColor').bind('click', {panel: this}, this.toggleColor);
					this.resetColor(id, color);
				}
				
			},  this);
		}, this);
	},
	
	updateContent: function(val) {
			var css = this.generateCss();
			this.getPageContentEl().setValue(val);
			this.getCssEl().setValue(css);
			this.getContentPreviewEl().update("<div id='cssContainer'>"+css+"</div>"+val);
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
	
	getPageContentEl: function() {
		return this.getTabPanel('page').getComponent('home-html');	
	},
	
	getCssEl: function() {
		return this.findById('home-css');
	},
	
	getContentPreviewEl: function() {
		return this.getComponent(this.alias+'-html-preview');
	},
	
	getTitleEl: function() {
		return this.getTabPanel('meta').getComponent(this.alias+'-title-text');	
	},
	
	getDescriptionEl: function() {
		return this.getTabPanel('meta').getComponent(this.alias+'-desc-text');	
	},
	
	getTabPanel: function(tab) {
		if(tab)
			return this.getComponent('home-control-panel').getComponent(tab+'-panel');
		else
			return this.getComponent('home-control-panel');
	},
	
	generateCss: function() {
		var styles = [];
		var hp = {selector: '.hpContent'}
		if(this.colorStore.getById('border-color').data.isAuto == 'false')
			hp['border'] = "1px solid #" + this.colorStore.getById('border-color').data.value;
			
		if(this.colorStore.getById('bg-color').data.isAuto == 'false')	
			hp['background-color'] = "#" + this.colorStore.getById('bg-color').data.value;
			
		hp['width'] = "900px";
		
		styles.push(hp);
		
		var h2 = {selector: '.hpContent h2'};
		if(this.colorStore.getById('header-color').data.isAuto == 'false')	
			h2['color'] = "#" + this.colorStore.getById('header-color').data.value;
		
		if(this.colorStore.getById('header-bg-color').data.isAuto == 'false')	
			h2['background-color'] = "#" + this.colorStore.getById('header-bg-color').data.value;
		
		styles.push(h2);
		
		var p = {selector: '.hpContent p'};
		if(this.colorStore.getById('text-color').data.isAuto == 'false')	
			p['color'] = " #" + this.colorStore.getById('text-color').data.value;
		
		styles.push(p);
		
		var a = {selector: ".hpContent a, .hpContent a:visited"};
		if(this.colorStore.getById('link-color').data.isAuto == 'false')	
			a['color'] = "#" + this.colorStore.getById('link-color').data.value;
		
		styles.push(a);
		
		var h3 = {selector: ".hpContent h3"};
		if(this.colorStore.getById('modelList-color').data.isAuto == 'false')	
			h3['color'] = "#" + this.colorStore.getById('modelList-color').data.value;
			
		if(this.colorStore.getById('modelList-bg-color').data.isAuto == 'false')	
			h3['background-color'] = "#" + this.colorStore.getById('modelList-bg-color').data.value;
		
		styles.push(h3);
		
		/*
		styles.push("@import url('http://sitespecific.dealerskins.com/webassets/css/hpContent-generic1.css');");
		styles.push(".hpContent { \r\t border: 1px solid #" + this.colorStore.getById('border-color').data.value + "; \r\t background-color: #" + this.colorStore.getById('bg-color').data.value + "; \r\t width: 900px; \r}");
		styles.push(".hpContent h2 { \r\t background-color: #" + this.colorStore.getById('header-bg-color').data.value + "; \r\t color: #" + this.colorStore.getById('header-color').data.value + "; \r}");
		styles.push(".hpContent p { color: #" + this.colorStore.getById('text-color').data.value + ";}");
		styles.push(".hpContent a, .hpContent a:visited { color: #" + this.colorStore.getById('link-color').data.value + ";}");
		*/
		
		
		
		var ret = "";
		ret += "\r<style type='text/css'>";
		ret += "\r@import url('http://sitespecific.dealerskins.com/webassets/css/hpContent-generic1-1.css');"
		for(var i = 0; i < styles.length; i++) {
			ret += "\r " + this.printStyle(styles[i]);
		}
		ret += "\r</style>";
		
		return ret;
	},
	
	printStyle: function(style) {
		var ret = style.selector + " { ";
		for(var rule in style) {
			if(rule != 'selector')
				ret += rule + ": " + style[rule] + ";\t ";
		}
		ret += "}";
		return ret;
	},
	
	resetColor: function(id, color) {
		$('#'+id).val(color);
		$("a[rel="+id+"]").css("background-color","#"+color);
	},
	
	saveColor: function(id, color) {

		this.colorStore.getById(id).set("value", color);
		this.refreshCss();
		this.colorpicker.hide();
	},
	
	showColorPicker: function(evt, el, opt) {
		if(evt.target.tagName != 'INPUT' && !$(evt.target).hasClass('toggleColor')) {
			var panel = evt.data.panel;
			panel.colorpicker.activeEl = evt.data.el;
			panel.colorpicker.setColor(panel.colorStore.getById(evt.data.el).get('value'));
			panel.colorpicker.show();	
		}
	},
	
	onChooseColor: function(p, hexa) {
		
		var id = this.colorpicker.activeEl;
		$("input[name="+id+"]").val(hexa);
		$("a[rel="+id+"]").css("background-color","#"+hexa);
	},
	
	validateHex: function(evt) {
		if(evt.type == 'blur' || evt.keyCode == 13) {
			var color = evt.target.value;
			if( color.indexOf('#') == 0) { color = color.substr(1); }
			if( color.length > 9 ) { color = color.substr(0,5); }
			if( !color.match( /^[0-9a-f]{6}$/i ) ) { 
				Ext.MessageBox.alert('Invalid Color',"You have entered an invalid color. Try again, or cancel to return to the tool.");
				$(this).val(evt.data.panel.colorStore.getById(this.id).get('value'));
			}
			else {
				evt.data.panel.saveColor(evt.target.id, color);	
			}
		}
	},
	
	toggleColor: function(evt) {
		var colorID = evt.target.id.slice(0,-7);
		var t = $(evt.target);
		var panel = evt.data.panel;
		if(t.hasClass('green')) {
			// turn OFF color
			panel.colorStore.getById(colorID).set('isAuto', 'true');
			t.removeClass('green').addClass('red');
		}
		else {
			// turn ON color
			panel.colorStore.getById(colorID).set('isAuto', 'false');
			t.removeClass('red').addClass('green');
		}
		
		panel.refreshCss();
		
	},
	
	refreshCss: function() {
		var css = this.generateCss();
		$('#cssContainer').html(css);
		this.getCssEl().setValue(css);
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
		
	}
});

