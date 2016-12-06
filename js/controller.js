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
		$http.post('http://192.168.0.224:8080/decoration_designer/decorationTask/quantity/selectList?decorationTaskCode=116092400000060&token=designer_13600136000')
		.success(function(data) {
			console.log(data)
			if (data.success) {
				$scope.data = data.datas;
			}
		})

	}


})