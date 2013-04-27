Ext.define('CareMe.view.ShareList', {
    extend: 'Ext.Container',

    xtype: 'sharelist',

    requires: ['CareMe.store.ShareStore'],
    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype:'list',
            store: 'ShareStore',
            onItemDisclosure: true,
            iconMask: true,
            loadingText: "Loading Contacts...",
            itemTpl:'<div>List Item {phone} - {status}</div>'
        }]
    }


});