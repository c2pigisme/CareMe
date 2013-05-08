Ext.define('CareMe.view.CarelendarAction', {
    extend: 'Ext.Panel',
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
                                //TODO - reset all field
                            }
                        },          
                        {
                            xtype:'button',
                            id:'remindBtn',
                            ui:'confirm',
                            text:'Remind'
                        }
                    ]
                }]
    }
});
