Ext.define('CareMe.store.CareStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest',
        'CareMe.model.Care'
    ],

    config: {
        model: 'CareMe.model.Care',
        storeId: 'CareStore',
        proxy: {
            type: 'jsonp',
            url: 'http://localhost:9000/contact/care',
	        reader: {
	            type: 'json',
	            rootProperty: "body"
	        }            
        }
    }

});