Ext.define('CareMe.view.ContactList', {
    extend: 'Ext.Container',

    xtype: 'contactlist',

    requires: ['CareMe.store.ContactStore'],

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype:'list',
            store: 'ContactStore',
            onItemDisclosure: true,
            iconMask: true,
            loadingText: "Loading Contacts...",
            itemTpl:'<b>{displayName}</b><br/>' +
                '<i>{targetPhoneNumber}</i><br/>' +
                '<div style="font-size:0.8em;color:darkgrey;">{email}&nbsp;</div>' +
                //'<div class="contactlist x-button x-button-icon x-icon-mask heart"></div>'+
                '<div style="clear:both;display:none"></div>'
            // items:[{
            //     xtype: 'button',
            //     title: 'Hello',
            //     iconCls: 'star'
            // }]     
        }]
    }
});


