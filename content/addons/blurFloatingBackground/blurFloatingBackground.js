/**
 * Created by Gaplo917 on 8/5/15.
 */
$(function () {

    //remove the original float container
    $('#append_parent').remove();

    // append it to under html
    $('html').append('<div id="append_parent"></div>');

    // Bind the button that will trigger float window
    $('#post_reply a, #newspecial a, .postact a').click(function () {

        $('body').css({"-webkit-filter":"blur(2px)"});

        // wait a moment for the dialog the generate
        setTimeout(function () {
            var epcFloatContainer = $('#append_parent');

            epcFloatContainer.find('.float_close, #postsubmit').click(function () {
                $('body').css({"-webkit-filter":"none"});
            });
            epcFloatContainer.find('button').addClass('btn btn-info postbtn');
            epcFloatContainer.find('button').css({"margin-bottom":"20px"});

        },500);

    });

});


