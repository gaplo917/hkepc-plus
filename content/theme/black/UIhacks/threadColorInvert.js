/**
 * Created by Gaplo917 on 3/5/15.
 */
$(function(){
    $('.datatable tr .subject a').each(function () {
        var inlineStyle = $(this).attr('style');
        if(inlineStyle !== undefined){
            var splited = inlineStyle.match(/#(?:[0-9a-f]{3}){1,2}$/i);
            if(splited == null) return;
            var color = splited[0],
                rgb = hexToRgb(color.trim()),
                rgbaArr = [];
            rgbaArr.push(Math.abs(255-rgb.r));
            rgbaArr.push(Math.abs(255-rgb.g));
            rgbaArr.push(Math.abs(255-rgb.b));
            rgbaArr.push(1);

            $(this).attr('style','color:rgba('+ rgbaArr.join(',')+')!important');
        }
    });
});