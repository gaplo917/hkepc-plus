/**
 * Created by Gaplo917 on 2/5/15.
 */
var hkepcWidget;
var forumDisplay;
var viewThread;
var pm;
$(function(){

	var start = new Date().getTime();


	// SetUp the base model for later user, wrapped by function is eliminate init time
	hkepcWidget = {
		// Pagination Button
		pageButton: function () {
			return $('.pages a, .pageback a');
		},

		// 公告 http://www.hkepc.com/forum/
		announcement: function () {
			return $('#ann');
		},

		group: function () {
			return $('#mainIndex .group');
		},

		mainPortal: function () {
			return $('#mainPortal, #mainIndex, #mainPoll, #mainUpdates');
		},

		// Quick reply editor
		quickEditor: {
			topPanel: function () {
				return $('.editor_tb');
			},
			content: function () {
				return $('#f_post .txtarea');
			},
			postButton: function () {
				return $('#fastpostsubmit');
			}
		},

		// Main editor
		editor: {
			main: function () {
				return $('.editorcontent');
			},
			titleInput: function () {
				return $('.editorcontent input.txt');
			},
			contentInput: function () {
				return $('.editorcontent textarea');
			},
			redundant: function () {
				return $('.newediter');
			},
			showSourceCheckBox: function () {
				return $('a.plugeditor');
			}
		},
		countReadNumber: function () {
			return $('.nums em');
		},

		footer: function () {
			return $('#footer');
		},

		floatingPostEditor: {
			container: function () {
				return $('.m_c');
			},
			titleInput: function () {
				return $('.m_c .txt');
			},
			contentInput: function () {
				return $('.m_c .textarea');
			}
		},
		bigButton: function () {
			return $('.postbtn, .replybtn');
		},
		blockCode: function () {
			return $('.blockcode');
		}
	};


	forumDisplay = {
		contentHeader: function () {
			return $('.colplural, .colplural th, .colplural td, th.highlight, td.highlight');
		},

		// redundent pixel on ForumDisplay
		threadBorder: function () {
			return $('.threadtype');
		}
	};

	viewThread = {
		// 每個 Post 尾
		adcontent: function () {
			return $('.adcontent');
		},

		// 左邊 Panel
		leftPostAuthor: function () {
			return $('.mainbox td.postauthor');
		},

		// 回覆／發貼制 bg
		topPanel: function () {
			return $('.forumcontrol table td');
		},

		// 發表於 yyyy-m-dd hh:mm
		postTimeStamp: function () {
			return $('.posterinfo a, .posterinfo em');
		},

		//引用
		quote: function () {
			return $('.quote');
		},

		// Code Block
		blockQuote: function () {
			return $('.quote blockquote');
		},

		//相關文章
		relatedPost: function () {
			return $('.box h1');
		},

		//倒序看帖 / 樓層數目
		postInfo: function () {
			return $('.postinfo strong a ');
		},

		threadTitle: {
			container: function () {
				return $('#threadtitle');
			},
			text: function () {
				return $('.postmessage h1, .postmessage h2');
			}
		},

		postAction: {
			container: function () {
				return $('.postactions');
			}
		},

		postTimeStampPanel: function () {
			return $('.postcontent .postinfo .authorinfo');
		},

		// Threads subject
		threads: function () {
			return $('.datatable tr .subject a');
		},

		popUpUserInfo: {
			container: function () {
				return $('.popupmenu_popup.userinfopanel');
			},
			userStatus: function () {
				return $('.popupmenu_popup.userinfopanel .popuserinfo > p > em');
			}
		}


	};

	pm = {
		// PM 查看消息
		readBtns: function () {
			return $('.pm_list .more a');
		}
	};

	console.log(start - new Date().getTime());
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