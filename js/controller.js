'use strict';

/*
 * work amount 
*/


// app.controller("workamount", function($scope, $http, $location) {

// })

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

/*
 * 新添加的
*/

app.controller("orders", function($http, $scope) {

	// console.log(sdf);

	$scope.data  = '';

	$http({
		url: 'http://192.168.0.224:8080/decoration_designer/decorationTask/order/selectList?token=designer_13600136000',
		method: 'post',
	}).success(function(data) {
		$scope.data = data.datas;
	})

})


app.controller("orderdetails", function($http, $scope, $location) {

	// console.log($location.$$absUrl);

	var id = $location.$$absUrl.indexOf("?")+1;

	id = $location.$$absUrl.substring(id);

	$http({
		url: 'http://192.168.0.224:8080/decoration_designer/decorationTask/order/view?token=designer_13600136000',
		method: 'post',
		data: {
			decorationTaskId: id
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

		console.log($scope.data)
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
				// $location.path("http://www.baidu.com");
			}

			// console.log(data);

		}).error(function(data) {

			console.log('error is occured');

		})
	}

})

/*
addByzhangna
cont:date 插件
*/
	app.controller("providerPurchaseOrder", function($scope, $http, $location) {


	jQuery('#datePick').daterangepicker({

	    "autoApply": true,
	    "linkedCalendars": false,
	    "startDate": "11/16/2016",
	    "endDate": "11/22/2016",
	    "opens": "left",


	}, function(start, end, label) {

		console.log(start.format('YYYY-MM-DD'))	
	  console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
	});




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

	模板中也可以使用ng-if 判断值来控制标签的显示于隐藏

*/