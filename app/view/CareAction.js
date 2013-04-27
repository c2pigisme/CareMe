Ext.define('CareMe.view.CareAction', {

    extend: 'Ext.ActionSheet',
    height: '300px',
    width: '300px',
    xtype: 'careaction',

    config: {
        items: [{
                text: 'Delete',
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
