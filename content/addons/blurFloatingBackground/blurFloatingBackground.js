/**
 * Created by Gaplo917 on 8/5/15.
 */
$(function () {

    var targetsToBlur = $('#outer_wrap > div').not('#append_parent');

    // Bind the button that will trigger float window
    $('#post_reply a, #newspecial a, .postact a').click(function () {

        targetsToBlur.each(function () {
            $(this).css({"-webkit-filter":"blur(2px)"});
        });

        // wait a moment for the dialog the generate
        setTimeout(function () {
            var epcFloatContainer = $('#append_parent');

            epcFloatContainer.find('.float_close, #postsubmit').click(function () {
                targetsToBlur.each(function () {
                    $(this).css({"-webkit-filter":"none"});
                });
            });
            epcFloatContainer.find('button').addClass('btn btn-info postbtn');
            epcFloatContainer.find('button').css({"margin-bottom":"20px"});

        },500);

    });

});


