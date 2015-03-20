Ext.ns('Ext.ux.ds', 'Ext.ux.data');

Ext.ux.ds.ContentTypeRadioGroup = Ext.extend(Ext.form.RadioGroup, {
	
	initComponent: function() {
		
		var config = {
			items: [
				{boxLabel: 'General', name: 'contentType', inputValue: 'g', id: 'radio-g', checked: true},
				{boxLabel: 'Used', name: 'contentType', inputValue: 'u', id: 'radio-u'},
				{boxLabel: 'Finance', name: 'contentType', inputValue: 'f', id: 'radio-f', disabled: true},
				{boxLabel: 'Commercial', name: 'contentType', inputValue: 'c', id: 'radio-c', disabled: true},
				{boxLabel: 'Make Specific', name: 'contentType', inputValue: 'm', id: 'radio-m', disabled: true}
			],
		}; 
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		//Ext.apply(this, config);

		// call parent
		Ext.ux.ds.ContentTypeRadioGroup.superclass.initComponent.apply(this, arguments);	
		
	}
});
	
Ext.ux.ds.ModelSelectPanel = Ext.extend(Ext.Panel, {
	
	layout: 'column',
	dataURL: 'ajax.php',
	method: 'getModels',
	panelIDPrefix: 'modelList-',
	
	initComponent: function() {
		
		var config = {
			tbar: [{
				text: 'Get Models',
				handler: this.initTrees,
				scope: this
			}, {
				text: 'Clear Models',
				handler: this.clearModels,
				scope: this
			}, {
				xtype: 'hidden',
				id: 'customMakes',
				name: 'customMakes',
				value: false
			}],
			items: []
		}; 
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		//Ext.apply(this, config);

		// call parent
		Ext.ux.ds.ModelSelectPanel.superclass.initComponent.apply(this, arguments);	
		
	},
	
	showTrees: function(vals, action) {
		/*if(action == 'add') {
			
			Ext.each(vals
			Ext.Ajax.request({
				url: 'ajax.php',
				method: 'POST',
				params: {
					method: 'getModels',
					data: obj.mkID,
					name: obj.mkName,
					mdls: Ext.encode(obj.models)
				},
				success: this.addTree,
				faliure: function() {
					alert("your face!");
				}
			});
		}	
		}*/
	},
	
	initTree: function(makeRec) {
		
		Ext.Ajax.request({
			url: this.dataURL,
			method: 'POST',
			params: {
				method: this.method,
				data: makeRec.get('ID'),
				name: makeRec.get('MakeName')
			},
			success: this.showTree,
			failure: function() { alert('Failed to initialize models.'); },
			scope: this
		});
		
	},
	
	showTree: function(response, opts) {
		var results = Ext.decode(response.responseText);
		
		var treeContents = new Array();
		/*var mdlPanel = Ext.getCmp('modelDisplay');
		if(opts.params.mdls) var mdls = Ext.decode(opts.params.mdls);
		else*/ var mdls = 0;
		
		Ext.each(results.response, function(obj, i) {
			var check = true;
			var cls = 'green';
			if(mdls) {
				if(!Ext.ux.data.in_array(obj.ID, mdls)) { check = false; cls = 'red'; }
			}
			treeContents.push({text: obj.Model, id: "m-"+obj.ID, leaf: true, cls: cls, checked: check});
		});
		
		var tree = new Ext.tree.TreePanel({
			id: this.panelIDPrefix+opts.params.data,
			autoScroll: true,
			width: 250,
			height: 200,
			enableDD: true,
			root: new Ext.tree.AsyncTreeNode({
				text: opts.params.name,
				expanded: true,
				rootVisible: true,
				children: treeContents,
				id: "tree-root-" + opts.params.data
			})	
		});			
		tree.on('click', this.toggleTreeCheck);
		
		this.add(tree);
		this.doLayout();
		
	},
	
	toggleTreeCheck: function(n, e) {
		var ui = n.getUI();
		ui.toggleCheck();
		if(ui.isChecked()) {
			ui.removeClass("red");
			ui.addClass("green");
		}
		else {
			ui.removeClass("green");
			ui.addClass("red");
		}
	},
	
	removeTree: function(r) {
		var id = r.get('ID');
		

		this.remove(this.panelIDPrefix + id);
		this.doLayout();
	},
	
	getTreeContents: function(treeID) {
		
		var treeRoot = this.getComponent(treeID).getRootNode();
		var make = {};
		
		make.id = treeID;
		make.name = treeRoot.getUI().getTextEl().innerHTML;
		
		var retThis = [];
		
		//each treeRoot.node , add {makeID: make.id, makename: make.name, modelname: model.name, modelid: model.id
		treeRoot.eachChild(function (n) {
			this.push({makeID: make.id.substring(10), makename: make.name, modelname: n.getUI().getTextEl().innerHTML, modelid: n.id.substring(2), isChecked: n.getUI().isChecked()});
		}, retThis);
		
		return retThis;
	},
	
	selectModels: function(id, selected) {
		
	}

});
	
