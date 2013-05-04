Ext.define('CareMe.view.AutocompleteList', {
    extend: 'Ext.dataview.List',
    xtype: autocompletelist,
    config: {
     store : 'medicines',
     left: 0,
        top: 0,
        hideOnMaskTap: true,
        width: 300,
        height: "50%",
        cls: 'myClass',
     itemTpl:'<div><i>{name}</i></div>'
     
    } 
});
