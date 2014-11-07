// JavaScript Document
Ext.tree.TreeLoader.override({
	processResponse : function(response, node, callback){
		var json = response.responseText;
		try {
			var o = eval("("+json+")");
			node.beginUpdate();
			for(var i = 0, len = o.length; i < len; i++){
				var n = this.createNode(o[i]);
				if(n){
					node.appendChild(n);
					if(this.preloadChildren){
						this.doPreload(n);
					}
				}
			}
			node.endUpdate();
			if(typeof callback == "function"){
				callback(this, node);
			}
		}catch(e){
			this.handleFailure(response);
		}
	}		
});

Ext.override(Ext.form.RadioGroup, {
 
    afterRender: function() {
        var group = this;
        this.items.each(function(field) {
            // Listen for 'check' event on each child item
            field.on("check", function(self, checked) {
             
              // if checkbox is checked, then fire 'change' event on RadioGroup container
              if(checked)
                // Note, oldValue (third parameter in 'change' event listener) is not passed, 
                // because is not easy to get it
                group.fireEvent('change', group, self.getRawValue());
               
            });
        });
       
        Ext.form.RadioGroup.superclass.afterRender.call(this)
    }

}); 

function cleanContent(c) {
	var returnThis = "";
	if(isArray(c)) {
		for(var i = 0; i < c.length; i++) {
			returnThis += "<p>" + c[i] + "</p>\r";
		}
	}
	else if(c.search("displayHTML = true") >=0) {
		returnThis = c.replace("<!-- displayHTML = true -->", "").trim();
	}
	else
		returnThis = "<p>" + c + "</p>";
		
	return returnThis;
}

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

