
Ext.define('CareMe.view.MainView', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',
    alias: 'widget.mainview',
    config: {
        autoDestroy: false,
        zIndex: 10000,
        scrollable: 'vertical',
        items: [
            {
                xtype: 'container',
                title: 'Dashboard',
                items: [
                    {
                        xtype: 'container',
                        margin: '5% 0%',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'container',
                                height: '',
                                width: '50%',
                                
                                layout: {
                                    pack: 'center',
                                    align:'center',
                                    type: 'vbox'
                                },
                                items: [
                                    {
                                        //contact
                                        xtype: 'image',
                                        itemId:'iCare',
                                        height: 100,
                                        width: 100,
                                        iconMask: true,
                                        src:'image/profile80x80.png',
                                        margin: '30 30',
                                        cls:'main-icon'        
                                    },
                                    {
                                        //profile
                                        xtype: 'image',
                                        itemId:'profile',
                                        height: 100,
                                        width: 100,
                                        iconMask: true,
                                        src:'image/profile80x80.png',
                                        cls:'main-icon'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                width: '50%',
                                
                                layout: {
                                    pack: 'center',
                                    type: 'vbox',
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'image',
                                        itemId:'carelendar',
                                        height: 100,
                                        width: 100,
                                        iconMask: true,
                                        src:'image/profile80x80.png',
                                        margin: '30 30',
                                        cls:'main-icon'
                                    },
                                    {
                                        xtype: 'image',
                                        itemId:'history',
                                        height: 100,
                                        width: 100,
                                        iconMask: true,
                                        src:'image/profile80x80.png',
                                        cls:'main-icon'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        navigationBar: {
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'delete_black2',
                    iconMask: true,
                    text: ''
                }
            ]
        }
    }

});