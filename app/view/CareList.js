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