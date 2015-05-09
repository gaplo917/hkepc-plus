/**
 * Created by Gaplo917 on 9/5/15.
 */
$(function () {

    // Change the 發表於 XX 小時前 | 只看該作者 to the left panel
    viewThread.postTimeStampPanel.each(function () {
        var panel = $(this);
        panel.parents('.postcontent').siblings('.postauthor').append(panel);
        panel.css({
            'font-size':'10px',
            'padding':'5px',
            'text-align': 'center'
        });
        panel.find('img').remove();
    });
});