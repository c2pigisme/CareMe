
Ext.define("CareMe.model.Med", {
	extend: "Ext.data.Model",
	config: {
		fields: [ 
		{
			name:'name',
			type:'number'
		},
		{
			name: 'advice',
			type: 'string'
		}]
	}
});
