/**
 * Created by Gaplo917 on 9/5/15.
 */
$(function () {
    var pattern = new RegExp("當前離線");
    viewThread.popUpUserInfo.userStatus().each(function () {
        var isOffline = pattern.test($(this).html()),
            status = isOffline ? "Offline" : "Online",
            btnClass = isOffline ? "label-danger" : "label-success";

        $(this).parents('.userinfopanel').siblings('.postinfo').append(
            '<span class="label ' + btnClass + '">' + status + '</span>'
        );
    })
});