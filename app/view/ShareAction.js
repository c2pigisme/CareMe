Ext.define('CareMe.view.ShareAction', {

    extend: 'Ext.ActionSheet',
    height: '300px',
    width: '300px',
    xtype: 'shareaction',

    config: {
        items: [
            {
                text: 'Approve',
                ui  : 'action',
                handler: function(e, b) {
                    var sheet = this.getParent();
                    sheet.setData({});
                    sheet.hide();
                } 
            }, 
            {
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
