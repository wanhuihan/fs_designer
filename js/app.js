
// var app = angular.module("designer", ['chieffancypants.loadingBar']);

var app = angular.module("designer", ["ui.router", 'angular-loading-bar']);

/*
 * 设计端cookie fs_designer_token
 *
*/
var g = {
	
	// host server
	host: 'http://192.168.0.224:8080',

	// cookie set
	setCookie: function(data) {

		var time = data.exp;
		var token = data.token;

		var now = new Date();

		now.setTime(now.getTime()+time);
		// console.log(exp);
		document.cookie = 'fs_designer_token =' + token + "; expires="+now.toGMTString();

	},

	// check the json data from back end
	checkData: function(data) {

		if (!data.success) {

			alert(data.msg);
			return false;

		} else {

			if (data.msg) {
				alert(data.msg);
			}
			return true;
		}
	}


}

