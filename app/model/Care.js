Ext.define('CareMe.model.Care', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'targetPhoneNumber', type:'string'},
            {name: 'displayName', type:'string', 
                convert: function(val, rec) {                   
            	   var options = new ContactFindOptions({'filter':rec.getData().targetPhoneNumber});
				   var fields = ["phoneNumbers"];
                   var myname;
                   navigator.contacts.find(fields, function(contacts) {
    				  //TODO: no need for loop in real device, remove it when deploy to device
    				  for(var i in contacts) {
    				  	if(JSON.stringify(contacts[i].phoneNumbers).indexOf(rec.getData().targetPhoneNumber) !== -1) {
                            console.log('--- found name ----') ;
    				  		myname = contacts[i].displayName;
                            break;
    				  	}
    				  }
    				}, function(){}, options);
                    return myname;
                }
        	},
            {name: 'status', type:'number'}
         ]
    }
});
