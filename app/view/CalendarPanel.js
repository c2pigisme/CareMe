(function() {
var eventStore = Ext.create('Ext.data.Store', {
	storeId: 'EventStore',
    model: 'CareMe.model.CarelendarEvent',
    data: []
});

Ext.define('CareMe.view.CalendarPanel', {
    extend: 'Ext.Panel',
    xtype: 'calendarpanel',
    config: {
        layout: 'fit',	
    	items: [
    	{
    		xtype: 'touchcalendarview',
			viewMode: 'month',
            weekStart: 1,
            value: new Date(),
            eventStore: eventStore,
            plugins: [Ext.create('Ext.ux.TouchCalendarEvents', {
                eventHeight: 'auto',
                eventBarTpl: '<div>{medicine}</div>'
            })]
	    },
	  	{
	    	xtype: 'toolbar',
	    	docked:'bottom',
			layout: {
    			pack: 'center',
    			type: 'hbox'
			},

			items:[
			{
	    		xtype:'button',
	    		text: 'Med Minder',
	    		align:'middle',
	    		itemId:'med',
	    		handler:function(ctx) {    			
	    		}
	    	},
	    	{
	    		xtype:'button',
	    		text: 'Treatment Minder',
	    		itemId:'treatment',
	    		handler:function(ctx) {				
	    		}
	    	}]
	    }
	    ]
    }

});
})()