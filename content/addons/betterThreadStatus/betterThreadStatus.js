/**
 * Created by Gaplo917 on 9/5/15.
 */
$(function () {
    $('.folder img').each(function () {
        var newImgPattern = new RegExp("new_v2.png");
        var oldImgPattern = new RegExp("common_v2.png");
        var lockImgPattern = new RegExp("lock.png")

        if(newImgPattern.test($(this).attr('src'))){
            $(this).parent().append('<span class="label label-success">New</span>');
            $(this).remove();
        }
        else if(oldImgPattern.test($(this).attr('src'))){
            $(this).parent().append('<span class="label label-default">Read</span>');
            $(this).remove();
        }
        else if(lockImgPattern.test($(this).attr('src'))){
            $(this).parent().append('<span class="label label-danger">Locked</span>');
            $(this).remove();
        }
    })
});