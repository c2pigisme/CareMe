Ext.define('CareMe.view.ReminderForm', {
    extend: 'Ext.Panel',
    xtype:'reminderform',
    requires:['Ext.ux.field.TimePicker'],
    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Care Reminder',
            instructions: '',
            items: [         
                {
                    xtype: 'searchfield',
                    id:'medicine',
                    name : 'name',
                    placeHolder:'Search your medicine name',
                    itemId:'search',
                    listeners: {
						'keyup': {
							fn: function(obj) {
                                this.fireEvent('autocomplete',this);
							},
							delay: 100
						} ,
						'clearicontap': {
							fn: function(obj) {
                                this.fireEvent('clearfield',this);
							},
                            delay: 100
						}
                    }

                },
                {
                	xtype:'container',
                	layout:'hbox',
                	items:[{
	                    xtype: 'textfield',
                        id:'dosage',
	                    name : 'dosage',
                        placeHolder: 'Medicine dosage',
	                    width:'70%'

                	},
                	{
	                	xtype:'segmentedbutton',
                        id:'type',
	                	items:[{
	                		xtype:'button',
	                		text:'mg'
	                	},{
	                		xtype:'button',
	                		text:'ml'
	                	},{
	                		xtype:'button',
	                		text:'pill'
	                	}]
                	}]
                },               
                {
                    xtype: 'textareafield',
                    name : 'note',
                    id:'note',
                    placeHolder:'Your caring message..'
                },
                {
                    xtype: 'timepickerfield',
                    id:'timer',
                    picker:{
                    	zIndex: 10000
                    },
                    name: 'when',
                    value: new Date()       
                }               
            ]
        }]
    }
});
