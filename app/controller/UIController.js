/*
 * File: app/controller/UIController.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CareMe.controller.UIController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview',
            loginPanel: 'loginpanel',
            registerPanel: 'registerpanel'
        },

        control: {
            "mainview button[text='iCare']": {
                tap: 'onCareTap'
            },
            "mainview button[text='Profile']": {
                tap: 'onProfileButtonTap'
            },
            "mainview button[text='Carelendar']": {
                tap: 'onCarelendarButtonTap'
            },
            "mainview button[text='History']": {
                tap: 'onHistoryButtonTap'
            },
            "loginpanel button[itemId='logInButton']": {
                tap: 'onLogInButtonTap'
            },
            "registerpanel button[itemId='cancel']": {
                tap: 'onCancelButtonTap'
            },
            "registerpanel button[itemId='registerSubmit']": {
                tap: 'onRegisterSubmitButtonTap'
            },
            "loginpanel button[itemId='register']": {
                tap: 'onRegisterButtonTap'
            }
        }
    },

    onCareTap: function(button, e, eOpts) {
        var me = this,care;

        care = Ext.create('CareMe.view.CarePanel', {title: 'iCare'});
        console.log(me);
        me.getMainView().push(care);

    },

    onProfileButtonTap: function(button, e, eOpts) {
        var me = this,profile;

        profile = Ext.create('CareMe.view.ProfilePanel', {title: 'Profile'});
        me.getMainView().push(profile);

    },

    onCarelendarButtonTap: function(button, e, eOpts) {
        var me = this,calendar;

        calendar = Ext.create('CareMe.view.CalendarPanel', {title: 'Calendar'});
        me.getMainView().push(calendar);

    },

    onHistoryButtonTap: function(button, e, eOpts) {
        var me = this,history;

        history = Ext.create('CareMe.view.HistoryPanel', {title: 'History'});
        me.getMainView().push(history);

    },

    onLogInButtonTap: function(button, e, eOpts) {

        var _this = this, loginPanel, mainView, 
        usernameField, passwordField, 
        username, password, label;

        loginPanel = _this.getLoginPanel();
        mainView = _this.getMainView();

        usernameField = loginPanel.down('#userNameTextField');
        passwordField = loginPanel.down('#passwordTextField');
        label = loginPanel.down('#signInFailedLabel');

        username = usernameField.getValue();
        password = passwordField.getValue();
        label.hide();

        console.log('=====' + loginPanel);
        console.log('=====' + mainView);
        console.log('username : ' + username);
        console.log('password: ' + password);

        var task = Ext.create('Ext.util.DelayedTask', function () {
            label.setHtml('');
            _this.onSignIn(username, password);
            usernameField.setValue('');
            passwordField.setValue('');
        });
        task.delay(300);


    },

    onCancelButtonTap: function(button, e, eOpts) {
        var _this = this;
        var task = Ext.create('Ext.util.DelayedTask', function () {
            _this.onRegisterCancel();
        });
        task.delay(300);

    },

    onRegisterSubmitButtonTap: function(button, e, eOpts) {
        var _this = this, usernameField, passwordField,
            username, password;

        regPanel = _this.getRegisterPanel();
        mainView = _this.getMainView();

        usernameField = regPanel.down('#userNameTextField');
        passwordField = regPanel.down('#passwordTextField');

        username = usernameField.getValue();
        password = passwordField.getValue();

        var task = Ext.create('Ext.util.DelayedTask', function () {
            _this.onRegisterSubmit(username, password);
        });

        task.delay(300);

    },

    onRegisterButtonTap: function(button, e, eOpts) {
        var _this = this;
        var task = Ext.create('Ext.util.DelayedTask', function () {
            _this.onRegister();
        });
        task.delay(300);

    },

    getSlideLeftTransition: function() {
        return { type: 'slide', direction: 'left' };

    },

    getTransitionEffect: function(type, direction) {
        return { 'type': type, 'direction':  direction };
    },

    loginFailure: function() {
        var loginPanel, _this = this;
        loginPanel.showSignInFailedMessage(message);
        loginPanel.setMasked(false);

    },

    loginSuccess: function() {

    },

    onSignIn: function(username, password) {
        var _this = this,
            loginPanel = _this.getLoginPanel();

        console.log('-- onSignIn() --');

        if (username.length === 0 || password.length === 0) {
            console.log(' onSignIn() - login failure!');
            loginPanel.showSignInFailedMessage('Please enter your username and password.');
            loginPanel.setMasked(false);
            return;

        } else {

            console.log('onSignIn() - Signed in.');
            loginPanel = _this.getLoginPanel();
            mainView = _this.getMainView();
            loginPanel.setMasked(false);
            Ext.Viewport.animateActiveItem(mainView, _this.getTransitionEffect('slide', 'left'));
        }

    },

    onRegisterSubmit: function(username, password) {
        var _this = this, registerPanel;

        registerPanel = _this.getRegisterPanel();

        console.log(' -- onRegisterSubmit() --');
        /*
        TODO:
        1. ajax submit
        2. verify result
        - fail response then display error label
        - simple verification
        3. display main view

        */
        //Ext.Viewport.animateActiveItem(registerPanel, _this.getTransitionEffect('slide', 'down'));
    },

    onRegister: function() {
        var _this = this, registerPanel;

        registerPanel = _this.getRegisterPanel();

        console.log(' -- onRegister() --');


        Ext.Viewport.animateActiveItem(registerPanel, _this.getTransitionEffect('slide', 'down'));
    },

    onRegisterCancel: function() {
        var _this = this, loginPanel;

        loginPanel = _this.getLoginPanel();

        console.log(' -- onRegisterCancel() --');

        Ext.Viewport.animateActiveItem(loginPanel, _this.getTransitionEffect('slide', 'up'));
    }

});