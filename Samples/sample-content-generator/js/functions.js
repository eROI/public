function GetSiteData() {
	var siteID = Ext.getCmp("fkSiteTF").getValue();
	if(!isNaN(siteID)) {

		// ajax call to get site data
		Ext.Ajax.request({
			url: 'ajax.php',
			method: 'POST',
			params: {
				method: 'getSiteData',
				data: siteID
			},
			success	: function(response, opts) {
				
				data = Ext.decode(response.responseText);
				
				var f = Ext.getCmp("fp").getForm();
				
				//first, set all textField values
				f.setValues({
					dealershipName: data.dealershipName,
					dealerURL: data.dealerURL,
					city1: data.city1,
					phone: data.phone,
					address: data.address,
					zip: data.zip,
					city2: data.city2,
					city3: data.city3,
					city4: data.city4,
					city5: data.city5,
					state: data.state
				});
				
				//set content tyoe
				Ext.getCmp("contentType-rg").setValue('radio-'+data.contentType, true);
				
				if(!data.customMakes || data.customMakes == "false") {
					//set make info, then send model data to disModels()
					for(var i = 0; i < data.makeGroup.length; i++) {
						var mkID = data.makeGroup[i];
						var mkName = Ext.query("label[for=cb-makes-"+mkID+"]")[1].innerHTML;
						Ext.getCmp("cb-makes-"+mkID).setValue(1);
						
						/*
							call displayModels(mkID, array of models, name of make);
						*/
						
						displayModels({mkID: mkID, models: data['modelList-'+mkID], mkName: mkName});
					}
				}
				else {
					var i = 1;
					while(data['custom-model-make-'+i]) {
						f.setValues([{
							id: 'custom-model-make-'+i, 
							value: data['custom-model-make-'+i]
						}]);
						i++;
					}
				}
				Ext.getCmp('submitBtn').enable();
			}, 
			faliure: function() {
				Ext.MessageBox.alert("Sorry!", "Could not load the site's data");
			}
		});
	}
}

function displayCustomMakesPanel() {
	var items = [];
	for(var i = 1; i < 6; i++) {
		items.push( {
			xtype: 'textfield', name: 'custom-model-make-'+i,	id: 'custom-make-name-'+i, fieldLabel: 'Custom Make/Model ' + i});
	}
	var panel = new Ext.Panel({
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
		},
		items: items
	});

	Ext.getCmp("make-panel").add(panel);
	fp.doLayout();
	Ext.getCmp("make-panel").layout.setActiveItem("custom-models-panel");
	enableSubmit();
}

function displayCheckbox_Makes() {

	Ext.Ajax.request({
		url: 'ajax.php',
		method: 'POST',
		params: {
			method: 'getMakeList',
			data: ''
		},
		success	: function(response, opts) {
			var results = Ext.decode(response.responseText);
			var makeCheckboxData = new Array();
			var cbg = 0;
			Ext.each(results.response, function(obj, i) {
				makeCheckboxData.push({boxLabel: obj.MakeName, name: 'makeGroup[]', inputValue: obj.ID, id: 'cb-makes-'+obj.ID});
			});
			cbg = new Ext.form.CheckboxGroup({
				fieldLabel: 'Select Your Makes',
				columns: 6,
				style: "border: 2px solid #000",
				id: 'defaults-makes-panel',
				cls: "makeSelect",	
				items: makeCheckboxData,
				listeners: {
					'change': function(group, checked) {
						//console.log(checked[0].boxLabel);
						if(checked[0].boxLabel == 'Mazda') {
							Ext.MessageBox.show({
								title: "Mazda Site?",
								msg: "Is this a Mazda - specific site?",
								buttons: Ext.MessageBox.YESNO,
								icon: Ext.MessageBox.QUESTION,
								fn: function(buttonID, text, opt) {
									if(buttonID == 'yes') {
										Ext.getCmp('submitBtn').enable();
										//Ext.getCmp('defaults-makes-panel').disable();
										Ext.getCmp("contentType-rg").setValue("radio-m",  true);
									}
								}
							});
						}
					}
				}
			});
			//console.log(cbg);
			Ext.getCmp("make-panel").add(cbg);
			fp.doLayout();
			Ext.getCmp("make-panel").layout.setActiveItem("defaults-makes-panel");
		},
		faliure: function() {
			
		}
	});

}

