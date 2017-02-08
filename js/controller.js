'use strict';


app.controller("header", function($scope, $http, $location, $cookies, $cookieStore) {

	$scope.user = {
		name: window.localStorage.fs_design_realName,
		role: window.localStorage.fs_design_roleName
	}

	$scope.logOut=  function() {

		$http({

			method: 'post',
			url: g.host+'/decoration_designer/login/logout',
			data: {
				token: $cookies.fs_designer_token
			},

	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        },			
		}).success(function(data) {
			
			// console.log(data);
			$cookieStore.remove('fs_designer_token');
			$location.path("/login");
		})

	}
})

app.controller("orders", function($http, $scope, $location, $cookies, $window) {

	// console.log($cookies.fs_designer_token);
	if (!g.chkCookie()) {
		$location.path("/login");
	} else {

		$scope.data  = '';

		$http({
			url: g.host+'/decoration_designer/decorationTask/order/selectList',
			method: 'post',
			data: {
				token: $cookies.fs_designer_token
			},
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        },		
		}).success(function(data) {
			$scope.data = data.datas;
			$scope.roleCode = window.localStorage.fs_design_role_code;
		})
	}

})

/*-------------------
	#login page
---------------------*/
app.controller("login", function($http, $scope, $location, $cookies, ngDialog, $window) {

	if (!g.chkCookie()) {
		// console.log(123)
		$scope.data = {
			user: '',
			pwd: '',
			role: '11',
		}

		$scope.sub = function() {
			// alert()
			// return false;
			if ($scope.data.role == '') {
				alert('请选择您的角色');
				return false;
			}
			// console.log(g.host)
			$http({

				method: 'post',
				url: g.host+'/decoration_designer/login/login',

				data: {
					userName: $scope.data.user,
					pwd: $scope.data.pwd,
					roleCode: $scope.data.role
				},
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	            // 处理接口的问题，传给后端的参数有问题，需要重新解析成json字符串
	            transformRequest: function(obj) {    
	                var str = [];    
	                for (var p in obj) {    
	                    
	                    if (typeof obj[p] == 'object' ) {
	                        // console.log(p, JSON.stringify(obj[p]));
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                    } else {
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                    }
	                      
	                }    
	                // console.log(str)
	                return str.join("&");    
	            }, 	

			}).success(function(data,d) {
				// alert(123)
				// console.log(data)
				if (g.checkData(data)) {

					g.setCookie(data);
					// return false;
					// g.user.name = data.realName;
					window.localStorage.fs_design_realName = data.realName;
					window.localStorage.fs_design_roleName = data.roleName;
					window.localStorage.fs_design_role_code = data.realCode;
					$scope.headerShow = true;
					// window.location.href = '#/dashboard/orders';
					$location.path("/dashboard");
					// $location.path("http://www.baidu.com");
				}

			}).error(function(data) {
				alert(g.msg.server_error);
			})
		}

		$scope.forgetPwd = function() {
			alert('the module not start to develop, please contact the webmaster');
			// return false;
		}

		$scope.register = {

			formData: {

			},

			popup: function() {
				ngDialog.open({
					templateUrl: 'templates/register.html',
					className: 'registerBox ngdialog ngdialog-theme-default',
					width: 600
				})
			},

			sub: function() {

			}
		}
	} else {
		$location.path("/dashboard");
	}	


})

/* --------------
	# dashboard
-----------------*/

app.controller("dashboard", function($scope, $http, $location, $cookies, $window) {

	// alert($cookies.fs_designer_token)
	$scope.leftSideBar = false;


	// console.log($cookies.fs_designer_token);
	if (!g.chkCookie()) {
		$location.path("/login");
	} else {
		$window.location.href = '#/dashboard/orders';
		$window.location.reload();
	}

})

/* ----------------
	# order details page
------------------*/

app.controller("orderDetails", function($http, $scope, $location, $cookies) {

	if (!g.chkCookie()) {
		$location.path("/login");

	}  else {

		// console.log($location.search());
		$scope.orderId = $location.search().id;
		$scope.orderCode = $location.search().code;
		$scope.roleCode = window.localStorage.fs_design_role_code;
		$http({
			url: g.host+'/decoration_designer/decorationTask/order/view',
			method: 'post',
			data: {
				decorationTaskId: $scope.orderId,
				decorationTaskCode: $scope.orderCode,
				token: $cookies.fs_designer_token
			},

	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        },		
		}).success(function(data) {
			$scope.data = data.datas;
			console.log(window.localStorage.fs_design_role_code)
			$scope.roleCode = window.localStorage.fs_design_role_code;

		})
	}
})

