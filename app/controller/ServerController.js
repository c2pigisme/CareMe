Ext.define('CareMe.controller.ServerController', {
    extend: 'Ext.app.Controller',
    xtype: 'servercontroller',

    config: {
    },
    getURL: function(url) {
    	debug = this.getApplication(); 
        return this.getApplication().url +  url;
    },
    validateSession: function(params, onSuccess, onFailure) {
    	var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/session'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure
        });    	
    },
    login: function(params, onSuccess, onFailure) {
    	var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/login'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure
        });
    },
    register: function(params, onSuccess, onFailure) {
    	 Ext.Ajax.request({
            url: this.getURL('/register'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure
    	});
    },
    addCare: function(params, onSuccess, onFailure) {
    	var _this = this;
		Ext.Ajax.request({
            url: _this.getURL('/contact/care'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure  	
        });
    },
    delCare: function(params, onSuccess, onFailure) {
        var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/contact/care'),
            method: 'DELETE',
            params: params || {},
            success: onSuccess, 
            failure : onFailure     
        });        
    },
    addShare: function(params, onSuccess, onFailure) {
    	var _this = this;
		Ext.Ajax.request({
            url: _this.getURL('/contact/share'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure  	
        });

    },
    delShare: function(params, onSuccess, onFailure) {
        var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/contact/share'),
            method: 'DELETE',
            params: params || {},
            success: onSuccess, 
            failure : onFailure     
        });        
    },
   approveShare: function(params, onSuccess, onFailure) {
        var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/contact/share'),
            method: 'PUT',
            params: params || {},
            success: onSuccess, 
            failure : onFailure     
        });        
    },
    addReminder: function(params, onSuccess, onFailure) {
        var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/events'),
            method: 'POST',
            params: params || {},
            success: onSuccess, 
            failure : onFailure     
        });              
    },
    careReminder: function(params, onSuccess, onFailure) {
        var _this = this;
        Ext.Ajax.request({
            url: _this.getURL('/events'),
            method: 'PUT',
            params: params || {},
            success: onSuccess, 
            failure : onFailure     
        });              
    },
    routeGCM: function(e) {
        //UPDATE STORE
        //UPDATE CARELENDER
        //UPDATE ...
        console.log(e);
    }

});
