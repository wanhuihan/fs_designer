
// var app = angular.module("designer", ['chieffancypants.loadingBar']);

var app = angular.module("designer", ["ui.router", 'angular-loading-bar','ngDialog','ngCookies']);

/*
 * 设计端cookie fs_designer_token
 *
*/
var g = {
	
	// host server
	// host: 'http://192.168.0.87',
	// host: 'http://192.168.5.94:8080',
	host: 'http://192.168.0.224:8080',

	user: {
		name: '',
		role: '',
	},
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

		} else {

			if (data.msg) {
				// alert(data.msg);
			}
			return true;
		}
	},

	msg:  {
		server_error: '服务器连接错误，请稍后再试',
	}


}

