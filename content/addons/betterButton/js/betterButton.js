/**
 * Created by Gaplo917 on 9/5/15.
 */
$(function(){

    // Change the button UI
    $('.pmreply button, .btnbar button').each(function () {
        $(this).addClass('btn btn-info postbtn');
    });

    // Change the button UI
    hkepcWidget.bigButton.addClass('btn btn-info');

    // Change the button UI
    hkepcWidget.quickEditor.postButton.addClass('btn btn-info');

    pm.readBtns.each(function () {
        $(this).addClass('btn btn-xs btn-info postbtn');
        $(this).removeClass('to');

    });
});