/**
 * Created by Gaplo917 on 2/5/15.
 */

$(function(){

	// SetUp the base model for later user
	var hkepcWidget ={
		// Pagination Button
		pageButton : $('.pages a, .pageback a'),

		// 公告 http://www.hkepc.com/forum/
		announcement : $('#ann'),

		group : $('#mainIndex .group'),

		mainPortal : $('#mainPortal, #mainIndex, #mainPoll, #mainUpdates'),

		// Quick reply editor
		quickEditor:{
			topPanel: $('.editor_tb'),
			content: $('#f_post .txtarea'),
			postButton : $('#fastpostsubmit')
		},

		// Main editor
		editor:{
			main:$('.editorcontent'),
			titleInput: $('.editorcontent input.txt'),
			contentInput: $('.editorcontent textarea'),
			redundant: $('.newediter'),
			showSourceCheckBox: $('a.plugeditor')
		},
		countReadNumber: $('.nums em'),

		footer:$('#footer'),

		floatingPostEditor:{
			container: $('.m_c'),
			titleInput: $('.m_c .txt'),
			contentInput: $('.m_c .textarea')
		},
		bigButton : $('.postbtn, .replybtn'),
		blockCode : $('.blockcode')
	};


	var forumDisplay = {
		contentHeader: $('.colplural, .colplural th, .colplural td, th.highlight, td.highlight'),

		// redundent pixel on ForumDisplay
		threadBorder : $('.threadtype')
	};

	var viewThread = {
		// 每個 Post 尾
		adcontent : $('.adcontent'),

		// 左邊 Panel
		leftPostAuthor : $('.mainbox td.postauthor'),

		// 回覆／發貼制 bg
		topPanel : $('.forumcontrol table td'),

		// 發表於 yyyy-m-dd hh:mm
		postTimeStamp : $('.posterinfo a, .posterinfo em'),

		//引用
		quote : $('.quote'),

		// Code Block
		blockQuote : $('.quote blockquote'),

		//相關文章
		relatedPost: $('.box h1'),

		//倒序看帖 / 樓層數目
		postInfo : $('.postinfo strong a '),

		threadTitle : {
			container : $('#threadtitle'),
			text : $('.postmessage h1, .postmessage h2')
		},

		postAction :{
			container : $('.postactions')
		},

		postTimeStampPanel :$('.postcontent .postinfo .authorinfo'),

        // Threads subject
        threads : $('.datatable tr .subject a')


	};

    var pm = {
        // PM 查看消息
        readBtns : $('.pm_list .more a')
    };

	// Change the 發表於 XX 小時前 | 只看該作者 to the left panel
	viewThread.postTimeStampPanel.each(function () {
		var panel = $(this);
		panel.parents('.postcontent').siblings('.postauthor').append(panel);
		panel.css({
			'font-size':'10px',
			'padding':'5px',
			'text-align': 'center'
		});
		panel.find('img').remove();
	});

	// Change the button UI
	$('.pmreply button, .btnbar button').each(function () {
		$(this).addClass('btn btn-info postbtn');
	});

	// Change the button UI
	hkepcWidget.bigButton.addClass('btn btn-info');

	// Change the button UI
	hkepcWidget.quickEditor.postButton.addClass('btn btn-info');


	// Replace the traditional code block by rainbowJs
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



    pm.readBtns.each(function () {
       $(this).addClass('btn btn-xs btn-info postbtn');
        $(this).removeClass('to');

    });

});

function guidGenerator() {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}