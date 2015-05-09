/**
 * Created by Gaplo917 on 7/5/15.
 */
requirejs.config({
    baseUrl: 'js',
    shim : {
        bootstrap : { "deps" :['jquery'] }
    },
    paths: {
        jquery: '../../../plugins/jquery/jquery-2.1.3',
        bootstrap: '../../plugins/bootstrap/js/bootstrap.js',
        q: '../../../plugins/q/q',
        handleBars:'../../../plugins/handlebar/handlebars-v3.0.3',
        underscore:'../../../plugins/underscore/underscore',
        utils:'./app/utils',
        EpcController:'./app/EpcController',
        EpcModel:'./app/EpcModel',
        ClickControl:'./app/widgets/ClickControl',
        SwitchPanel: './app/widgets/SwitchPanel'

    }
});