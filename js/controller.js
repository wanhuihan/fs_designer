'use strict';

/*
 * work amount 
*/

// app.controller("designer", function($scope, $http) {

// 	$scope.getWorkAmount = function() {

// 		// alert(456)
// 		// console.log(123)
// 		$http.post('http://192.168.0.224:8089/decoration_designer/decorationTask/quantity/selectList?decorationTaskCode=116092400000060&token=designer_13600136000')
// 		.success(function(data) {
// 			console.log(data)
// 			if (data.success) {
// 				$scope.data = data.datas;
// 			}
// 		})

// 	}

// 	// 工程量
// 	$scope.saveWorkAmount = function() {

// 		// console.log(document.getElementsByName("workLoad").length);		

// 		var workLoadArr =  document.getElementsByName("workLoad");
// 		var level1Arr = document.getElementsByName("level1");
// 		var collectId = document.getElementsByName("collectId");

// 		var jsonData = new Array();

// 		for (var i = 0; i < workLoadArr.length; i++) {

// 			// console.log(workLoadArr[i].value, level1Arr[i].value, collectId[i].value);

// 			/*jsonData.push('{businessId:'+collectId[i].value+',engineeringQuantity:'
// 				+workLoadArr[i].value+',hasDetail:'+level1Arr[i].value+'}')*/
// 			jsonData.push({
// 				'businessId': collectId[i].value,
// 				'engineeringQuantity': workLoadArr[i].value,
// 				'hasLevel1': level1Arr[i].value
// 			});

// 		}

// 		$http({
// 			url: 'http://192.168.0.224:8089/decoration_designer/decorationTask/quantity/update?token=designer_13600136000',

// 			method: 'post',

// 			data: {
// 				jsonData: jsonData
// 			},

//             headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
//             transformRequest: function(obj) {    
//                 var str = [];    
//                 for (var p in obj) {    
                    
//                     if (typeof obj[p] == 'object' ) {
//                         // console.log(p, JSON.stringify(obj[p]));
//                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
//                     } else {
//                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
//                     }                     
//                 }    
//                 return str.join("&");    
//             }

		
// 		}).success(function(data) {

// 			console.log(data);

// 		})
// 	}

// })

app.controller("header", function($scope, $http, $location, $cookies, $cookieStore) {

	$scope.user = {
		name: g.user.name,
		role: g.user.role
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

app.controller("orders", function($http, $scope, $location, $cookies) {

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
		})
	}

})

/*-------------------
	#login page
---------------------*/
app.controller("login", function($http, $scope, $location, $cookies, ngDialog) {

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

		}).success(function(data) {
			// alert(123)
			// console.log(data)
			if (g.checkData(data)) {

				g.setCookie(data);
				// return false;
				g.user.name = data.realName;
				g.user.role = data.roleName;
				$scope.headerShow = true;
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

})

/* --------------
	# dashboard
-----------------*/

app.controller("dashboard", function($scope, $http, $location, $cookies) {

	// alert($cookies.fs_designer_token)
	$scope.leftSideBar = false;


	// console.log($cookies.fs_designer_token);
	if (!g.chkCookie()) {
		$location.path("/login");
	} else {
		// window.location.href = '#/dashboard/orders'
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
			// console.log($scope.data)
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
			url: 'http://192.168.0.224:8089/decoration_designer/material/updateMaterialDetails',
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

		})
		// alert(123)
	}


	$scope.subBom = function() {

		$http({
			method: 'post',
			url: 'http://192.168.0.224:8089/decoration_designer/material/submitMaterial',
			
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
				}).success(function(data) {})	

			}
		})
	}

})


/*---------------------------
   # design 设计图页
----------------------------*/
 
// 设计图接口调用 刘杰的
app.controller("design", function($scope, $http, $location, $cookies, ngDialog) {

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

				$scope.data = data.decorationDesignDrawList;
				$scope.roleCode = data.roleCode;	
				// console.log($scope.roleCode)		
			}

		})		
	}

	$scope.designDrawAdd = function() {

		ngDialog.open({
			templateUrl: 'templates/designDrawsAdd.html',	
			scope : $scope,
			width: 800	
		})

	}

	$scope.designDrawsEdit = function(id) {

		ngDialog.open({
			templateUrl: 'templates/designDrawsEdit.html',	
			scope : $scope,
			width: 800	
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

app.controller("costForm", function($scope, $http, $location){

	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

	if (!g.chkCookie()) {

		$location.path("/login");

	} else {

	// $http({
	// 	method: 'post',
	// 	url: 'http://192.168.0.87/decoration_designer/decorationDesignDraw/selectDecorationDesignDrawList',		
       
	// }).success(function(data) {

	// 	console.log(data);
	// 	if (g.checkData(data)) {
	// 		$scope.data = data.decorationDesignDrawList;			
	// 	}

	// })		
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