Ext.ux.ds.MakeSelectPanel = Ext.extend(Ext.Panel, {


	initComponent: function() {
		
		var config = {
			title: 'Select Makes',
			items: [{ html: 'select makes here' }],
			layout: 'card',
			margin: '10 10 10 10',
			cbg: null,
		}; 
		
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		//Ext.apply(this, config);

		// call parent
		Ext.ux.ds.MakeSelectPanel.superclass.initComponent.apply(this, arguments);	
		
	},
	
	initDisplay: function(response, opts) {

		var items = [];
		Ext.each(response, function(obj, i) {
			items.push({boxLabel: obj.get('MakeName'), name: 'makeGroup', inputValue: obj.get('ID'), id: 'cb-makes-'+obj.get('ID'), listeners: { 'check': { fn: this.form.onMakeSelect, scope: this.form}}  }); 
		}, this);
		
		var cbg = new Ext.form.CheckboxGroup({
				fieldLabel: 'Select Your Makes',
				columns: 6,
				style: {
					"border": "2px solid #000",
					"padding": "5px"
				},
				id: 'defaultMakes-cg',
				cls: "makeSelect", 
				items: items
		});
		
		var customsPanel = new Ext.Panel({
			id: "custom-models-panel",
			layout: 'form',
			cls: 'borderBottom',
			height: 200,
			bodyStyle: 'padding: 15px',
			xdefaults: {
				hideBorder: true,
				width: 300,
				cls: 'noBorder',
				bodyStyle: { padding: '0 10 0 5'}
			}
		});
		
		for(var i = 0; i < 6; i++) {
			customsPanel.add(new Ext.form.TextField({  name: 'custom-model-make-'+i,	id: 'custom-make-name-'+i, fieldLabel: 'Custom Make/Model ' + i}));
		}

		
		this.add(cbg);
		this.add(customsPanel);
		this.doLayout();
		this.layout.setActiveItem("defaultMakes-cg");
		this.addCustomEvents();
		
		
	},
	
	getSelected: function() {
		
		var m = this.get('defaultMakes-cg').getValue();
		var ret = [];
		var r = {};
		for(var i = 0; i < m.length; m++) {
			
			
		}
		
	},
	
	addCustomEvents: function() {
		
	},
	
	getActivePanel: function() {
		return this.getLayout().activeItem.id;
	},
	
	getMakeCBG: function() {
		return this.getComponent('defaultMakes-cg');
	},
	
	getCustomMakes: function() {
		return this.getComponent('custom-models-panel');
	},
	
	setMakes: function(m, isCustom) {
		
		var cbg = this.getMakeCBG();
		cbg.setValue('cb-makes-'+m, true);	
				
	}
});

Ext.reg('contenttype-rg', Ext.ux.ds.ContentTypeRadioGroup);
Ext.reg('makepanel', Ext.ux.ds.MakeSelectPanel);
Ext.reg('modelpanel', Ext.ux.ds.ModelSelectPanel);
