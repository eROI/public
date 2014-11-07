// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext, Example */
/**
 * Components Communication Example Application
 *
 * @author    Ing. Jozef Sakáloš
 * @copyright (c) 2008, by Ing. Jozef Sakáloš
 * @date      10. April 2008
 * @version   $Id: compcomm.js 138 2009-03-20 21:22:35Z jozo $
 *
 * @license compcomm.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the 
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */
 
Ext.ns('Ext.ux.panel');

// {{{
Ext.ux.panel.LinksPanel = Ext.extend(Ext.Panel, {
 
    // configurables
     border:false,
	 cls:'link-panel',
	 links:[{
		 alias:'Link 1',
		 id:'1'
	 },{
		 alias:'Link 2',
		 id:'2'
	 },{
		 alias:'Link 3',
		 id:'3'
	  }],
	 layout:'fit',
	 tpl:new Ext.XTemplate('<tpl for="links"><a class="pageviewLink" href="#" ext:recordId="{alias}">{name}</a></tpl>'),
	 
	 initComponent: function() {
	 	
		Ext.ux.panel.LinksPanel.superclass.initComponent.apply(this, arguments);
		
		this.addEvents('pageClick');
		
	 },
	 
	 xafterRender:function() {
 
        // call parent
        Ext.ux.panel.LinksPanel.superclass.afterRender.apply(this, arguments);
 
 
 		this.loadPageList();
	
	
    },  // e/o function afterRender
	loadPageList: function() {
		
		if(arguments[0] !== null) {
			this.tpl.overwrite(this.body, {links:arguments[0]});
		}
		
		else {
		
			Ext.Ajax.request({
				url: 'cs_ajax.php',
				params: { method: 'getPages'},
				scope: this,
				success: function(ball, opts) {
					var r = Ext.decode(ball.responseText);
					this.tpl.overwrite(this.body, {links:r.response});
				}
			});
			
		}
		
		
	}
 
}); // e/o extend
 
// register xtype
Ext.reg('linkspanel', Ext.ux.panel.LinksPanel);