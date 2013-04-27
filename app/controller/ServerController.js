Ext.define('CareMe.controller.ServerController', {
    extend: 'Ext.app.Controller',
    xtype: 'servercontroller',

    config: {
        refs: {
            main: 'mainApp'
        }, 
        control: {
            main: {
                register: 'registerGCM'
            }
        }
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
    },
    registerGCM: function(params) {
        console.log(params);
    }

});
