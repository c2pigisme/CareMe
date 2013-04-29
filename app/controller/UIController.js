Ext.define('CareMe.controller.UIController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview',
            loginPanel: 'loginpanel',
            registerPanel: 'registerpanel',
            contactlist: 'contactlist list',
            carePanel: 'carepanel'
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
            },
            'contactlist': {
                 itemtap: 'onContactListItemSelected',
                 disclose: 'onListItemDisclose'
            },
            "contactaction button[text='Care']": {
                tap: 'onActionCareTap'
            },
            "contactaction button[text='Share']": {
                tap: 'onActionShareTap'
            },
            "careaction button[text='Delete']": {

            },
            "shareaction button[text='Delete']": {
            }
        }
    },
    getDevicePhoneNumber : function() {
        return '100000001';
    },
    onCareTap: function(button, e, eOpts) {
        var _this = this;
        _this.getMainView().push({xtype: 'carepanel'});
        console.log('--- restful care store loading ----');
        var carestore = Ext.getStore("CareStore");
        carestore.getProxy().setExtraParams(_this.getSessionTokenRequest({'phoneNumber':Ext.application.phoneNumber}));
        carestore.load();
        console.log('--- finnish restful care store ----');
        var sharestore = Ext.getStore("ShareStore");
        sharestore.getProxy().setExtraParams(_this.getSessionTokenRequest({'phoneNumber':Ext.application.phoneNumber}));
        sharestore.load();
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
        

        var task = Ext.create('Ext.util.DelayedTask', function () {
            label.setHtml('');
            _this.onSignIn(username, password);
            usernameField.setValue('');
            passwordField.setValue('');
        });
        task.delay(500);


    },

    onCancelButtonTap: function(button, e, eOpts) {
        var _this = this;
        var task = Ext.create('Ext.util.DelayedTask', function () {
            _this.onRegisterCancel();
        });
        task.delay(500);

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

        task.delay(500);

    },

    onRegisterButtonTap: function(button, e, eOpts) {
        var _this = this;
        var task = Ext.create('Ext.util.DelayedTask', function () {
            _this.onRegister();
        });
        task.delay(500);

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
            loginPanel = _this.getLoginPanel();
            mainView = _this.getMainView();
            loginPanel.setMasked(false);
            _this.getServerController().login(
                {'email':username,'password':password,'gcmId':Ext.application.gcmId||''},
                function(response) {
                    var text = response.responseText;
                    var json = JSON.parse(text);
                    if(json.status === "OK") {
                        console.log('---- Login Ok ----');
                        var mainView = _this.getMainView();
                        Ext.Viewport.animateActiveItem(mainView, _this.getTransitionEffect('slide', 'left'));  
                        var store = Ext.getStore("SessionStore");
                        var s = new CareMe.model.Session({'email': username, 'session': json.session});
                        debug = store;
                        store.clearData();
                        store.add(s);
                        store.sync();
                    } else {
                        var text = response.responseText;
                        var json = JSON.parse(text);
                        loginPanel.showSignInFailedMessage(json.message);
                        loginPanel.setMasked(false);            
                        console.log(json);        
                        //ERROR label
                        console.log('Error login');
                    }
                }, 
                function(response) {
                    Ext.Msg.alert('Error','Error while submitting the form');
                    var text = response.responseText;
                    var json = JSON.parse(text);
                    console.log(json);      
                });
        }

    },

    onRegisterSubmit: function(username, password) {
        var _this = this, registerPanel;

        registerPanel = _this.getRegisterPanel();

        console.log(' -- onRegisterSubmit() --');

        _this.getServerController().register(
            {'u.email':username, 'u.password':password, 'u.name':'Demo User','u.phoneNumber': Ext.application.phoneNumber, 'u.gcmId':Ext.application.gcmId||''},
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status === "OK") {
                    var mainView = _this.getMainView();
                    Ext.Viewport.animateActiveItem(mainView, _this.getTransitionEffect('slide', 'left'));  
                    var store = Ext.create('Ext.data.Store', {
                        model: "CareMe.model.Session"
                    });
                    store.add({email: username});
                    store.add({session: json.session});   
                    console.log(store);
                } else {
                    var text = response.responseText;
                    var json = JSON.parse(text);
                    console.log(json);        
                    //ERROR label
                    console.log('Error during registeration');
                }                
            },
            function(response) {
                Ext.Msg.alert('Error','Error while submitting the form');
                var text = response.responseText;
                var json = JSON.parse(text);
                console.log(json);                  
            }
        );
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
    },
    onListItemDisclose: function(list, record) {
    },
    onContactListItemSelected: function(me, idx, record, e, eOpts) {

        var _this = this, 
            sheet = _this.getMainView().down('contactaction'),
            store = Ext.getStore('ContactStore');
        
        if (!sheet) {
            sheet = Ext.create('CareMe.view.ContactAction');
            sheet.setData(store.getAt(idx));
           _this.getMainView().add(sheet);
        } else {
            sheet.setData(store.getAt(idx));
            sheet.show();
        }
    },
    onActionCareTap: function() {
        var _this = this, sheet = _this.getMainView().down('contactaction'),
            contact = sheet.getData(), json = contact.getData();

        //TODO: MOCKED UP       
        json.sourcePhoneNumber = Ext.application.ownPhoneNumber || _this.getDevicePhoneNumber();
        _this.getServerController().addCare(
            _this.getSessionTokenRequest({'json': Ext.encode(json)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status === "OK") {
                    var carestore = Ext.getStore("CareStore");
                    carestore.load();
                } else {
                    Ext.Msg.alert('Error',json.message); 
                }
            }, 
            function(response) {
                Ext.Msg.alert('Error','Error while submitting the form');
                var text = response.responseText;
                var json = JSON.parse(text);
                console.log(json);      
            }
        );
    },
    onActionShareTap: function() {
        var _this = this, sheet = _this.getMainView().down('contactaction'),
            contact = sheet.getData(), json = contact.getData();
        //TODO : mockup     
        json.sourcePhoneNumber = Ext.application.ownPhoneNumber || _this.getDevicePhoneNumber();
        console.log(Ext.encode(json));
        _this.getServerController().addShare(
            _this.getSessionTokenRequest({'json': Ext.encode(json)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status === "OK") {
                    var sharestore = Ext.getStore("ShareStore");
                    sharestore.load();
                } else {
                    Ext.Msg.alert('Error',json.message); 
                }
            }, 
            function(response) {
                Ext.Msg.alert('Error','Error while submitting the form');
                var text = response.responseText;
                var json = JSON.parse(text);
                console.log(json);      
            }
        );
    },
    onActionCareDeleteTap: function() {
        //TODO -   _this.getServerController().delCare();
    },
    onActionShareDeleteTap: function() {
        //TODO - _this.getServerController().delShare();
    },
    getSessionTokenRequest: function(req) {
        var store = Ext.getStore("SessionStore");
        store.load();
        var session = store.first();         
        var token = { 
            'email':session.get("email"),
            'session': session.get("session")  
        };
        if(typeof req === 'undefined') {
            req = {};
        }
        return Ext.apply(token, req);
    },

    getServerController: function() {
        return this.getApplication().getController('ServerController');
    }

});