function displayModels(b, e) {
	var vals = Ext.query(".makeSelect input:checked");
	var makes = Array();
	
	//console.log(typeof b);
	clearModels();
	
	if(typeof b == 'string') { 
		//auto populate model tree with pre-selected values
		Ext.Ajax.request({
			url: 'ajax.php',
			method: 'POST',
			params: {
				method: 'getModels',
				data: b,
				name: arguments[2],
				mdls: Ext.encode(e)
			},
			success: showTree,
			faliure: function() {
				alert("your face!");
			}
		});
	}
	
	else {
		Ext.each(vals, function(i, n, thisArray) {
			var name = Ext.query("label[for="+i.id+"]")[1];
			makes.push({name: name.innerHTML, id: i.value});
		});
		
		if(!makes.length) Ext.MessageBox.alert("Duffus!", "Check a make before selecting models");
		
		else {
			for(var m in makes) {
				if(makes[m].id) {
					Ext.Ajax.request({
						url: 'ajax.php',
						method: 'POST',
						params: {
							method: 'getModels',
							data: makes[m].id,
							name: makes[m].name
						},
						success: showTree,
						faliure: function() {
							alert("your face!");
						}
					});
				}	
			}
			enableSubmit();
		}
	}
}

function clearModels() {
	var cmp = Ext.getCmp('modelDisplay');
	var r = cmp.removeAll(false);
	Ext.each(Ext.query('.x-tree'), function(obj, index, all) {
		Ext.getCmp(obj.id).destroy();
	});
	cmp.doLayout(false, true);
}

function serializeModels() {
	
	switch(Ext.getCmp("make-panel").getLayout().activeItem.id) {
	
		//The user has selected general content, which means he has also selected models.
		//gather the models selected, add them to the form panel
		case 'defaults-makes-panel':
			Ext.each(Ext.query('.x-tree'), function(obj, index, all) {
				var mdls = Ext.getCmp(obj.id).getChecked();
				for(var i = 0; i < mdls.length; i++) {
					var formValue = {};
					formValue.id = mdls[i].id.substring(2);
					formValue.
					var field = new Ext.form.Hidden({name: obj.id + '[]', value: value});
					fp.add(field);
					fp.doLayout()
					//document.generator[obj.id + '-Models[]'].value = mdls[i].text;
				}
			});
			break;
		case 'custom-models-panel':
			Ext.getCmp("customMakes").setValue(true);
			/*Ext.each(Ext.query('.custom-make-combo'), function(obj, index, all) {
				var value = obj.getValue();
				var id = obj.id.slice(-1);
				var field = new Ext.form.Hidden({name: obj.id + '[]', value: value});
			}*/
			break;

	}
}

function showTree(response, opts) {
	var results = Ext.decode(response.responseText);
	var treeContents = new Array();
	var mdlPanel = Ext.getCmp('modelDisplay');
	if(opts.params.mdls) var mdls = Ext.decode(opts.params.mdls);
	else var mdls = 0;
	
	Ext.each(results.response, function(obj, i) {
		var check = true;
		var cls = 'green';
		if(mdls) {
			if(!in_array(obj.ID, mdls)) { check = false; cls = 'red'; }
		}
		treeContents.push({text: obj.Model, id: "m-"+obj.ID, leaf: true, cls: cls, checked: check});
	});
	//console.log(treeContents);
	var tree = new Ext.tree.TreePanel({
		id: 'modelList-'+opts.params.data,
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
	mdlPanel.add(tree);
	mdlPanel.doLayout();
	tree.on('click', toggleTreeCheck);
	
}

function showLocale(b, e) {
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

function toggleTreeCheck(n) {
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
}

function enableSubmit() { Ext.getCmp('submitBtn').enable(); }