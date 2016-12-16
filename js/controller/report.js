
/* ---------------------------
	# report 量房报告页
-----------------------------*/
app.controller("report", function($scope, $http, $location, design){

	// 获取url中的项目ID和项目CODE
	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

	// 获取已经保存的数据
	// $http({
	// 	method: 'post',
	// 	url: 'http://192.168.0.87/decoration_designer/volumeReport/selectVolumeReportByTaskCode',
	// 	data: {
	// 		decorationTaskCode: $scope.orderCode
	// 	},
 //        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        
 //        transformRequest: function(obj) {    
 //            var str = [];    
 //            for (var p in obj) {    
                
 //                if (typeof obj[p] == 'object' ) {
 //                    // console.log(p, JSON.stringify(obj[p]));
 //                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])))
 //                } else {
 //                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
 //                }                     
 //            }    
 //            return str.join("&");    
 //        },		
	// }).success(function(data) {
	// 	// console.log(data);
	// })

	$scope.formData = {

		generalInfo: {

			type: 1,

			ownerSurveyTime: '',

			ownerName: '',

			ownerSex: '',

			ownerAge: '',

			ownerBuildArea: '',

			ownerUseArea: '',

			ownerPlannedInvests: '',

			ownerMPlannedInvests: '',

			ownerPlanTime: '',

			ownerAddress: '',

		},
		houseBasicInfo: {

			type: 2,

			// 请选择该房屋原结构
			houseHouseStructureType: '',

			// 请填写原房屋结构是否有缺陷之处（如：墙体裂开、平整度、顶面漏水）
			houseHouseStructureFault: '',
			houseFaultView: '',
			faultViewShow: '',
			faultArr: new Array(),

			// 请选择暖气是否需改动
			houseHeatingChange: '',
			houseHeatingChnageView: '',
			hCViewShow: false,

			// 请选择媒气是否需改动
			houseGasChange: '',
			houseGasChangeView: '',

			// 请选择倾向的采暖方式
			houseHeatingType: '',

			// 是否已经安装中央空调(0已安装1没安装)
			houseAcBuild: '',
			houseCm: '', // 是否定制（没安装弹出）0，已定制1，没定制 customer made

			// 厨房整体橱柜是否已安装(0否1是)
			houseWholeCabinetBuild: '',
			houseCabinetCm: '', // 橱柜是否已定制（没安装弹出）0，已定制1，没定制
			
			// 阳台墙地面是否已铺砖(0已铺装1没铺装)
			houseBalconyTileBuild: '',
			houseBalconyPart: '', // 阳台墙地面局部

			// 厨房是否已铺砖及吊顶（1已铺装2没铺装3已吊顶4没吊顶）
			houseKitTileCeilingBuild: '',
			houseKitCeilingStuff: '', //厨房吊顶材质（已吊顶弹出）1PVC2铝扣板3石膏板

			// 卫生间是否铺砖及吊顶（1已铺装2没铺装3已吊顶4没吊顶）
			houseWcCeilingTileBuild: '',
			houseWcCeilingStuff: '', // 卫生间吊顶材质（已吊顶弹出）1PVC2铝扣板3石膏板

			// 其他
			houseOther: '',

		},
		step_3: {

		},
		step_4: {

		},
		step_5: {

		}
	}

	// 量房时间赋值
	jQuery('#surveyTime').daterangepicker({
		singleDatePicker: true,

	}, function(d) {
		$scope.formData.generalInfo.ownerSurveyTime = Date.parse(d._d);
	});

	
	/* -------------------------
		该房屋装修计划投资	start
	---------------------------*/

	$scope.investMPChangeVal = ""; // 该值是为判断是否选中含主材才赋值

	// 判断输入值之后选中含主材则 给 ownerMPlannedInvests 赋值
	$scope.investMPChange = function(e) {

		if($scope.investMPChangeVal) {
			$scope.formData.generalInfo.ownerMPlannedInvests = $scope.formData.generalInfo.ownerPlannedInvests;

		} else {
			$scope.formData.generalInfo.ownerMPlannedInvests = "";
		}	
	}

	/* -------------------------
		该房屋装修计划投资	end
	---------------------------*/


	// 城市地区的$scope,为合并地址用
	$scope.generalInfo = {
		province: '',
		city: '',
		county: '',
		address: ''
	}

	// 合并地址
	$scope.addressGather = function() {

		$scope.formData.generalInfo.ownerAddress = $scope.generalInfo.province + $scope.generalInfo.city + $scope.generalInfo.address	
		// console.log($scope.formData.generalInfo.ownerAddress)
	}


	// houseBasicInfo 方法

	// 请填写原房屋结构是否有缺陷之处，添加子项
	$scope.addItem = function(e) {

		var t = jQuery(angular.element(e.target))
		$scope.formData.houseBasicInfo.faultArr.push(t.parent(".info_add").find("input").val());
		t.parent(".info_add").find("input").val('');

		$scope.formData.houseBasicInfo.houseFaultView = $scope.formData.houseBasicInfo.faultArr.join(",");
	}

	// 删除添加的缺陷之处
	$scope.removeFaultList = function(i) {

		// $scope.formData.houseBasicInfo.faultArr.splice(i,1);
		design.removeItem($scope.formData.houseBasicInfo.faultArr, i);
		$scope.formData.houseBasicInfo.houseFaultView = $scope.formData.houseBasicInfo.faultArr.join(",");

	}

	// 显示添加缺陷之处的方法
	$scope.showAdviceList = function() {

		var radioValue = $scope.formData.houseBasicInfo.houseHouseStructureFault;
		var faultShowValue = $scope.formData.houseBasicInfo.faultViewShow;

		$scope.formData.houseBasicInfo.faultViewShow = design.switchShow(radioValue, faultShowValue);

		if (!design.switchShow(radioValue, faultShowValue)) {

			$scope.formData.houseBasicInfo.faultArr.length = 0;
			$scope.formData.houseBasicInfo.houseFaultView = "";
		}

	}


	$scope.test = function(name, val) {

		design.showSwitch(name, val);

	}


	var step = angular.element(document.getElementsByClassName("step"));
	var stepCont = angular.element(document.getElementsByClassName("step_content"));

	// 当前第几步骤
	$scope.currentStep = "";
	// console.log(step)

	// 显示当前步骤的表单内容
	for (var i = 0; i < step.length; i++) {

		if (angular.element(step[i]).hasClass("current")) {
			$scope.currentStep = angular.element(step[i]).attr("id");

			if(stepCont[i].getAttribute("content") == $scope.currentStep) {
				angular.element(stepCont[i]).addClass("show");
			}			

		}
	}
	// console.log(currentStep);

	// 下一步操作的时候进行判断显示下一步的样式和内容
	$scope.nextStep = function(step) {

		var currentStep = angular.element(document.getElementById(step));
		var currentCont = angular.element(document.querySelector("div[content="+step+"]"));

		angular.element(currentStep).removeClass("current");
		angular.element(currentStep).next().addClass("viewed current");

		$scope.currentStep = angular.element(currentStep).next().attr("id");

		angular.element(currentCont).removeClass("show");
		angular.element(currentCont).next().addClass("show");

		// console.log(angular.element(document.querySelector("div[content="+step+"]")));
	}

	$scope.save = function(step) {

		if (step == 'step_1') {
			// console.log($scope.formData.generalInfo);
		}

		$http({
			url: 'http://192.168.0.87/decoration_designer/volumeReport/addVolumeReport',
			method: 'post',
			data: {
				volumeReportJson: $scope.formData
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
			console.log(data)
		})
		// console.log(step);
	}

	// 上一步操作的时候判断显示上一步内容并隐藏当前步骤；
	$scope.lastStep = function(step) {

		var currentStep = angular.element(document.getElementById(step));

		var currentCont = angular.element(document.querySelector("div[content="+step+"]"));

		var lastStep = angular.element(currentStep[0].previousSibling.previousSibling);

		var lastCont = angular.element(currentCont[0].previousSibling.previousSibling)

		$scope.currentStep = angular.element(lastStep).attr("id");

		angular.element(currentStep).removeClass("current").removeClass("viewed");
		angular.element(lastStep).addClass("viewed current");

		angular.element(currentCont).removeClass("show");
		angular.element(lastCont).addClass("show");		
	}

})