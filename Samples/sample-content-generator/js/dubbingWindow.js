// JavaScript Document

Ext.ns('Ext.ux.ds', 'Ext.ux.data');

Ext.ux.ds.TextArea = Ext.extend(Ext.Panel, {
	
	
	initComponent: function(config) {
	
		var config = {
			width: 555,
			style: { padding: '5px', margin: '20px 0'},
			items: [{
				xtype: 'textarea',
				enableKeyEvents: true,
				width: 550,
				height: 80
			}],
			bbar: new Ext.Toolbar({
				items: [new Ext.Toolbar.TextItem('Character Count: 0')]
			})
		};
		
		if(this.initialConfig.height == 200) config.items[0].height = 175;
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		
		
		// call parent
		Ext.ux.ds.TextArea.superclass.initComponent.apply(this, arguments);	
		this.on('render', function(c) {
			
			this.get(0).addListener('keyup', this.updateCount, this);
			
		});
	},
	
	setValue: function(v) {
		
		var tf = this.get(0);
		tf.setValue(v);	
		this.updateCount(tf, null);
			
	},
	
	selectText: function() {
		this.get(0).selectText();
	},
	
	getValue: function() {
		this.get(0).getValue();
	},
	
	updateCount: function(cmp, e) {

		var len = (cmp.getValue().length || 0)
		this.getBottomToolbar().items.get(0).update('Character Count: ' + len);
	}
	
});


