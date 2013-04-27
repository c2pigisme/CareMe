Ext.define('CareMe.model.Care', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'phone', type:'string'},
            {name: 'status', type:'string'}
         ]
    }
});
