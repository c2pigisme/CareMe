Ext.define('CareMe.store.MedStore', {
    extend: 'Ext.data.Store',

    xtype: 'medStore',

    config: {
        storeId: 'MedStore',
        model: 'CareMe.model.Med'
    }
});
