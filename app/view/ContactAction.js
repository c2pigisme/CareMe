Ext.define('CareMe.view.ContactAction', {

    extend: 'Ext.ActionSheet',
    height: '300px',
    width: '300px',
    xtype: 'contactaction',

    config: {
        refs: {
            ctx: 'servercontroller',
        },
        items: [{
            text: 'Care',
            ui  : 'action'
        }, {
            text: 'Share',
            ui  : 'action'
        }, {
            text: 'Cancel',
            ui  : 'confirm'
        }]
    }
});
