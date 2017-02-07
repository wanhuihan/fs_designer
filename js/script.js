var g = {

	host: 'http://192.168.0.27',

	init: function() {

		g.getProjectInfo();
		g.step.init();
		g.img.upload();		

	},

	getProjectInfo : function() {
		$.ajax({

			type: 'post',

			dataType : 'json',

			url: g.host + '/decoration_app_api/inspectionLotImg/selectDecationTask?decorationTaskCode=116092400000045&token=327b45e1-cb97-44c3-bf6c-bc366be93bde',
			
			success: function(data) {
				//console.log(data.data.decorationTask.projectName);
				console.log(data);
				$(".projectName").val(data.data.decorationTask.projectName)
			},

            error: function(data) {

			// console.log(data)
			// alert(data.statusText);

           }
		})
	},

	img: {

		// 限制 图片上传张数
		limit: 3, 

		// 图片上传表单动作，和删除图片方法
		upload: function() {
			// 监听图片上传动作
			$(".file").change(function(e) {

				// 点击上传图片按钮的父级元素 fieldset
				var currentParent = $(e.target).parent('.uploadImg');

				// 当前已经上传的图片父级元素 span
				var currentSiblings = $($(e.target).parent().parent()).children(".imgItem");

				// 当前上传按钮的父级元素 span
				var currentField = $(e.target).parent('a');

				// 当前已经上传图片数组
				var imgArr = this.files;
				
				// 如果判断当前已经上传和正在上传的个数是否大于限制
				if (currentSiblings.length + imgArr.length > g.img.limit) {

					alert('最多只能上传3张');
					return false;
				}
				
				// 通过H5方法将Img预览放在页面列表当中 
				for (var i = 0; i < imgArr.length; i++) {

					var reader = new FileReader(); 

					reader.readAsDataURL(this.files[i]);
					
					reader.onload = function() {

						var imgHtml = '<span class="imgItem"><img src='+this.result+' /><b></<b></span>';
						$(imgHtml).insertBefore(currentField)
					}								
				}
			});

			// 监听图片删除点击
			$(".imageGroup").on("touchstart", ".imgItem", function(e) {
				// console.log($(e.target)[0].parentElement)
				// alert(123)
				$(e.target).parents(".imgItem").remove()
				return false;
			})		

		},
		
	},

	step: {

		data: {},

		init: function() {
			$(".nextStep").on("touchstart", function(e) {

				// 当前步骤值
				var next = e.target.attributes.step.value;

				// 下一步骤值
				next++;

				// 所有已经上传的图片集合数组 
				var imgUploadSection = $(e.target.parentNode).find(".uploadImg");

				// 循环判断是否都已经上传好图片，至少上传一个

				// for (var i = 0; i < imgUploadSection.length; i++) {

				// 	if ($(imgUploadSection[i]).children().length <= 1) {

				// 		console.log($(imgUploadSection[i]).children().length)	
				// 		alert("请上传图片或者拍照");
				// 		// alert( $(imgUploadSection[i]).children(".imageItem").length)
				// 		return false;
				// 	} 
				// }

				// 判断 必填项是否为空
				var requiredInput = $($(e.target).parent("fieldset")).find("input[required='true']");

				for (var i = 0; i < requiredInput.length; i++) {
					if ($(requiredInput[i]).val() === "") {
						alert('请填写剩余表单');
						return false;
					} 
				}

				// 隐藏当前步骤Fieldset 
				$(e.target.parentNode).hide();

				$("fieldset").hide().removeClass("active")

				// 下一步骤的Fieldset显示
				$("fieldset.step"+next).show().addClass("active");	

				// 头部当前位置标注，添加active 和viewed属性，先remove所有头部active属性
				$(".step_head").find("li").removeClass("active")
				$($(".step_head").find("#step"+next)).addClass("active viewed");


				// 生成表单
				if ($(e.target).hasClass("createTable")) {

					g.step.createTable(e);

					$("#tableSample iframe").attr("src","talbe_ceilingWorks.html")
					// 
					// console.log($("#tableSample").height($("#tableSample table").height()));
				}


			})

			// 误差input回删检测, 如果点击回删键，则跳到上一Input, 删除当前值
			document.onkeydown = function(e) {
				if (e.keyCode == 8) {
					// console.log($(e.srcElement)[0].value)
					if ($(e.srcElement)[0].value) {
					} else {
						if ($(e.srcElement)[0].previousElementSibling != null) {
							$(e.srcElement)[0].previousElementSibling.focus();
						}			
					}
				}
			}


			// 误差值如果输入，光标自动focus到下一个位置
			$(".deviation").on("input", "input", function(e) {
				// console.log(e.target.value)
				if (e.target.value) {
					$(this).next('input').focus();
				}	
			})

			// 点击头部位置，会根据viewed class名称返回相应的步骤，未激活步骤
			$(".step_head").on("touchstart", ".viewed", function(e) {
				$("fieldset").hide();
				$("fieldset."+e.currentTarget.id).show().addClass("active")
			})
			
		},	

		createTable: function(e) {

			var data = g.step.collectData(e);
			// console.log(data);
		},

		collectData: function(e) {
			// console.log(123)
			// return;
			var data = {};

			var formField = $(e.target).parents(".form").find(".form_group .content");
			// console.log(formField);			        
	        var devStr = '';
	        // console.log(formField)
			for (var i = 0; i < formField.length; i++) {

				var deviation = $(formField[i]).find('.deviation').find("input"); 

	            var inputTxt = $(formField[i]).find('input[type="text"]');

	            var imgUpload = $(formField[i]).find("imgItem"); 
	      
	            if (deviation.length !=0 ) {
	            	// var devData = new Array();
	            	var devData = '';
					for(var d = 0; d < deviation.length; d++) {
						// console.log($(deviation[d]).val());
						// devData.push($(deviation[d]).val());
						devData += $(deviation[d]).val() + ',';
					}

					data[formField[i].id] = devData;
	            }

	           if (inputTxt.length != 0 ) { 

	           		// console.log(inputTxt.val())
	                data[formField[i].id] = inputTxt.val();
	                // console.log(data[formField[i].id] + '_INPUTTXT')
	            }
			}
			// console.log(data)
			g.step.data = data;
			return data;
		}	
	},

}