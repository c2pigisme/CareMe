
Ext.define('CareMe.view.MainPanel', {
    extend: 'Ext.Container',
    xtype: 'mainpanel',

    config: {
		layout: {
			pack: 'center',
			type: 'fit'
		},
    	items: [
        	{
				xtype: 'mainview',
				type:'fit'
            },
            {
            	xtype: 'toolbar',
            	docked: 'bottom',
            	heigth: '100px',
				items:[ {
                    xtype: 'button',
                    align: 'left',
                    iconCls: 'delete_black2',
                    iconMask: true,
                    text: ''
                }]
            }
    	]
    }
});