DubbingWindow = Ext.extend(Ext.Panel, {
	
	layout: 'border',
	customer: null,
	modelInfo: null,
	
	initComponent: function() {
		var config = {
			items: [{
				xtype: 'linkspanel',
				id: 'pageListPanel',
				region: 'west',
				title: 'Page List',
				width: 200
			}, {
				region: 'center',
				layout: 'card',
				id: 'dubbedview'
			}]
		};
		
		//console.log('dubwindow init', config);
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		//Ext.apply(this, config);
 
		// call parent
		DubbingWindow.superclass.initComponent.apply(this, arguments);	
		
		var pageView = this.getComponent('pageListPanel');
		
		pageView.on({
			'afterrender': {
				fn: function() {
					
					var pages = pageView.loadPageList(Ext.ux.data.pageData);	
					pageView.getEl().on('click', this.onPageClick, this, {delegate: '.pageviewLink', stopEvent: true});
					
				},
				scope: this
			}
		});
		
	},
	
	onPageClick: function(e, t) {
		
		//var alias = 'home';
		var alias = t.getAttribute('ext:recordid');
		
		
		if(alias == 'all-content') {
			
			this.generateAllContent();
			
		}
		
		else {
			
			var links = (this.customer.get('packageType') < 2) ? false : true;
	
			var panel = this.getComponent('dubbedview');
			if(panel.findById(alias + '-content-panel')) {
				//show panel
				panel.layout.setActiveItem(alias+'-content-panel');
			}
			
			else {
				if(alias == 'home') {
					var cp = new Ext.ux.ds.hpContentPanel({
						alias: alias,
						id: alias+'-content-panel',
						linksAllowed: links
					});	
				}
				else {
					var cp = new Ext.ux.ds.ContentPanel({
						alias: alias,
						id: alias+'-content-panel',
						linksAllowed: links
					});
				}
				
				var meta = this.generateMetaContent(alias);
				var content = this.generateContent(alias);
				
				cp.getTopToolbar().add({
					text: 'Refresh Content',
					icon: 'img/arrow_refresh.gif',
					scope: this,
					handler: function(o, e) {
						var cp = this.getComponent('dubbedview').getComponent(o.fkPage+'-content-panel');
						var text = this.generateContent(o.fkPage);
						cp.setContent(text);
					},
					fkPage: alias
				},
				{xtype: 'spacer', width: 50}, {
					text: 'Toggle Links',
					scope: this,
					icon: 'img/link.png',
					handler: function(o, e) {
						var cp = this.getComponent('dubbedview').getComponent(o.fkPage+'-content-panel');
	
						if(!cp.linksAllowed) Ext.MessageBox.alert("Error!", 'Links are not allowed. Please go back and select an SEO package that allows links.');
						
						else  cp.toggleLinks();
					},
					fkPage: alias
				});
				panel.add(cp);
				panel.layout.setActiveItem(cp.id);
				
				cp.updateMeta(meta);
				cp.setContent(content);
				
				
				
			}
		}
		//this.generateContent();
	},
	
	generateAllContent: function() {
		
		
		var myContent = new Array();
		var output = '';
		
		for(var i = 0; i < Ext.ux.data.pageData.length; i++) {
			
			var pagename, cpagemeta, pagecontent = '';
			var p = Ext.ux.data.pageData[i]
			if(p.alias != 'all-content' && p.alias != 'home') {
				pagename = p.alias;
				pagemeta = this.generateMetaContent(p.alias);
				pagecontent = this.generateContent(p.alias);
				
				output += '\n\n\n******************************************************\n\n';
				output += '<h2 style="margin-bottom: 20px">'+pagename+'</h2>\n';
				output += '<h3 style="margin-bottom: 20px>Title</h3>\n\n'+pagemeta.title+'\n\n\n';
				output += '<h3 style="margin-bottom: 20px>Description</h3>\n\n\n'+pagemeta.desc+'\n\n\n';
				output += '<h3 style="margin-bottom: 20px>Content</h3>\n\n'+pagecontent+'\n\n';
				
			}
		}
		
		if(window.console) console.log(output);
		
		var myNewPanel = new Ext.Panel({
			id: 'allContentPanel',
			layout: 'fit',
			title: "All Content",
			autoScroll: true,
			html: output
		});
		
		var panel = this.getComponent('dubbedview');
		panel.add(myNewPanel);
		panel.layout.setActiveItem(myNewPanel);
	},
	
	generateContent: function(alias) {
		
		var ret = '';
		var contentArr = [];
		
		var flock = this.flockStore.getFlock(alias);
			
		if(window.console) console.log('generating: ' + alias, flock);
		
		for(var j = 0; j < flock.length; j++) {
			var flipped = Ext.ux.data.FlipFlock(flock[j], this);
			contentArr.push(flipped);
		}						
		
		var el = document.createElement("div");
		$(el).addClass("genContent");
		
		if(Ext.ux.data.imgContent[alias] != null) {
			var img = document.createElement("img");
			var ss = this.customer.get('sitespecific')
			if(ss != 'ss')
				var src = 'http://' + this.customer.get('dealerURL') + '/sitespecific/' + ss + '/medialibrary/' + Ext.ux.data.imgContent[alias].src;
			else
				var src = 'img/pageImg/' + Ext.ux.data.imgContent[alias].src;
			var alt = Ext.ux.data.FlipFlock(Ext.ux.data.imgContent[alias].alt, this);
			
			img.setAttribute("src", src);
			img.setAttribute("alt", alt);
			img.setAttribute("class", 'stockImg');
			
			
			$(el).prepend(img).prepend('<style type="text/css"> .genContent img.stockImg { float: left; margin: 0 20px 5px 0; border: 2px solid #000; }</style>');
		}
		
		for(var p = 0; p < contentArr.length; p++) {
			$(el).append(contentArr[p] + "\r");
		}
		
		if(alias == "home") {
			$(el).addClass("hpContent");
			
			if(this.customer.get('contentType') == 'g' && this.customer.get('packageType') > 1)	$(el).append(this.generateMMList());
		}
		
		return $(document.createElement("div")).append(el).html();
	},
	
	generateMetaContent: function(alias) {
		
		var retObj = {};
		
		retObj.title = Ext.ux.data.FlipFlock(Ext.ux.data.titleContent[alias], this);
		retObj.desc = Ext.ux.data.FlipFlock(Ext.ux.data.descContent[alias], this);
		
		return retObj;
		
	},
	
	generateMMList: function() {
		var el = document.createElement("div");
		var makes = this.modelInfo.ListMakes();
		var loc, href = "";
		var list, div, a = null;
		var models = [];
		
		for(var i = 0; i < makes.length; i++) {
			
			loc = this.customer.get("primaryCity") + ", " + this.customer.get("state");
			list = document.createElement("ul");
			models = this.modelInfo.getAll(makes[i]);
			href = "http://"+this.customer.get("dealerURL")+"/new-inventory/"+Ext.ux.data.urlFormat(makes[i])+"-";
			
			for(var m = 0; m < models.length; m++) {
				title = makes[i] + " " + models[m] + " | New " + models[m] + " | " + loc;
				a = document.createElement("a");
				a.setAttribute("href", href + Ext.ux.data.urlFormat(models[m]));
				a.setAttribute("title", title);
				a.innerHTML = makes[i] + " " + models[m];
				$(list).append($(document.createElement("li")).append(a));
				a = null;
		  	}
			
			div = document.createElement("div");
			$(el).append("<h3 title='New " + makes[i] + " Inventory - " + loc + "'>New " + makes[i] + " Inventory</h3>");
			
			$(el).append($(div).addClass("hpInvLinkList").append(list));
			$(el).append("<br>");
		}
		
		return $(el).html();
	}
});

Ext.reg('dubber', DubbingWindow);
Ext.reg('mytextarea', Ext.ux.ds.TextArea);