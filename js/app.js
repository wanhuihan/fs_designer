
// var app = angular.module("designer", ['chieffancypants.loadingBar']);

var app = angular.module("designer", ["ui.router", 'angular-loading-bar','ngDialog','ngCookies']);

/*
 * 设计端cookie fs_designer_token
 *
*/

// angular.module('designer', ['angular-loading-bar'])
//   .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//     cfpLoadingBarProvider.includeBar = false;
//   }])

  
var g = {
	
	// host server
	host: 'http://192.168.0.6:8080',
	// host: 'http://192.168.0.224:8089',

	// user: {
	// 	name: '',
	// 	role: '',
	// },
	// cookie set
	setCookie: function(data) {

		var time = data.exp;	
		var token = data.token;

		var now = new Date();

		now.setTime(now.getTime()+time);
		// console.log(exp);
		console.log(now.toGMTString());

		document.cookie = 'fs_designer_token =' + token + "; expires="+now.toGMTString();

	},

	chkCookie: function() {
		// alert(document.cookie.indexOf('fs_designer_token'));
		// return false;
		if (document.cookie.indexOf('fs_designer_token') >= 0 ) {
			// window.location.href = "/#/dashboard";
			return true;
		} else {
			// window.location.href = '';
			return false;
		} 
	},

	getCookie: function() {

		console.log(document.cookie);
	},

	// get the date text
	a: function(e) {
		console.log(e)
	},

	// check the json data from back end
	checkData: function(data) {

		if (!data.success) {
			alert(data.msg);
			return false;
		}

		if (data.success)  {
			return true;
		}

		if (data.code != 0) {
			alert(g.msg.server_error)
			return false;
		}
		if (data.code == 0) {
			return true;
		}
	},

	msg:  {
		server_error: '服务器连接错误，请稍后再试',
	},

	// limit upload files size
	fileUploadByteChk: function(target) {

		var input = jQuery(target).find("input[type='file']");

		$("body").on("change", jQuery(target).find("input[type='file']"), function(e) {

			// console.log(e.target.files[0].size);
			var byteLimit = 1024*1024*20;

			console.log(e.target.files[0]);

			// return false;
			// if (e.target.files[0]["size"]) {

				if (e.target.files[0].size == 0) {

					alert("您上传的文件大小不能为空文件！");

					e.target.value = "";

					return false;

				} else if(e.target.files[0].size > byteLimit){
					
					alert("您上传的文件大小不能大于20M！");

					e.target.value = "";

					return false;
					
				} else {

					return true;
				}
			// }


		})

	}

}



