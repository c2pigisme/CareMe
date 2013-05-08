//     SAMPLE DATA
// 	   {
//         event: '8.03 - 8:05',
//         title: 'Event Name 1',
//         start: new Date(year, month, day, 8, 3),
//         end: new Date(year, month, day, 8, 3),
// 	    css: 'red'
//     }
Ext.define("CareMe.model.CarelendarEvent", {
	extend: "Ext.data.Model",
	config: {
		fields: [ 
		{
			name: 'note',
			type: 'string'
		},
		{
			name: 'medicine',
			type: 'string'
		},
		{
			name: 'dosage',
			type: 'string'
		},
		{
			name: 'unit',
			type: 'string'
		},		 		
		{
			name: 'eventms',
			type: 'number'
		},		
		{
			name: 'start',
			type: 'date',
		}, 
		{
			name: 'end',
			type: 'date',
		}, 
		{
			name: 'css',
			type: 'string'
		},
		{
			name: 'timerId',
			type: 'number'
		}]
	}
});
