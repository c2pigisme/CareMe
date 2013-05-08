Ext.define('CareMe.controller.UIController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            mainPanel:'mainpanel',
            mainView: 'mainview',
            loginPanel: 'loginpanel',
            registerPanel: 'registerpanel',
            contactlist: 'contactlist list',
            carelendar: 'calendarpanel',
            calendarAction: 'calendaraction',
            mapAction: 'mapaction',
        },

        control: {
            "mainview image[itemId='iCare']": {
                tap: 'onCareTap'
            },
            "mainview image[itemId='profile']": {
                tap: 'onProfileButtonTap'
            },
            "mainview image[itemId='carelendar']": {
                tap: 'onCarelendarButtonTap'
            },
            "mainview image[itemId='history']": {
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
            'contactlist list': {
                 itemtap: 'onContactListItemSelected',
                 disclose: 'onListItemDisclose'
            },
            'carelist list': {
                 itemtap: 'onCareListItemSelected'
            },
            'sharelist list': {
                 itemtap: 'onShareListItemSelected'
            },           
            "contactaction button[text='Care']": {
                tap: 'onActionCareTap'
            },
            "contactaction button[text='Share']": {
                tap: 'onActionShareTap'
            },
            "careaction button[text='Delete']": {
                tap: 'onActionCareDeleteTap'
            },
            "shareaction button[text='Delete']": {
                tap: 'onActionShareDeleteTap'
            },
           "shareaction button[text='Approve']": {
                tap: 'onActionShareApproveTap'
            },
            "calendarpanel button[itemId='treatment']":{
                tap: 'treatmentMinder'  
            },
            "calendarpanel button[itemId='med']":{
                tap: 'medMinder'
            },
            "reminderform textfield"  : {
                clearfield : 'onClearSearch',
                autocomplete: 'onSearchKeyUp'       
            },
            "calendaraction button[id='remindBtn']" : {
                tap: 'handleReminder'
            },
            "calendaraction container button[text='Cancel']" : {
                tap: 'handleReminderCancel'
            },
            "mapaction container button[text='Cancel']" : {
                tap: 'handleMapMinderCancel'
            },            
            "autocompletelist" : {
                itemtap: 'autocompleteItemTap'
            }            
        }
    },
    getDevicePhoneNumber : function() {
        return '100000001';
    },
    onCareTap: function(button, e, eOpts) {
        var _this = this;
        _this.getMainView().push({xtype: 'carepanel'});
    },

    onProfileButtonTap: function(button, e, eOpts) {
        var me = this,profile;

        profile = Ext.create('CareMe.view.ProfilePanel', {title: 'Profile'});
        me.getMainView().push(profile);

    },

    onCarelendarButtonTap: function(button, e, eOpts) {
        var me = this,calendar;
        Ext.eventStore = Ext.getStore('CarelendarStore');        
       // calendar = Ext.create('CareMe.view.CalendarPanel', {title: 'Calendar'});
        me.getMainView().push({xtype: 'calendarpanel'});

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
    //TODO : remove later
    // getSlideLeftTransition: function() {
    //     return { type: 'slide', direction: 'left' };

    // },
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
                    if(json.status) {
                        console.log('---- Login Ok ----');
                        _this.onLoginSucc(json, username);
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
                if(json.status) {
                    // var mainView = _this.getMainView();
                    // Ext.Viewport.animateActiveItem(mainView, _this.getTransitionEffect('slide', 'left'));  
                    // var store = Ext.create('Ext.data.Store', {
                    //     model: "CareMe.model.Session"
                    // });
                    // store.add({email: username});
                    // store.add({session: json.session});   
                    // console.log(store);
                    _this.onLoginSucc(json, username);
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
            sheet.setData(Ext.apply(store.getAt(idx), {'index':idx}));
           _this.getMainView().add(sheet);
        } else {
            sheet.setData(Ext.apply(store.getAt(idx), {'index':idx}));
            sheet.show();
        }
    },
    onCareListItemSelected: function(me, idx, record, e, eOpts) {
        var _this = this, 
            sheet = _this.getMainView().down('careaction'),
            store = Ext.getStore('CareStore');
        if (!sheet) {
            sheet = Ext.create('CareMe.view.CareAction');

            sheet.setData(Ext.apply(store.getAt(idx), {'index':idx}));
           _this.getMainView().add(sheet);
        } else {
            sheet.setData(Ext.apply(store.getAt(idx), {'index':idx}));
            sheet.show();
        }
    },
    onShareListItemSelected: function(me, idx, record, e, eOpts) {
        var _this = this, 
            sheet = _this.getMainView().down('shareaction'),
            store = Ext.getStore('ShareStore'), share = store.getAt(idx);;
        if (!sheet) {
            sheet = Ext.create('CareMe.view.ShareAction');
            sheet.setData(Ext.apply(share, {'index':idx}));
           _this.getMainView().add(sheet);
        } else {
            sheet.setData(Ext.apply(store.getAt(idx), {'index':idx}));
            sheet.show();
        }

        //hide approve button
        if(share.get('status')) {
            sheet.getAt(0).hide();
        }

    },
    onActionCareTap: function() {
        var _this = this, sheet = _this.getMainView().down('contactaction'),
            contact = sheet.getData(), model = contact.getData();

        //TODO: MOCKED UP
        model.sourcePhoneNumber = Ext.application.phoneNumber || _this.getDevicePhoneNumber();
        _this.getServerController().addCare(
            _this.getSessionTokenRequest({'json': Ext.encode(model)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                console.log(json);
                if(json.status) {
                    var carestore = Ext.getStore("CareStore");
                    carestore.add(model);
                    carestore.load();
                    console.log('add care to store');
                    Ext.Msg.alert('Care',json.message); 
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
            contact = sheet.getData(), model = contact.getData();
        //TODO : mockup     
        model.sourcePhoneNumber = Ext.application.phoneNumber || _this.getDevicePhoneNumber();
        console.log(Ext.encode(model));
        _this.getServerController().addShare(
            _this.getSessionTokenRequest({'json': Ext.encode(model)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status) {
                    var sharestore = Ext.getStore("ShareStore");
                    sharestore.add(model);
                    sharestore.load();
                    Ext.Msg.alert('Share',json.message); 
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
        var _this = this, sheet = _this.getMainView().down('careaction'),
            contact = sheet.getData(), model = contact.getData();
            model.sourcePhoneNumber = Ext.application.phoneNumber || _this.getDevicePhoneNumber();            
        _this.getServerController().delCare(
            _this.getSessionTokenRequest({'json': Ext.encode(model)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status) {
                    var carestore = Ext.getStore("CareStore");
                    carestore.removeAt(contact.index);
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
    onActionShareDeleteTap: function() {
        var _this = this, sheet = _this.getMainView().down('shareaction'),
            contact = sheet.getData(), model = contact.getData();
            model.sourcePhoneNumber = Ext.application.phoneNumber || _this.getDevicePhoneNumber();            
        _this.getServerController().delShare(
            _this.getSessionTokenRequest({'json': Ext.encode(model)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status) {
                    var sharestore = Ext.getStore("ShareStore");
                    sharestore.removeAt(contact.index);
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
    onActionShareApproveTap: function() {
       var _this = this, sheet = _this.getMainView().down('shareaction'),
            contact = sheet.getData(), model = contact.getData();
            model.sourcePhoneNumber = Ext.application.phoneNumber || _this.getDevicePhoneNumber();            
        _this.getServerController().approveShare(
            _this.getSessionTokenRequest({'json': Ext.encode(model)}),
            function(response) {
                var text = response.responseText;
                var json = JSON.parse(text);
                if(json.status) {
                    var sharestore = Ext.getStore("ShareStore");
                    sharestore.getAt(contact.index).setDirty();
                    sharestore.sync();
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
    onLoginSucc: function(json, username) {
        console.log('---- application ready ----');
        var mainPanel = this.getMainView();
        Ext.Viewport.animateActiveItem(mainPanel, this.getTransitionEffect('slide', 'left'));  
        var store = Ext.getStore("SessionStore");
        
        var s = new CareMe.model.Session({'email': username, 'session': json.session});
        store.clearData();
        store.add(s);
        store.sync();     
        this.prepareStore();
    },
    prepareStore: function() {
        var _this = this;
        console.log('--- restful care store loading ----' + Ext.application.phoneNumber);
        var carestore = Ext.getStore("CareStore");
        carestore.getProxy().setExtraParams(_this.getSessionTokenRequest({'phoneNumber':Ext.application.phoneNumber}));
        carestore.load();
        console.log('--- finnish restful care store ----' + Ext.application.phoneNumber);
        var sharestore = Ext.getStore("ShareStore");
        sharestore.getProxy().setExtraParams(_this.getSessionTokenRequest({'phoneNumber':Ext.application.phoneNumber}));
        sharestore.load();   
    },
    getSessionTokenRequest: function(req) {
        var store = Ext.getStore("SessionStore");
        store.load();

        //TODO: remove mock up
        var session = store.first();         
        console.log('---- restore session ----');
        console.log(session);
        var token = { 
            'email':session.get("email"),
            'session': session.get("session")  
        };     
        if(typeof req === 'undefined') {
            req = {};
        }
        return Ext.apply(token, req);
    },
    treatmentMinder: function() {
        console.log('---- treatment minder -----');
        var _this = this, 
            sheet = _this.getMapAction();
        Ext.Viewport.animateActiveItem(sheet, _this.getTransitionEffect('slide', 'up'));
    },
    medMinder: function() {
        var _this = this, 
            sheet = _this.getCalendarAction();
        Ext.Viewport.animateActiveItem(sheet, _this.getTransitionEffect('slide', 'up'));  
    },
    onClearSearch: function(field) {
        var autocomplete = Ext.Viewport.down('autocompletelist');
            autocomplete.setHidden(true);
            Ext.Viewport.remove(autocomplete);        
    },
    autocompleteItemTap: function(e) {
        var _this = this;
        new Ext.util.DelayedTask(function () {
            var value = e.getSelection()[0].data.name;
            var field = _this.getCalendarAction().down('searchfield[id="medicine"]');
            field.setValue(value);            
            e.setHidden(true);  
        }).delay(100);
    },
    onSearchKeyUp: function(field) {
        var meds = [];
        var autocomplete = Ext.Viewport.down('autocompletelist');
        if(!autocomplete){
            autocomplete = Ext.create('CareMe.view.AutocompleteList',{'hidden':true, 'hideOnMaskTap':true,'cls':'autocomplete'});
            autocomplete.setHidden(true);
            Ext.Viewport.add(autocomplete);
        }

        if(field.getValue() === "") {
            autocomplete.setHidden(true);
            Ext.Viewport.remove(autocomplete);
            return;
        }
        function querySuccess(tx, results) {
            meds = [];
            if(results.rows.length === 0) {
                autocomplete.setHidden(true);                
                Ext.Viewport.remove(autocomplete);
                return;
            }

            console.log("Returned rows = " + results.rows.length);
            var list = results.rows;
            for(i=0; i<list.length; i++) {
           
                 meds.push(list.item(i));
            }
            autocomplete.showBy(field/*, "tr-br?"*/);   
            autocomplete.setData(meds);
            autocomplete.refresh();
            autocomplete.setHidden(false);
            Ext.Viewport.add(autocomplete);
        }

        function queryDB(tx) {
         tx.executeSql('SELECT * FROM medtbl where name like ?', [field.getValue()+'%'], querySuccess, errorCB);
        }
        //var store = Ext.getStore('MedStore');
        //store.clearData();

        function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
        }

        var db = window.openDatabase("meddb", "1.0", "Med Database", 200000);
        db.transaction(queryDB, errorCB);
        var autocomplete = Ext.Viewport.down('autocompletelist');

        console.log(field.getValue());
        debug = field;

    },
    handleReminder: function(ctx) {
        var getTimerMS = function(oldDate, newDate) {
            console.log('new date ms : ' + newDate.getTime());
            console.log('old date ms : ' + oldDate.getTime());
            return newDate.getTime() - oldDate.getTime();
        };
        var _this = this;

        var fields = this.getCalendarAction().down('reminderform fieldset');
        var medicine = fields.down('searchfield[id="medicine"]'),
            dosage = fields.down('selectfield[id="dosage"]'),
            dosageUnit = fields.down('segmentedbutton[itemId="dosageUnit"]'),
            note = fields.down('textfield[id="note"]'),
            timer = fields.down('timepickerfield[id="timer"]'),
            remindType = fields.down('segmentedbutton[itemId="remindType"]'),
            selection = fields.down('selectfield[id="carelist"]');

        var sheet = _this.getMainView().down('calendaraction');
        var carelendar = this.getMainView().down('touchcalendarview');
        var selectedDate = carelendar.getValue();
        var day = selectedDate.getDate(),
            month = selectedDate.getMonth(),
            year = selectedDate.getFullYear(),
            hhmmapm = timer.getPicker().getValue(window);
            selectedDate.setHours(hhmmapm.getHours());
            selectedDate.setMinutes(hhmmapm.getMinutes());

        var store = Ext.getStore("EventStore");

        var event = {
            'note': note.getValue(),
            'medicine':medicine.getValue(),
            'dosage':dosage.getValue(),
            'unit':'ml',
            'eventms':selectedDate.getTime(),
            //TODO: how to fix UTC problem?
            'start':selectedDate.toJSON(),
            'end':selectedDate.toJSON(),
            'css':'red'
        };

        var succFn = function() {
            var text = response.responseText;
            var json = JSON.parse(text);
        }, failFn = function() {

        }
        debug = remindType;
        if(remindType.getActiveItem().getItemId() === "myself") {
            console.log('local based reminder ');
            var now = new Date();
            var toMs = getTimerMS(now, selectedDate);
            console.log(' selected Date --->' + selectedDate);
            console.log(' toms --->' + toMs);
            //start timer
            var timerId = setTimeout(function() {
                console.log('Execute notification function');
                //PERERSIST EVENT LIST (A TODO LIST)
                var todoStore = Ext.getStore('TodoStore');
                todoStore.add({
                    'title': medicine.getValue(),
                    'startAt': now.getTime(),
                    'completeAt': selectedDate.getTime(),
                    'isDone':false,
                    'id': now.getTime()
                });
            }, toMs);
            event.timerId = timerId;
            store.add(event);

            plugins.localNotification.add({
                'date' : selectedDate,
                'message' : "Take care yourself, remember to take your <h1>medicine</h1>",
                'ticker' : "You have reminder from CareMe",
                'repeatDaily' : false,
                id : now.getTime()
            });
            _this.getServerController().addReminder(_this.getSessionTokenRequest({'json': Ext.encode(event)}), succFn, failFn);

        } else {
            _this.getServerController().shareReminder(_this.getSessionTokenRequest({'json': Ext.encode(event)}), succFn, failFn);
        }
        medicine.setValue('');
        dosage.setValue('');
        note.setValue('');

        carelendar.refresh();
        Ext.Viewport.animateActiveItem(_this.getMainView(), _this.getTransitionEffect('slide', 'down'));  
    },
    handleReminderCancel: function(ctx) {
      var fields = this.getCalendarAction().down('reminderform fieldset');
      var medicine = fields.down('searchfield[id="medicine"]'),
          dosage = fields.down('textfield[id="dosage"]'),
          note = fields.down('textfield[id="note"]'),
          timer = fields.down('timepickerfield[id="timer"]');

        dosage.setValue('');
        medicine.setValue('');
        note.setValue('');
        Ext.Viewport.animateActiveItem(this.getMainView(), this.getTransitionEffect('slide', 'down'));          

    }, 
    handleMapMinderCancel: function(ctx) {
        var fields = this.getCalendarAction().down('mapform fieldset');
        Ext.Viewport.animateActiveItem(this.getMainView(), this.getTransitionEffect('slide', 'down'));          

    },     
    getServerController: function() {
        return this.getApplication().getController('ServerController');
    }

});