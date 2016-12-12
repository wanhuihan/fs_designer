
// var app = angular.module("designer", ['chieffancypants.loadingBar']);

var app = angular.module("designer", ["ui.router", 'angular-loading-bar']);

var g = {
	
	// host server
	host: 'http://192.168.0.224:8089',

	// cookie set
	setCookie: function(data) {

		var time = data.exp;
		var token = data.token;

		var now = new Date();

		var exp = now.setTime(now.getTime() + time);

		console.log(exp)
	},

	// check the json data from back end
	checkData: function(data) {

		if (!data.success) {

			alert(data.msg);
			return false;

		} else {

			alert(data.msg);
			return true;
		}
	}


}