/*----------------------------
	# project workload  工程量
-----------------------------*/

app.controller("workLoad", function($scope, $http, $location, $cookies) {

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

		$scope.orderId = $location.search().id;
		$scope.orderCode = $location.search().code;

		$scope.data ="";

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/decorationTask/quantity/selectList',
			data: {
				decorationTaskCode: $scope.orderCode,	
				token: $cookies.fs_designer_token
			},

            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
            transformRequest: function(obj) {    
                var str = [];    
                for (var p in obj) {    
                    
                    if (typeof obj[p] == 'object' ) {
                        // console.log(p, JSON.stringify(obj[p]));
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }                     
                }    
                return str.join("&");    
            }			
		}).success(function(data) {
			// console.log(data)
			if (data.success) {
				$scope.data = data.datas;
				$scope.subChk = data.hasSubmit;
				$scope.roleCode = window.localStorage.fs_design_role_code;
			}
		})	

		$scope.formData = "";	

	}

	function pushData() {

		var workLoadArr =  document.getElementsByName("workLoad");
		var level1Arr = document.getElementsByName("level1");
		var collectId = document.getElementsByName("collectId");

		var jsonData = new Array();

		for (var i = 0; i < workLoadArr.length; i++) {

			jsonData.push({
				'businessId': collectId[i].value,
				'engineeringQuantity': workLoadArr[i].value,
				'hasLevel1': level1Arr[i].value
			});

		}
		return jsonData;
	}

	$scope.saveWorkAmount = function() {
	
		$scope.formData = pushData();

		$http({
			url: g.host+'/decoration_designer/decorationTask/quantity/update',

			method: 'post',

			data: {
				jsonData: $scope.formData,
				token: $cookies.fs_designer_token
			},

            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
            transformRequest: function(obj) {    
                var str = [];    
                for (var p in obj) {    
                    
                    if (typeof obj[p] == 'object' ) {
                        // console.log(p, JSON.stringify(obj[p]));
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }                     
                }    
                return str.join("&");    
            }
		
		}).success(function(data) {

			// console.log(data);
			alert('保存成功');

		})
	}

	// 提交工作量
	$scope.subWorkAmount = function() {

		// console.log($scope.orderCode);
		$http({
			url: g.host+'/decoration_designer/decorationTask/quantity/submit',

			method: 'post',

			data: {
				decorationTaskCode: $scope.orderCode,
				token: $cookies.fs_designer_token
			},

            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
            transformRequest: function(obj) {    
                var str = [];    
                for (var p in obj) {    
                    
                    if (typeof obj[p] == 'object' ) {
                        // console.log(p, JSON.stringify(obj[p]));
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }                     
                }    
                return str.join("&");    
            }
	
		}).success(function(data) {

			if (g.checkData(data)) {
				$scope.subChk = true;
				$http({
					method: 'post',
					url: g.host+'/decoration_designer/designerSubmitStatus/updateCanOrdersStatus',
					data: {
						decorationTaskCode: $scope.orderCode,
						token: $cookies.fs_designer_token
					},
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		            
		            transformRequest: function(obj) {    
		                var str = [];    
		                for (var p in obj) {    
		                    
		                    if (typeof obj[p] == 'object' ) {
		                        // console.log(p, JSON.stringify(obj[p]));
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
		                    } else {
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		                    }                     
		                }    
		                return str.join("&");    
		            }					
				}).success(function(data) {
					
					// alert(data.msg);
					alert('提交成功');
				})

			}

		})		
	}

})


