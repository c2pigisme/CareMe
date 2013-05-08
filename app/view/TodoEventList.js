Ext.define('CareMe.view.TodoEventList', {
    extend: 'Ext.Container',

    xtype: 'todolist',

    requires: ['CareMe.store.TodoStore'],
    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype:'list',
            store: 'TodoStore',
            iconMask: true,
            loadingText: "Loading...",
            itemTpl : new Ext.XTemplate('<b>{title}</b>')             
        }]
    }


});