/**
 * Created by Gaplo917 on 9/5/15.
 */
// Replace the traditional code block by rainbowJs
$(function () {
    hkepcWidget.blockCode.each(function () {
        var code = $(this),
            codeContent = [];

        code.find('li').each(function (index) {
            codeContent.push($(this).html().replace('<br>',''));
        });

        var codeContentStr = codeContent.join(""),
            guid = guidGenerator();

        code.attr('data-id',guid);
        code.attr('data-expand',0);
        code.html('<button style="background: inherit!important;" class="btn btn-info" id="'+ guid + '">Floating </button><pre><code data-language="generic">' + codeContentStr + '</code></pre>');

        $('#'+guid).click(function(){

            hkepcWidget.blockCode.each(function () {

                if($(this).attr('data-id') === guid && $(this).attr('data-expand') === "0"){
                    // floating window
                    $(this).attr('data-expand',1);
                    $(this).addClass('floating');
                    $('html').css({
                        overflow:"hidden"
                    });
                }
                else if($(this).attr('data-id') === guid && $(this).attr('data-expand') === "1"){
                    // original size
                    $(this).attr('data-expand',0);
                    $(this).removeClass('floating');
                    $('html').css({
                        overflow:"auto"
                    });
                }
            });
        });
    });
});
