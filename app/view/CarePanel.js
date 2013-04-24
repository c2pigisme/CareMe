/*
 * File: app/view/CarePanel.js
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

Ext.define('CareMe.view.CarePanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.carePanel',

    requires: [
        'CareMe.view.ContactList',
        'CareMe.view.CareList',
        'CareMe.view.ShareList'
    ],

    config: {
        tabBar: {
            docked: 'top'
        },
        items: [
            {
                xtype: 'contactlist',
                title: 'Contacts'
            },
            {
                xtype: 'carelist',
                title: 'Care list'
            },
            {
                xtype: 'sharelist',
                title: 'Share list'
            }
        ]
    }

});