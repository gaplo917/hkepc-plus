/**
 * Created by Gaplo917 on 2/5/15.
 */
var hkepcWidget;
var forumDisplay;
var viewThread;
var pm;
$(function(){

	// SetUp the base model for later user
	hkepcWidget = {
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


	forumDisplay = {
		contentHeader: $('.colplural, .colplural th, .colplural td, th.highlight, td.highlight'),

		// redundent pixel on ForumDisplay
		threadBorder : $('.threadtype')
	};

	viewThread = {
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

    pm = {
        // PM 查看消息
        readBtns : $('.pm_list .more a')
    };


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