/* ---------------------------
	# bom 物料清单页
-----------------------------*/
app.controller("bom", function($scope, $http, $location, $cookies){
	// console.log($location);

	$scope.orderId = $location.search().id;

	$scope.orderCode = $location.search().code;

	$scope.formData = "";

	$scope.data = "";


	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

		$http({

			method:'post',
			url: g.host+'/decoration_designer/material/selectList',
			data: {
				decorationTaskCode: $scope.orderCode,
				token: $cookies.fs_designer_token
			},

			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        }

		}).success(function(data) {
			console.log(data);

			if (g.checkData(data)) {
				// alert("提交成功");
				$scope.subChk = data.hasSubmit;
				$scope.data = data.datas;	
				$scope.roleCode = window.localStorage.fs_design_role_code;			
			}
		})
	}

	function pushData() {

		var arr = new Array();
		var qty = document.getElementsByName("qty");
		var configId = document.getElementsByName("configId")
		// console.log(configId);

		for (var i = 0; i < qty.length; i++) {

			arr.push({
				'quantity': qty[i].value,
				'decorationTaskCode': $scope.orderCode,
				'materialConfigurationlId': configId[i].value
			});
		}

		return arr;

	}


/*---------------------------
	坑死人了，Button会尼玛自己提交表单，即使把接口代码注释掉还是会默认提交，我也是醉了!	之前后端接口为update & submit, 
	后来改名之后就没有这个问题了
----------------------------*/
	$scope.save = function() {

		var formData = pushData();

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/material/updateMaterialDetails',
			data: {

				jsonData: formData,
				decorationTaskCode: $scope.orderCode,
				token: $cookies.fs_designer_token

			},

			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		    transformRequest: function(obj) {    
		        var str = [];    
		        for (var p in obj) {    
		            
		            if (typeof obj[p] == 'object' ) {
		                // console.log(p, JSON.stringify(obj[p]));
		                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
		            } else {
		                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		            }                     
		        }    
		        return str.join("&");    
		    }			
		}).success(function(data) {

			// console.log(data);
			alert('保存成功');
		})
		// alert(123)
	}


	$scope.subBom = function() {

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/material/submitMaterial',
			
			data: {
				decorationTaskCode: $scope.orderCode,
				token: $cookies.fs_designer_token
			},

			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		    
		    transformRequest: function(obj) {    
		        var str = [];    
		        for (var p in obj) {    
		            
		            if (typeof obj[p] == 'object' ) {
		                // console.log(p, JSON.stringify(obj[p]));
		                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
		            } else {
		                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		            }                     
		        }    
		        return str.join("&");    
		    }

		}).success(function(data){

			if (data.success) {

				$scope.subChk = true;

				$http({
					method: 'post',
					url: g.host+'/decoration_designer/designerSubmitStatus/updateCanOrdersStatus',
					data: {
						decorationTaskCode: $scope.orderCode,
						token: $cookies.fs_designer_token
					},
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		            
		            transformRequest: function(obj) {    
		                var str = [];    
		                for (var p in obj) {    
		                    
		                    if (typeof obj[p] == 'object' ) {
		                        // console.log(p, JSON.stringify(obj[p]));
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
		                    } else {
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		                    }                     
		                }    
		                return str.join("&");    
		            }					
				}).success(function(data) {
					alert('提交成功');
				})	

			}
		})
	}

})


/*---------------------------
   # design 设计图页
----------------------------*/
 
