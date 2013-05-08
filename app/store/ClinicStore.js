Ext.define('CareMe.store.ClinicStore', {
    extend: 'Ext.data.Store',
    requires: [
        'CareMe.model.Clinic'
    ],
    config: {
        //autoLoad: true,
        model: 'CareMe.model.Clinic',
        storeId: 'ClinicStore',
        proxy: {
            type: 'jsonp',
            url: 'http://careme.dyndns.org:9000/clinic',
            reader: {
                type: 'json',
                rootProperty: 'body',
                //useSimpleAccessors: true
            }
        }
    }
});