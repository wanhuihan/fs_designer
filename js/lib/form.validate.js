
var form = {

	validate: function(target, fun) {

		// this.formBox = document.getElementById(target);
		this.formBox = $("div[content="+target+"]")
		var inputs = $(this.formBox).find("input[required]");

		var arr = [];

		for (var i = 0; i < inputs.length; i++) {

			var format = $(inputs[i])[0].getAttribute('required');

			var type = $(inputs[i])[0].getAttribute('type');

			var currentInput = inputs[i];

			arr.push(this.check(currentInput, format, type));

		};

		$(this.formBox).on("input", "input", function() {
			// console.log(this);			
			form.check(this, $(this)[0].getAttribute('required'), $($(this)[0]).attr("type"))
		})

		var a = 0;

		for (var i = 0; i < arr.length; i++) {

			if (arr[i]) {

				a = 1;

			}  else {

				a = 0;

				break;
				
			}

		}

		if (a == 1) {

			if (fun) {

				fun();

			}

		} 

	},

	check: function(ele, required, type) {

		// input type is text
		if (type=="text") {

			if (required == '') {

				return this.valid($(ele).val(), ele, 'empty');

			} else {

				return this.valid($(ele).val(), ele, required);

			}	

		}
	},

	error: {

		empty: {

			text: '内容不能为空',
			exp: /^\s*$/,
		},

		email: {
			text: '您输入的邮箱地址不合法',
			exp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+$/,			
		},

		phone: {
			text: '请输入正确的手机号',
			exp: /^[1][345789][0-9]{9}$/,	
		},
		num: {
			text: '请输入数字',
			exp: /^(\d)+/,	
		},

	},

	// 
	valid: function(val, ele, type) {

		var obj = this.error[type];
		// console.log(obj);

		if (type == 'empty') {
		
			if (val === '') {

				return this.showError(ele, this.error['empty'].text);

			} else {

				return this.hideError(ele);

			}

		} else {

			// console.log(obj);
			if (obj.exp.test(val)) {

				return this.hideError(ele);

			}  else {

				return this.showError(ele, this.error[type].text);
			}

		}

	},

	showError: function(ele, text) {

		if (!$(ele).hasClass("test")) {

			$(ele).parent().append("<span>"+text+"</span>");

			$(ele).addClass("test")

		}

		return false;

	},


	hideError: function(ele) {

		if ($(ele).hasClass("test")) {

			$(ele).removeClass("test");
			$(ele).parent().find("span").remove();

		}

		return true;
	}

}