// 设计图接口调用 刘杰的
app.controller("design", function($scope, $http, $location, $cookies, ngDialog, $window) {

	$scope.orderId = $location.search().id;

	$scope.orderCode = $location.search().code;

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

		
		$http({
			method: 'post',
			url: g.host+'/decoration_designer/decorationDesignDraw/selectDecorationDesignDrawList',		
	        
	        data: {
	        	token: $cookies.fs_designer_token,
	        	decorationTaskCode: $scope.orderCode,
	        },
	        
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        }

		}).success(function(data) {

			// console.log(data);

			if (g.checkData(data)) {

				// console.log(data)
				$scope.data = data.decorationDesignDrawList;

				$scope.designType = data.roleCode;	
				if (data.roleCode ==11) {
					$scope.designTypeFile = 6;
				}
				if (data.roleCode ==12) {
					$scope.designTypeFile = 3;
				}
				if (data.roleCode ==13) {
					$scope.designTypeFile = 4;
				}
				if (data.roleCode ==14) {
					$scope.designTypeFile = 5;
				}
				if (data.roleCode ==15) {
					$scope.designTypeFile = 2;
				}
				if (data.roleCode ==16) {
					$scope.designTypeFile = 1;
				}	

				$scope.hasAdded = data.hasAdded;


				$scope.roleCode = window.localStorage.fs_design_role_code;

				// 判断修改上传图片和文件的弹窗Input值,g.fileUploadByteChk("#EditForm");放在designDrawAdd的内嵌controller里边，在第二次点击时会执行两次
				g.fileUploadByteChk("#EditForm");
				g.fileUploadByteChk("#uploadForm");

			}

		})		
	}

	$scope.designDrawAdd = function() {

		ngDialog.open({
			id: 'designAddForm',
			templateUrl: 'templates/designDrawsAdd.html',	
			scope : $scope,
			width: 800,
			closeByEscape: false,
			closeByDocument: false,

			className: 'ngdialog ngdialog-theme-default designAddForm',

			controller: function() {

				// g.fileUploadByteChk("#uploadForm");

				jQuery("body").on("click", ".designAddForm  #uploadForm .btn", function() {
					
					var formData = new FormData();

					var fileArr = jQuery('#uploadForm input[type="file"]');
					var arr = '';
					for (var i = 0; i < fileArr.length; i++) {

						formData.append('files', fileArr[i].files[0]);
					}

					// 如果是效果图设计师需要获取效果图连接
					if (jQuery("#uploadForm #designUrl")) {
						var url = jQuery("#uploadForm #designUrl").val();
					}

					// formData.append('files', arr);
					jQuery(".loading_box").show();

					jQuery.ajax({
					    url: g.host+'/decoration_designer/decorationDesignDraw/upLoadDecorationDesignDraw?token='+$cookies.fs_designer_token+'&decorationTaskCode='+$scope.orderCode+'&designType='+$scope.designTypeFile+'&panoramaUrl='+url,
					    type: 'POST',
					    cache: false,
					    data: formData,
					    processData: false,
					    contentType: false
					}).done(function(res) {

						// console.log(res)
						if (res.success) {
							
							jQuery(".loading_box").hide();
							ngDialog.close('designAddForm')
							$window.location.reload();
						} else {
							alert('error is occured, please try it later');
							jQuery(".loading_box").hide();
							ngDialog.close('designAddForm');
							return false;
						}

					}).fail(function(res) {
						// console.log(res);
						alert('error is occured, please try it later');
						ngDialog.close('designAddForm');
						return false;
					});
				})
			}		
		})

	}

	$scope.designDrawsEdit = function(id) {
		// console.log(id)
		$scope.designDrawingId = id;
		ngDialog.open({
			id: 'designEditForm',
			templateUrl: 'templates/designDrawsEdit.html',	
			scope : $scope,
			width: 800,
			className: 'ngdialog ngdialog-theme-default designEditForm',

			controller: function($scope, $window) {

				var changeBtnArr = jQuery("#EditForm .btn");

				// g.fileUploadByteChk("#EditForm");

				jQuery("body").on("click", ".design_draw_edit_form #EditForm .btn", function() {

					var thisFormDiv = jQuery(this).parents("#EditForm").find("input[type='file']");
					// return false;
					var formData = new FormData();

					var arr = '';
					for (var i = 0; i < thisFormDiv.length; i++) {

						formData.append('files', thisFormDiv[i].files[0]);
					}

					if (jQuery("#EditForm #designUrl")) {
						var url = jQuery("#EditForm #designUrl").val();
					}
				
					jQuery(".loading_box").show();
					// return false;
					jQuery.ajax({
					    url: g.host+'/decoration_designer/decorationDesignDraw/updateDecorationDesignDraw?token='+$cookies.fs_designer_token+'&decorationTaskCode='+$scope.orderCode+'&designType='+$scope.designTypeFile+'&decorationDesignDrawId='+$scope.designDrawingId+'&panoramaUrl='+url,
					    type: 'POST',
					    cache: false,
					    data: formData,
					    processData: false,
					    contentType: false
					}).done(function(res) {

						console.log(res)
						if (res.success) {
							
							jQuery(".loading_box").hide();
							ngDialog.close('designEditForm');
							$window.location.reload();
						} else {
							jQuery(".loading_box").hide();
							alert('error is occured, please try it later');
							ngDialog.close('designEditForm');							
						}

					}).fail(function(res) {
						// console.log(res);
						alert('error is occured, please try it later');
						jQuery(".loading_box").hide();
						ngDialog.close('designEditForm');
						return false;
					});
				})
			}

		})

	}

	$scope.setDesignAsFinal = function(id) {

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/decorationDesignDraw/updateHasEndVersion',
			data: {
				decorationDesignDrawId: id,
				decorationTaskCode: $location.search().code,
				token: $cookies.fs_designer_token
			},

	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {
	                    // console.log(p, JSON.stringify(obj[p]));
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            return str.join("&");    
	        }			
		}).success(function(data) {

			// console.log(data);
			if (data.code == 0) {
				$http({
					method: 'post',
					url: g.host+'/decoration_designer/designerSubmitStatus/updateCanOrdersStatus',
					data: {
						decorationTaskCode: $scope.orderCode,
						token: $cookies.fs_designer_token
					},
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		            
		            transformRequest: function(obj) {    
		                var str = [];    
		                for (var p in obj) {    
		                    
		                    if (typeof obj[p] == 'object' ) {
		                        // console.log(p, JSON.stringify(obj[p]));
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
		                    } else {
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		                    }                     
		                }    
		                return str.join("&");    
		            }					
				}).success(function(data) {
					console.log('success');
					location.reload()	
					

				})					
			}

		})
	}

})





