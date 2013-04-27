Ext.define('CareMe.store.SessionStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.LocalStorage',
        'CareMe.model.Session'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'CareMe.model.Session',
        storeId: 'SessionStore',
        proxy: {
            type: 'localstorage',
            id: 'careme-session'
        }
    }
});