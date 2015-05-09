/**
 * Created by Gaplo917 on 9/5/15.
 */
$(function () {
   $('.folder img').each(function () {
       var pattern = new RegExp("new_v2.png");

       if(pattern.test($(this).attr('src'))){
           $(this).parent().append('<span class="label label-success">New</span>');
           $(this).remove();
       }
       else{
           $(this).parent().append('<span class="label label-default">Read</span>');
           $(this).remove();
       }
   })
});