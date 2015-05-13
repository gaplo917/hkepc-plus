/**
 * Created by Gaplo917 on 9/5/15.
 */
// Replace the traditional code block by rainbowJs
$(function () {
    hkepcWidget.blockCode().each(function () {
        var code = $(this),
            codeContent = [];

        code.find('li').each(function (index) {
            codeContent.push($(this).html().replace('<br>',''));
        });

        var codeContentStr = codeContent.join(""),
            guid = guidGenerator();

        code.attr('data-id',guid);
        code.attr('data-expand',0);
        code.html('<button style="background: inherit!important;" class="btn btn-info" id="'+ guid + '">Expand </button><pre><code data-language="generic">' + codeContentStr + '</code></pre>');

        $('#'+guid).click(function(){

            var btn = $(this);
            hkepcWidget.blockCode().each(function () {

                if($(this).attr('data-id') === guid && $(this).attr('data-expand') === "0"){

                    btn.html('Collapse');

                    // floating window
                    $(this).attr('data-expand',1);
                    $(this).addClass('floating');
                    $(this).find("pre").attr("style","height:"+($(window).height() *9 /10)+"px!important;");
                    $('html').css({
                        overflow:"hidden"
                    });
                }
                else if($(this).attr('data-id') === guid && $(this).attr('data-expand') === "1"){
                    btn.html('Expand');

                    // original size
                    $(this).attr('data-expand',0);
                    $(this).removeClass('floating');
                    $(this).find("pre").attr("style","height:inherit;");

                    $('html').css({
                        overflow:"auto"
                    });
                }
            });
        });
    });
});
