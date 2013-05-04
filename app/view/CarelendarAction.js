Ext.define('CareMe.view.CarelendarAction', {

    extend: 'Ext.ActionSheet',
    xtype: 'calendaraction',
    requires:['CareMe.view.ReminderForm'],
    config: {

        items: [       
            {
                xtype:'reminderform'
            },
                {
                    xtype:'container',  
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype:'button',
                            text:'Cancel',
                            ui: 'action',
                            handler: function(ctx) {
                                ctx.up('calendaraction').hide();
                            }
                        },
                        {
                            xtype:'spacer',
                            width:'30px'
                        },              
                        {
                            xtype:'button',
                            id:'remindBtn',
                            ui:'confirm',
                            handler: function(ctx) {}
                        }
                    ]
                },            
            {
                xtype:'spacer',
                height:'20px'
        }]
    }
});