// add by zhangna
// cont: account

app.controller("costForm", function($scope, $http, $location, $cookies){

	$scope.orderId = $location.search().id;

	$scope.orderCode = $location.search().code;

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

		$scope.roleCode = window.localStorage.fs_design_role_code;

		function objCom(obj) {

			var newObj = new Array();

			for (var i in obj) {

				// console.log(obj[i]);
				if (obj[i].hasOwnProperty("subList")) {

					var subArr = obj[i]["subList"];

					if (subArr.length > 0) {

						for (var a = 0; a < subArr.length; a++) {

							newObj.push({

								materialConfigurationId:subArr[a]['material_configurationl_id'],
								decorationTaskCode: $scope.orderCode

							});

						}

					}

				}

				if (obj[i].hasOwnProperty("dataList")) {

					var subArr = obj[i]["dataList"];

					// console.log(obj[i])

					if (subArr.length > 0) {

						var dataList = [];

						for ( var a = 0; a < subArr.length; a++) {

							// console.log(subArr[a])

							dataList.push({

								groupMaterialProductMiddleId: subArr[a]['groupMaterialProductMiddleId'],

								groupMaterialProductId: subArr[a]['groupMaterialProductId'],

								materialConfigurationId: subArr[a]['materialConfigurationlId'],

								decorationTaskCode: $scope.orderCode

							})

						}

						newObj.push({

							groupMaterialProductId: obj[i]['groupMaterialProductId'],
							
							decorationTaskCode: $scope.orderCode,
							
							child: obj[i]['child'],
							
							subList: dataList,

						})
						// console.log(dataList)
					} else {

						newObj.push({

							groupMaterialProductId: obj[i]['groupMaterialProductId'],
							
							decorationTaskCode: $scope.orderCode,
							
							child: obj[i]['child'],
							
							subList: [],

						})						
					}		
				}				
			}

			return newObj;
		}

		// Input值为空鼠标focus的时候Input设置为空
		$scope.clearZero = function(e) {

			console.log(e.target.value);
			if (e.target.value==0) {
				e.target.value = '';
			}
		}

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/costcontrolsheet/selectList',		
			
			data: {
				token: $cookies.fs_designer_token,
				decorationTaskCode: $scope.orderCode,
			},	    

            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
            transformRequest: function(obj) {    
                var str = [];    
                for (var p in obj) {    
                    
                    if (typeof obj[p] == 'object' ) {
                        // console.log(p, JSON.stringify(obj[p]));
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }                     
                }    
                return str.join("&");    
            }	

		}).success(function(data) {

			if (data.success) {

				$scope.data = data.datas;
				$scope.hasSubmit = data.hasSubmit;
				// $scope.data.P1 = $scope.data.P1;
				console.log($scope.data);

			} else {

				alert(data.msg);

			}
		})	

		$scope.edit = function() {

			var sectionOne = objCom($scope.data.mainMaterial);

			var sectionTwo = objCom($scope.data.greenTechnology);

			for (var i = 0 ; i < sectionOne.length; i++) {

				sectionOne[i]['quantity'] = jQuery(".section-1 input")[i].value;
			
			}

			var sectionTwoList = jQuery(".section-2 > ul > li");

			for (var i = 0; i < sectionTwoList.length; i++) {

				if (sectionTwo[i]['child']==0) {

					sectionTwo[i]['quantity'] = jQuery(sectionTwoList[i]).find("input").val();
				
				}
				// console.log(sectionTwoList.find("ul input"))

				if (sectionTwo[i]['child']==1) {

					if (sectionTwoList.find("ul")) {

						if (sectionTwoList.find("ul input").length > 0) {

							for (var a = 0; a < sectionTwoList.find("ul input").length; a++) {

								sectionTwo[i]['subList'][a]['quantity'] = jQuery(sectionTwoList.find("ul input")[a]).val();								// console.log(jQuery(sectionTwoList.find("ul input")[a]).val())

							}
						}
					}

					var subArr = [];

					// if (sectionTwoList)
				}

			}

			// console.log(sectionTwo);

			$http({
				url: g.host+'/decoration_designer/costcontrolsheet/saveCostControlSheet',
				method: 'post',
				data: {

					token: $cookies.fs_designer_token,

					decorationTaskCode: $scope.orderCode,

					greenMainMaterialJson: sectionOne,

					greenGroupProductJson: sectionTwo

				},

	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	            
	            transformRequest: function(obj) {  

	                var str = [];  

	                for (var p in obj) {    
	                    
	                    if (typeof obj[p] == 'object' ) {
	                        // console.log(p, JSON.stringify(obj[p]));
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                    } else {
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                    }                     
	                }    
	                return str.join("&");    
	            }	

			}).success(function(data) {

				console.log(data);

			})

		}

		// sub
		$scope.sub = function() {

			$http({
				url: g.host+'/decoration_designer/costcontrolsheet/submitCostControlSheet',
				method: 'post',
				data: {

					token: $cookies.fs_designer_token,

					decorationTaskCode: $scope.orderCode,
				},

	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	            
	            transformRequest: function(obj) {  

	                var str = [];  

	                for (var p in obj) {    
	                    
	                    if (typeof obj[p] == 'object' ) {
	                        // console.log(p, JSON.stringify(obj[p]));
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
	                    } else {
	                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                    }                     
	                }    
	                return str.join("&");    
	            }
			}).success(function(data) {

				alert(data.msg);

				$scope.hasSubmit = data.success;

			})
		}
	}	

})



