
Ext.define("CareMe.model.TodoEvent", {
	extend: "Ext.data.Model",
	config: {
		fields: [ 
		{
			name:'id',
			type:'number'
		},
		{
			name: 'title',
			type: 'string'
		},
		{
			name: 'startAt',
			type: 'number'
		},
		{
			name: 'completeAt',
			type: 'number'
		},
		{
			name: 'isDone',
			type: 'boolean'
		}]
	}
});
