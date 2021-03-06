/**
 * Created by Gaplo917 on 7/5/15.
 */
define("EpcModel", function () {

    return EpcModel = {
        title: "Will Get Fom mainifest",
        version:"Will Get Fom mainifest",
        author: "Gap Lo",
        authorSite: "http://blog.gaplotech.com",
        controls:{
            theme:{
                context:"/content/theme/theme.json",
                btnClass: "theme-control",
                description: "Theme (主題)",
                buttons: [
                    //Dynamically generate ref to clickControl-sample.json according to theme.json
                ]
            },
            font:{
                context:"/content/font/font.json",
                btnClass: "font-control",
                description: "Font (字型)",
                buttons: [
                    //according to font.json
                ]
            }
        },
        switchs:{
            addons:{
                context:"/content/addons/addons.json",
                btnClass: "addons-control",
                description: "Addons (附加模組)",
                buttons: [
                    //Dynamically generate ref to clickControl-sample.json according to theme.json
                ]
            }
        }
    };
});