app.controller("myAccount", function($http, $scope,$location, $cookies) {
	
	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

		// $scope.data  = '';

		// $http({
		// 	url: g.host+'/decoration_designer/decorationTask/order/selectList',
		// 	data: {
		// 		token: $cookies.fs_designer_token,
		// 		decorationTaskCode: $scope.orderCode,
		// 	},
		// 	method: 'post',
		// }).success(function(data) {
		// 	$scope.data = data.datas;
		// })	

	}

})


// gallery
app.controller("gallery", function($http, $scope, ngDialog, $location, $cookies) {

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {
		// $scope.data  = '';

		// $http({
		// 	url: g.host+'/decoration_designer/decorationTask/order/selectList',
		// 	data: {
		// 		token: $cookies.fs_designer_token,
		// 		decorationTaskCode: $scope.orderCode,				
		// 	},
		// 	method: 'post',
		// }).success(function(data) {
		// 	$scope.data = data.datas;
		// })	
	}	

	$scope.detailsPop = function() {

        ngDialog.open({
        	width:'600px',
        	height:'800px',
            template:'templates/detailPop.html',
            className: 'ngdialog-theme-default processConfigEdit',
            scope: $scope,
        })

	}	

})


/*
================================================================
	ng-model 也可以在循环中使用，
	只要双向数据绑定指定就可以

	data = {
		id: 1,
		id:２，
	}

	ng-repeat = item in data

	<b ng-model="data.id">{{item.id}}</b>

-------------------------------------------------------------

	模板中也可以使用ng-if 判断值来控制标签的显示于隐藏

-------------------------------------------------------------

	ui.router 可以使用多级，例如dashboard.order.detail........


*/