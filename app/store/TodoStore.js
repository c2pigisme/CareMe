Ext.define('CareMe.store.TodoStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'CareMe.model.TodoEvent',
        storeId: 'TodoStore'
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