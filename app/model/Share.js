Ext.define('CareMe.model.Share', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name: 'targetPhoneNumber', type:'string'},

            {name: 'displayName', type:'string',
               convert: function(val, rec) {
               	   console.log('share: targetPhoneNumber : ' + rec.getData().targetPhoneNumber);
            	   var options = new ContactFindOptions({'filter':rec.getData().targetPhoneNumber});
				   var fields = ["phoneNumbers"];
                   var myname;
                   navigator.contacts.find(fields, function(contacts) {
    				  //TODO: no need for loop in real device, remove it when deploy to device
    				  for(var i in contacts) {
    				  	if(JSON.stringify(contacts[i].phoneNumbers).indexOf(rec.getData().targetPhoneNumber) !== -1) {
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
