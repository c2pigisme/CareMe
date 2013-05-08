Ext.Loader.setConfig({
});
Ext.application({
    xtype: 'mainApp',
    models: [
        'Session', 'Contact', 'Care' , 'Share', 'CarelendarEvent', 'TodoEvent', 'Clinic'
    ],
    stores: [
        'SessionStore', 'ContactStore', 'CareStore', 'ShareStore', 'TodoStore', 'ClinicStore'
    ],
    views: [
        'MainPanel',
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
        'ShareAction',
        'CarelendarAction',
        'ReminderForm',
        'MapAction',
        'MapForm'
    ],
    controllers: [
        'UIController', 'ServerController'
    ],
    name: 'CareMe',
    url: 'http://careme.dyndns.org:9000',
    //url:'http://192.168.1.64:9000',
    launch: function() {    
        console.log('-------------------');    
        loadDB();
        var _this = this;

        new Ext.util.DelayedTask(function () {
            Ext.Viewport.setMasked(false);
            //TODO: can be removed
            Ext.Viewport.add([
                { xtype: 'loginpanel' },
                //{ xtype: 'mainpanel' },
                { xtype: 'mainview' },
                { xtype: 'registerpanel' },
                { xtype: 'carepanel' },
                { xtype: 'calendarpanel' },
                { xtype: 'reminderform' },
                { xtype: 'calendaraction' },
                { xtype: 'mapaction' },
                { xtype: 'mapform' }
            ]);

        }).delay(500);
        setTimeout(function() {
            console.log("------ post setup from setTimeout --------");

            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                document.addEventListener("deviceready", _this.onDeviceReady(), false);
            } else {
                    //TODO: REMOVE LATER MOCK UP FUNCTION TO GET URL
                    var qs = function () {
                      // This function is anonymous, is executed immediately and 
                      // the return value is assigned to QueryString!
                      var query_string = {};
                      var query = window.location.search.substring(1);
                      var vars = query.split("&");
                      for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                            // If first entry with this name
                        if (typeof query_string[pair[0]] === "undefined") {
                          query_string[pair[0]] = pair[1];
                            // If second entry with this name
                        } else if (typeof query_string[pair[0]] === "string") {
                          var arr = [ query_string[pair[0]], pair[1] ];
                          query_string[pair[0]] = arr;
                            // If third or later entry with this name
                        } else {
                          query_string[pair[0]].push(pair[1]);
                        }
                      } 
                        return query_string;
                    } ();
                    //TODO : MOCK UP
                    Ext.application.gcmId = qs.gcmId ||"APA91bGD1JE33WWznBnNWQt-gGqDquptX2J3yAWaGH21PYGgcNpLvZBYLkr0-h5LOpeC0htSMjrz471bh-j2hVq9zrQZ593IpAfv3G9gXQ7Em7ZUGWch2uNbhBydDlkr2Utz6uzhw8--kolgn5VB1XgLbaQh0fC6PA";
                    ///TODO Remove later:
                    Ext.application.phoneNumber = qs.phoneNumber||'100000001'; 
                    setTimeout(function() {_this.onDeviceReady();}, 1000);
            }
        }, 10);
        var store = Ext.getStore("SessionStore");
        var session;
        if(typeof store !== "undefined") {
            store.clearData();
            session = store.first();
        }

        //TODO remove later
        if(!session) {
            session = Ext.create('CareMe.model.Session',{'email':"kokboon@gmail.com", 'session':"bcb787a9-609f-4a0f-b66d-60058ad9547c"});
            store.add(session);
            store.sync(); 
            console.log('------------------------------------');   
            console.log(store.getAllCount());
        }

        if(session) {
            var serverCtx = this.getController('ServerController');
            var uiCtx = this.getController('UIController');
            serverCtx.validateSession(
                {'email':session.get('email'), 'session': session.get('session'), 'gcmId':Ext.application.gcmId},
                function(succResp) {
                    
                    var text = succResp.responseText;
                    var json = JSON.parse(text);
                    console.log(json);
                    if(json.status) {
                        Ext.Viewport.add({
                            xclass: 'CareMe.view.MainView'
                        });
                        uiCtx.prepareStore();
                    } else {
                        _this.showLogin();
                    }
                }, 
                function(failResp) {
                    Ext.Msg.alert('Error','Error while submitting the form');
                    var text = response.responseText;
                    var json = JSON.parse(text);
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
            _this.getController('ServerController').routeGCM(e);
        }
        window.plugins.GCM.register("1038123017901", "gcmEvents", onSucc, onFail);        
    }

});
