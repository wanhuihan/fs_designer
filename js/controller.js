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


app.controller("orders", function($http, $scope) {

	$scope.data  = '';

	$http({
		url: 'http://192.168.0.224:8080/decoration_designer/decorationTask/order/selectList?token=designer_13600136000',
		method: 'post',
	}).success(function(data) {
		$scope.data = data.datas;
	})

})

/*-------------------
	#login page
---------------------*/
app.controller("login", function($http, $scope, $location) {

	// console.log(123)
	$scope.data = {
		user: '',
		pwd: '',
		role: '11',
	}

	$scope.sub = function() {

		// console.log($scope.data);
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

			if (g.checkData(data)) {

				g.setCookie(data);
				$location.path("/dashboard");
				// $location.path("http://www.baidu.com");
			}

			// console.log(data);

		}).error(function(data) {

			// console.log('error is occured');

		})
	}

})

/*
addByzhangna
cont:date 插件
*/
	app.controller("providerPurchaseOrder", function($scope, $http, $location) {

	jQuery('#datePick').daterangepicker({

		singleDatePicker: true,

	}, null);

})


/* --------------
	# dashboard
-----------------*/

app.controller("dashboard", function($scope, $http) {

	$scope.leftSideBar = false;

})

/* ----------------
	# order details page
------------------*/

app.controller("orderDetails", function($http, $scope, $location) {

	// console.log($location.search());
	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

	$http({
		url: 'http://192.168.0.224:8080/decoration_designer/decorationTask/order/view?token=designer_13600136000',
		method: 'post',
		data: {
			decorationTaskId: $scope.orderId,
			decorationTaskCode: $scope.orderCode
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

})


/*----------------------------
	# project workload  工程量
-----------------------------*/

app.controller("workLoad", function($scope, $http, $location) {

	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

	// console.log(123);
	$scope.data ="";

	$http.post('http://192.168.0.224:8080/decoration_designer/decorationTask/quantity/selectList?decorationTaskCode=116092400000060&token=designer_13600136000')
	.success(function(data) {
		// console.log(data)
		if (data.success) {
			$scope.data = data.datas;
		}
	})	

	$scope.formData = "";

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
			url: 'http://192.168.0.224:8080/decoration_designer/decorationTask/quantity/update?token=designer_13600136000',

			method: 'post',

			data: {
				jsonData: $scope.formData
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
			url: 'http://192.168.0.224:8089/decoration_designer/decorationTask/quantity/submit?token=designer_13600136000',

			method: 'post',

			data: {
				decorationTaskCode: $scope.orderCode
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
				alert("提交成功");
				$scope.inputDisabled = true;				
			}

		})		
	}

})


/* ---------------------------
	# report 量房报告页
-----------------------------*/
app.controller("report", function($scope, $http, $location){


	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

})


/* ---------------------------
	# bom 物料清单页
-----------------------------*/
app.controller("bom", function($scope, $http, $location){
	// console.log($location);

	// $scope.test = $location.$$url;

	// $scope.a = 1212312312;
})


/*---------------------------
   # design 设计图页
----------------------------*/

app.controller("design", function($scope, $http, $location){
	
	
	$http({
		method: 'post',
		url: 'http://192.168.0.87/decoration_designer/decorationDesignDraw/selectDecorationDesignDrawList',		
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        
        // transformRequest: function(obj) {    
        //     var str = [];    
        //     for (var p in obj) {    
                
        //         if (typeof obj[p] == 'object' ) {
        //             // console.log(p, JSON.stringify(obj[p]));
        //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
        //         } else {
        //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
        //         }                     
        //     }    
        //     return str.join("&");    
        // }

	}).success(function(data) {

		// console.log(data);
		if (g.checkData(data)) {
			$scope.data = data.decorationDesignDrawList;			
		}

	})
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