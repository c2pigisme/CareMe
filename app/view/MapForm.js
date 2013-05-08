Ext.define('CareMe.view.MapForm', {
    extend: 'Ext.Panel',
    requires: ['Ext.Map'], 
    xtype:'mapform',
    config: {
        zIndex:10000,
        layout: 'fit',
        fullscreen:true,
        items: [{
            xtype:'map'
        }]
    },
    // initialize: function() {
    //     this.callParent();

    //     var map = {
    //         xtype: 'map',
    //         //styleHtmlContent: true,
    //         mapOptions: {
    //             zoom: 11,
    //             zoomControl: true
    //         },
    //         plugins: [
    //             new Ext.plugin.google.Tracker({
    //                 trackSuspended: false,
    //                 allowHighAccuracy: true,
    //                 marker: new google.maps.Marker({
    //                     title: 'My Current Location',
    //                     icon: 'image/blue_MarkerA.png'
    //                 })
    //             })
    //            // ,new Ext.plugin.google.Traffic()  //Adds traffic
    //         ],
    //         listeners: [
    //             {
    //                 scope: this,
    //                maprender: this.onMapRender
    //             }
    //         ]
    //     };
    //     this.add([map]);
    // },
 onBackButtonTap: function () {
        this.fireEvent("backButton", this);
    },
    onMapRender: function (map, gmap, eOpts) {
        this.fireEvent("mapRender", map, gmap, eOpts);
    },
    onNearButtonTap: function () {
        this.fireEvent("nearButton", this);
    }        
});
