/**
 * Created by Gaplo917 on 14/5/15.
 */
$(function () {
   var rgb = $('.colplural').css('background-color'),
        matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/,
        match = matchColors.exec(rgb),
        diff = 10,
        rgb = {
        r:parseInt(match[1]) + diff,
        g:parseInt(match[2]) + diff,
        b:parseInt(match[3]) + diff
    };

    if(rgb.r > 255 || rgb.g > 255 || rgb.b > 255){
        rgb.r -= diff * 2;
        rgb.g -= diff * 2;
        rgb.b -= diff * 2;
    }

    var contrast = [rgb.r,rgb.g,rgb.b];

    $('.self').css('background-color','rgb('+contrast.join(',')+')');

});

function diffColor(color,diff){
    var addition = color + diff;
    return addition > 255 ? color - diff : addition;
}