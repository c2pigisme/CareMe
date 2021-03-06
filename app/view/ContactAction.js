Ext.define('CareMe.view.ContactAction', {

    extend: 'Ext.ActionSheet',
    height: '300px',
    width: '300px',
    xtype: 'contactaction',

    config: {
        refs: {
            ctx: 'servercontroller',
            mainView: 'mainview'
        },
        items: [{
                text: 'Care',
                ui  : 'action',
                handler: function(e, b) {
                    var sheet = this.getParent();
                    sheet.setData({});
                    sheet.hide();
                } 
            }, 
            {
                text: 'Share',
                ui  : 'action',
                handler: function(e, b) {
                    var sheet = this.getParent();
                    sheet.setData({});
                    sheet.hide();
                }                 
            }, 
            {
                text: 'Cancel',
                ui  : 'confirm',
                handler: function(e, b) {
                    var sheet = this.getParent();
                    sheet.setData({});
                    sheet.hide();
            }
        }]
    }
});
