Ext.define('CareMe.view.LoginPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginpanel',

    config: {
        title: '',
        html: '',
        margin: '',
        ui: '',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'image',
                centered: false,
                docked: 'top',
                height: '100px',
                left: '',
                margin: '30px 25%',
                padding: '80px',
                style: 'background-repeat: no-repeat;background-size: auto 100%;background-position:center',
                ui: 'light',
                width: '100px',
                src: 'image/login-logo.jpg'
            },
            {
                xtype: 'fieldset',
                docked: 'top',
                margin: '20px',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        title: '',
                        itemId: 'userNameTextField',
                        label: '',
                        name: 'userNameTextField',
                        required: true,
                        placeHolder: 'Username'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordTextField',
                        label: '',
                        name: 'passwordTextField',
                        required: true,
                        placeHolder: 'Password'
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        id: '',
                        itemId: 'register',
                        margin: '5px 0px',
                        padding: '10px',
                        ui: 'action',
                        text: 'Register'
                    },
                    {
                        xtype: 'label',
                        docked: 'top',
                        hidden: true,
                        hideAnimation: 'fadeOut',
                        html: 'Login failed. Please enter the correct credentials.',
                        itemId: 'signInFailedLabel',
                        showAnimation: 'fadeIn',
                        style: 'color:#990000;margin:20px 0px;'
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        itemId: 'logInButton',
                        margin: '10px 0px',
                        padding: '10px',
                        ui: 'action',
                        text: 'Log In'
                    }
                ]
            },

        ]
    },

    showSignInFailedMessage: function(message) {
        console.log('-- showSignInFailedMessage --' + message);
        var label = this.down('#signInFailedLabel');
        console.log(' -- showSignInFailedMessage() : ' + label)
        label.setHtml(message);
        label.show();

    }

});