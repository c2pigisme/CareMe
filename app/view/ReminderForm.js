var mgData = [{text:"100", value:100},{text:"200", value:200},{text:"300", value:300},{text:"400", value:400},{text:"500", value:500},{text:"600", value:600},{text:"700", value:700},{text:"800", value:800},{text:"900", value:900},{text:"1000", value:1000},{text:"1100", value:1100},{text:"1200", value:1200},{text:"1300", value:1300},{text:"1400", value:1400},{text:"1500", value:1500},{text:"1600", value:1600},{text:"1700", value:1700},{text:"1800", value:1800},{text:"1900", value:1900},{text:"2000", value:2000}];
var mlData = [{text:"5",value:5},{text:"10",value:10},{text:"15",value:15},{text:"25",value:25},{text:"35",value:35},{text:"45",value:45},{text:"50",value:50},{text:"55",value:55},{text:"60",value:60},{text:"65",value:65},{text:"75",value:75},{text:"80",value:80},{text:"85",value:85},{text:"90",value:90},{text:"95",value:95},{text:"100",value:100}];
var pillData = [{text:"1", value:1},{text:"2", value:2},{text:"3", value:3},{text:"4", value:4},{text:"5", value:5},{text:"6", value:6},{text:"7", value:7},{text:"8", value:8},{text:"9", value:9},{text:"10", value:10},];
var tempStore = Ext.create('Ext.data.Store');
Ext.define('CareMe.view.ReminderForm', {
    extend: 'Ext.Panel',
    xtype:'reminderform',
    requires:['Ext.ux.field.TimePicker'],
    config: {
        items: [
        {
            xtype: 'fieldset',
            title: 'Care Reminder',
            instructions: '',
            items: [         
                {
                    xtype:'segmentedbutton',
                    itemId:'remindType',
                    layout: {
                        type: 'hbox',
                        pack: 'center',
                        alight:'stretch'
                    },
                    items:[
                        {
                            xtype:'button',
                            text:'To Myself',
                            itemId:'myself',
                            width:'50%',
                            cls:'care-remind-btn',
                            pressed:true,
                            handler:function() {
                                this.getParent().setPressedButtons([0]);
                                var list = this.up('fieldset').down('textfield[itemId="carelist"]');
                                if(!list.getHidden()) {
                                    list.setHidden(true);
                                }
                            
                            }                            
                        },
                        {
                            xtype:'button',
                            text:'To my friend and family',
                            itemId:'ff',
                            width:'50%',
                            cls:'care-remind-btn',
                            handler:function() {
                                this.getParent().setPressedButtons([1]);
                                tempStore.clearData();
                                Ext.getStore('CareStore').each(function(r) {
                                    console.log(r);
                                    //TODO: REMOVE ! LATER
                                    if(!r.status) {
                                        tempStore.add(r);
                                    }
                                });        
                                var list = this.up('fieldset').down('textfield[itemId="carelist"]');
                                if(list.getHidden()) {
                                    list.setHidden(false);
                                }
                            }
                        }                
                    ]
                },          
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
							delay: 300
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
	                    xtype: 'selectfield',
                        id:'dosage',
	                    name : 'dosage',
                        placeHolder: 'Medicine dosage',
	                    width:'50%',
                        options:mlData
                	},
                	{
	                	xtype:'segmentedbutton',
                        itemId:'dosageUnit',
	                	items:[{
	                		xtype:'button',
	                		text:'mL',
                            idx:0,
                            itemId:'ml',
                            pressed:true,
                            handler:function() {
                                this.getParent().setPressedButtons([0]);
                                this.up('fieldset').down('selectfield[id="dosage"]').setOptions(mlData);
                            }
	                	},{
	                		xtype:'button',
	                		text:'mG',
                            idx:1,
                            itemId:'mg',
                            handler:function() {
                                this.getParent().setPressedButtons([1]);
                                this.up('fieldset').down('selectfield[id="dosage"]').setOptions(mgData);
                            }
                        },{
	                		xtype:'button',
	                		text:'Pill',
                            idx:2,
                            itemId: 'pill',
                            handler:function() {
                                this.getParent().setPressedButtons([2]);
                                this.up('fieldset').down('selectfield[id="dosage"]').setOptions(pillData);
                            }                            
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
                },
                {
                    xtype: 'selectfield',
                    itemId:'carelist',
                    hidden: true,
                    store: tempStore,
                    displayField:'displayName',
                    valueField:'email',
                    placeHolder:'Care list'
                }                                    
            ]
        }]
    }
});
