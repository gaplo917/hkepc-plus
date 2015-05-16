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

            // Invert the color and filter 1/3 of the brightness
            rgbaArr.push(
                parseInt(Math.abs(255 - rgb.r) / 3 * 2)
            );
            rgbaArr.push(
                parseInt(Math.abs(255 - rgb.g) / 3 * 2)
            );
            rgbaArr.push(
                parseInt(Math.abs(255 - rgb.b) / 3 * 2)
            );
            rgbaArr.push(1);

            $(this).attr('style','color:rgba('+ rgbaArr.join(',')+')!important');
        }
    });
});