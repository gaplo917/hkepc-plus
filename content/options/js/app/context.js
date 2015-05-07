/**
 * Created by Gaplo917 on 7/5/15.
 */
define("context", function () {
    //You can name this function here,
    //which can help in debuggers but
    //has no impact on the module name.
    return {
        title: "HKEPC +",
        controls:{
            theme:{
                context:"/content/theme/theme.json",
                btnClass: "theme-control",
                description: "Theme (主題)",
                buttons: [
                    //Dynamically generate ref to clickControl-sample.json
                ]
            },
            font:{
                context:"/content/font/font.json",
                btnClass: "font-control",
                description: "Font (字型)",
                buttons: [
                    //Dynamically generate ref to clickControl-sample.json
                ]
            }
        }
    };
});