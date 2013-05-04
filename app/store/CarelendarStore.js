Ext.define('CareMe.store.CarelendarStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'CareMe.model.CarelendarEvent',
        storeId: 'CarelendarStore',
        // proxy: {
        //     type: 'jsonp',
        //     //TODO: change to public domain
        //     url: 'http://localhost:9000/events',
	       //  reader: {
	       //      type: 'json',
	       //      rootProperty: "body"
	       //  }            
        // }
    }

});