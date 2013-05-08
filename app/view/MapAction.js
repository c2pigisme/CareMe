Ext.define('CareMe.view.MapAction', {
    extend: 'Ext.Map',
    xtype: 'mapaction',  
//    requires:['CareMe.view.MapForm'],
    config: {       
        fullscreen: true,
        items: [       
            {
                xtype:'toolbar'
               // xtype:'map'
            }
                // {
                //     xtype:'container',  
                //     layout: {
                //         pack: 'center',
                //         type: 'hbox'
                //     },
                //     items: [
                //         {
                //             xtype:'button',
                //             text:'Cancel',
                //             ui: 'action',
                //             handler: function(ctx) {
                //                 //TODO - reset all field
                //             }
                //         },          
                //         {
                //             xtype:'button',
                //             id:'remindBtn',
                //             ui:'confirm',
                //             text:'Remind'
                //         }
                //     ]
                // }
                ]
    }
});
