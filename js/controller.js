'use strict';

/*
 * work amount 
*/


app.controller("workamount", function($scope, $http, $location) {

	// alert(456)
	// console.log(123);

	// console.log(data);








	// $http.jsonp('http://192.168.0.224:8080/decoration_designer/decorationTask/quantity/selectList?decorationTaskCode=116092400000060&token=designer_13600136000').success(function(data) {
	// 	console.log(data);
	// })

})

app.controller("designer", function($scope, $http) {

	$scope.getWorkAmount = function() {

		// alert(456)
		// console.log(123)
		$http.post('http://192.168.0.224:8089/decoration_designer/decorationTask/quantity/selectList?decorationTaskCode=116092400000060&token=designer_13600136000')
		.success(function(data) {
			console.log(data)
			if (data.success) {
				$scope.data = data.datas;
			}
		})

	}

	// 工程量
	$scope.saveWorkAmount = function() {

		// console.log(document.getElementsByName("workLoad").length);		

		var workLoadArr =  document.getElementsByName("workLoad");
		var level1Arr = document.getElementsByName("level1");
		var collectId = document.getElementsByName("collectId");

		var jsonData = new Array();

		for (var i = 0; i < workLoadArr.length; i++) {

			// console.log(workLoadArr[i].value, level1Arr[i].value, collectId[i].value);

			/*jsonData.push('{businessId:'+collectId[i].value+',engineeringQuantity:'
				+workLoadArr[i].value+',hasDetail:'+level1Arr[i].value+'}')*/
			jsonData.push({
				'businessId': collectId[i].value,
				'engineeringQuantity': workLoadArr[i].value,
				'hasLevel1': level1Arr[i].value
			});

		}

		$http({
			url: 'http://192.168.0.224:8089/decoration_designer/decorationTask/quantity/update?token=designer_13600136000',

			method: 'post',

			data: {
				jsonData: jsonData
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

})
