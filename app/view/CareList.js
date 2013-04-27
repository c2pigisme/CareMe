Ext.define('CareMe.view.CareList', {
    extend: 'Ext.Container',

    xtype: 'carelist',

    requires: ['CareMe.store.CareStore'],
    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype:'list',
            store: 'CareStore',
            onItemDisclosure: true,
            iconMask: true,
            loadingText: "Loading Contacts...",
            itemTpl:'<div>List Item {phone} - {status}</div>'
        }]
    }


});