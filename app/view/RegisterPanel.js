Ext.define('CareMe.view.RegisterPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerpanel',

    config: {
        items: [
            {
                xtype: 'fieldset',
                margin: '0px 10px',
                title: 'Register',
                items: [           
                    {
                        xtype: 'textfield',
                        itemId: 'userNameTextField',
                        label: '',
                        name: 'userNameTextField',
                        placeHolder: 'Username'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordTextField',
                        label: '',
                        name: 'passwordTextField',
                        placeHolder: 'Password'
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        itemId: 'cancel',
                        margin: '10px 0px',
                        padding: '10px',
                        ui: 'action',
                        text: 'Go Back'
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        itemId: 'registerSubmit',
                        margin: '5px 0px',
                        padding: '10px',
                        ui: 'action',
                        text: 'Done!'
                    }
                ]
            }
        ]
    }

});