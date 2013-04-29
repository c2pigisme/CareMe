Ext.Loader.setConfig({

});

Ext.application({
    xtype: 'mainApp',
    models: [
        'Session', 'Contact', 'Care' , 'Share'
    ],
    stores: [
        'SessionStore', 'ContactStore', 'CareStore', 'ShareStore'
    ],
    views: [
        'MainView',
        'CarePanel',
        'CalendarPanel',
        'HistoryPanel',
        'LoginPanel',
        'RegisterPanel',
        'MyContainer',
        'ContactList',
        'CareList',
        'ShareList',
        'ContactAction',
        'CareAction',
        'ShareAction'
    ],
    controllers: [
        'UIController', 'ServerController'
    ],
    name: 'CareMe',
    url: 'http://192.168.0.103:9000',
    launch: function() {

        var _this = this;

        new Ext.util.DelayedTask(function () {
            Ext.Viewport.setMasked(false);
            Ext.Viewport.add([
                { xtype: 'loginpanel' },
                { xtype: 'mainview' },
                { xtype: 'registerpanel' },
                { xtype: 'carepanel' }
            ]);

        }).delay(500);

          if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                document.addEventListener("deviceready", _this.onDeviceReady(), false);
            } else {
                //MOCK UP
                Ext.application.gcmId = "APA91bGFoFpAUeDZ2JBvUbhDv47cjasP--mxmR_vZh94PspUZI73oeNBGJ2xzkLZ4mtAwaK3rVUvNdabgLtoUWZz3XBoENYxS_eM6P0JPcJTvM7dYqxXlmymGmoB52QUEVMhApUUjgFgM6YOwSAC_HpJseglC5ChQA";
                        ///TODO Remove later:
                Ext.application.phoneNumber = '100000001'; 
                setTimeout(function() {_this.onDeviceReady();}, 1000);
            }
        var store = Ext.getStore("SessionStore");
        store.load();
        var session = store.first();


        if(session) {
            debug = this.getController('ServerController');
            this.getController('ServerController').validateSession(
                {'email':session.get("email"), 'session': session.get("session"), 'gcmId':Ext.application.gcmId},
                function(succResp) {
                    var text = succResp.responseText;
                    var json = JSON.parse(text);
                    if(json.status === "OK") {
                        Ext.Viewport.add({
                            xclass: 'CareMe.view.MainView'
                        });
                    } else {
                        _this.showLogin();
                    }
                }, 
                function(failResp) {
                    Ext.Msg.alert('Error','Error while submitting the form');
                    var text = response.responseText;
                    var json = JSON.parse(text);
                    console.log(json);  
                }
            );
        } else {
            _this.showLogin();
        }
    },

    showLogin: function() {
        Ext.Viewport.add({
            xclass: 'CareMe.view.LoginPanel'
        });
    },

    onDeviceReady: function() {
        var _this = this;
        var store = Ext.getStore('ContactStore');
        function onSuccess(contacts) {
            store.add(contacts);
        };

        function onError(contactError) {
            console.log('onError!');
        };

        var options = new ContactFindOptions();
        options.multiple=true; 
        var fields = ["*"];
        navigator.contacts.find(fields, onSuccess, onError, options);



        var onSucc = function(e) {
           console.log('****** successfully register GCM!! *******');
        };
        var onFail = function(e) {
            console.log('****** unable register GCM!! *******');
        };
        window.gcmEvents = function(e) {
            var key = e.regid;
            Ext.application.gcmId = e.regid;
        }
        window.plugins.GCM.register("1038123017901", "gcmEvents", onSucc, onFail);        
    }

});
