Ext.define('CareMe.store.ShareStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest',
        'CareMe.model.Share'
    ],

    config: {
        model: 'CareMe.model.Share',
        storeId: 'ShareStore',
        proxy: {
            type: 'jsonp',
            url: 'http://localhost:9000/store/share',
	        reader: {
	            type: 'json',
	            rootProperty: "body"
	        }            
        }
    }
});