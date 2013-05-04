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
            itemTpl : new Ext.XTemplate(
                '<img class="photo" src="{photo}" width="60" height="60"/>',
                '<b>{displayName}</b>   ',
                '<tpl if="status == 0 "><i>pending</i><br/></tpl>',
                '<div style="clear:both;display:none"></div>'
            ) 

        }]
    }


});