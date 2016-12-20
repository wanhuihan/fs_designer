
/* ---------------------------
	# report 量房报告页
-----------------------------*/
app.controller("report", function($scope, $http, $location, design, $location){
	
	if (!g.chkCookie()) {

		$location.path("/login");

	} else {
		
	}
	// 获取url中的项目ID和项目CODE
	$scope.orderId = $location.search().id;
	$scope.orderCode = $location.search().code;

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
			// hCViewShow: false,

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

		greenTechInfo: {
			type: 3,
			// 是否需要智能家居系统（0否1是）
			greenIHouseSysOption: '',
			// 是否需要智能家居系统意见
			greenIHouseSysOptionView: '',
			// 是否需要毛细管系统（0否1是）
			greenCapillarySysOption: '',
			// 是否需要毛细管系统意见
			greenCapillarySysOptionView: '',
			// 是否需要置换式新风系统（0否1是）
			greenReplaceVentilationSysOpt: '',
			// 是否需要置换式新风系统意见
			greenReplaceVentilationSysOptView: '',
			// 是否需要卫生间净化水系统（0否1是）
			greenWcClanificationSysOpt: '',
			// 是否需要卫生间净化水系统意见
			greenWcClanificatoinSysOptView: '',
			// 是否需要同层排水系统（0否1是）
			greenSameFloorDrainageSysOpt: '',
			// 是否需要同层排水系统意见
			greenSameFloorDrainageSysOptView: '',
			// 是否需要隔声降噪系统（0否1是）
			greenDenoiseSysOpt: '',
			// 是否需要隔声降噪系统意见
			greenDenoiseSysOptView:'',
			// 是否需要垃圾处理系统（0否1是）
			greenLitterSysOpt: '',
			// 是否需要垃圾处理系统意见
			greenLitterSysOptView: '',
		},

		abstruse: {
			// 是否有考虑设置（1鞋柜2衣柜3镜子（整装）4纯装饰性）
			lrConsiderSettingOpt: '',
			lrConsiderSettingOptArr: [],
			// 是否介意入门能够直观全室（0否1是）
			lrVisualWholeRoomOpinion: '',
			// 玄关是否考虑其他文化属性或气氛（例如：字画、古董、雕塑等）（0否1是）
			lrScreenCultureOpt: '',
			// 玄关是否考虑其他文化属性或气氛（例如：字画、古董、雕塑等）意见
			lrScreenCultureOptView: '',
			// 入户门更换为霍曼品牌（0否1是）
			lrGateHuomanSelOpt: '',
			// 对玄关是有特殊要求（例如：灯光、色彩、特殊造型等）	
			lrScreenSpec: '',		
		},

		livingRoom:{

			// 客厅的主要功能（1会客2休息3娱乐4阅读）
			sittingLrMainFun: '',
			sittingLrMainFunArr: [],
			// 接待客人数
			sittingReceptionNumOpt: '',
			// 是否接待客人（0否1是）
			sittingReceptiveSel: '',
			// 是否与餐厅为一体（否1是）
			sittingDrCombineOpt: '',
			// 客厅的基本色调（0暖色系1冷色系）
			sittingBasicTone: '',
			// 客人来家中聚会内容（1聊天2PARTY3卡拉OK）
			sittingPartyContent: '',
			sittingPartyContentArr: [],
			// 客人来家中聚会内容意见
			sittingPartyContentOpinion: '',
			// 是否需要影视墙背景造型（0否1是）
			sittingFilmWallBackgroundOpt: '',
			// 客厅地面材料要求（1实木地板2复合地板3地砖4石材5拼花）
			sittingGroundStuffRequirements: '',
			// 音像制品数量
			sittingAoObjectsNum: '',
			// 音像制品数量_是否需要特别设置(0否1是)
			sittingAoObjectsQtySpecialSetOpt: '',
			// 是否需要吊顶(0否1是)
			sittingCeilingOpt: '',
			// 吊顶方式(1直线2曲线3混合)
			sittingCeilingType: '',
			// 客厅内的视听设备有哪些(填写设备及规格)
			sittingAudioApparatus: '',
			// 是否有其他使用功能要求
			sittingOtherFuncRequest: '',
			// 对客厅有无特别的灯光设计要求
			sittingSpecialLightsDesignOpt: '',
		},
		dinningRoom:{
			// 餐厅使用人数
			drUseNum: '',
			// 餐厅使用人数_频率(1晚餐2午餐3早餐4偶尔)
			drUseNumRate: '',
			drUseNumRateArr: [],
			// 餐桌餐椅配置（1：1*4；2：1*6；3：其他)
			drChairsConfg: '',
			// 餐桌配置具体内容
			drChairsDetails: '',
			// 是否需要配备（1餐柜2酒柜3陈列柜）
			drEquipmentOpt: '',
			drEquipmentOptArr: [],
			// 有无藏酒（0否1是）
			drWineCabinetOpt: '',
			// 是否是聚会的主要场所（0否1是）
			drPartyMainVenueOpt: '',
			// 是否需要在餐厅看电视（0否1是）
			drTvOpt: '',
			// 家庭烹饪的特点（0中餐1西餐）
			drCookingType: '',
			// 娱乐活动（1棋2牌3其他）
			drAmuseActivites: '',
			// 对餐厅色彩要求
			drColorRequest: '',

		},
		kitchen:{

			// 电气设备(电源问题)
			kitElecEquipment: '',
			// 对墙、地材料或色彩要求
			kitColorRequest: '',
			// 对水、电设备要求(冷热水设施)
			kitWaterEquipmentRequest: '',
			// 对橱柜档次品质品牌要求
			kitCabinetRequest: '',
			// 吊顶材料（1PVC扣板2铝扣板3防水石膏板4铝塑板）
			kitCeilingStuff: '',
			// 照明要求
			kitLightingRequest: '',
		},
		
		readingRoom: {	

			// 书房功能（1读书2写作3会客4品茶5电脑操作）
			libFun: '',
			libFunArr: [],

			// 书房使用以何人为主
			libPeopleUse: '',
			// 共有几人同时使用书房
			libPeopleWholeUse: '',
			// 存书种类以及数量（1藏书类2工具类3杂志类）
			libBooksKindNum: '',
			libBooksKindNumArr: [],
			// 存书种类以及数量_存书数量
			libBooksContain: '',
			// 存书种类以及数量相关要求
			libBooksRequest: '',
			// 惯以何种方式看书（如：坐着看、躺着看）
			libReadingPosture: '',
			// 书房使用频率（1每天2经常3偶尔）
			libUseRate: '',
			// 书房是否当客厅使用（0否1是）
			libUseAsLrOpt: '',
			// 是否需要（1电话2网线3打印机4扫描机）
			libNetworkOpt: '',
			libNetworkOptArr: [],
		},

		mainRoom: {

			// 业主对寝具的选择（0购买1制作）
			brSleepObjectSelOpt: '',
			// 业主对寝具品牌和颜色的选择（品牌及颜色）
			brSleepObjectColorModel: '',
			// 业主对床的要求（0标准1加大）
			brBedRequest: '',
			// 业主对床类型的要求（1木质2金属铁艺3复合材料）
			brBedTyleRequest: '',
			// 衣柜存衣量的要求（1大量2中量3少量）
			brWardrobeQtyRequest: '',
			
			// 贮藏内容（1衣服2鞋3箱包4被褥）
			brDepotThings: '',
			brDepotThingsArr: [],
			// 女主人是否需要梳妆台（0否1是）
			brDresserOpt: '',
			// 是否需要（1视听设备2电话3网线）
			brNetworkOpt: '',
			brNetworkOptArr: [],
			// 卧室整体色彩搭配（如：冷色系、暖色系）
			brColorConfig: '',
			// 对灯光设计有无特殊要求（如：灯光色彩、可调光源）
			brLightingRequest: '',
			// 对地面、墙面材料有无特殊要求
			brGroundWallRequest: '',
		},

		kidRoom: {

			// 房间使用功能及具体使用要求（1独生子2老人3保姆）
			krUseFunSpecific: '',
			// 家具的选择（0购买1制作）
			krFurnitureSel: '',
			// 家具配置（1电脑桌2写字台3衣柜4书柜）
			krFurnitureConfig: '',
			// 是否考虑年龄变更（0否1是）
			krAgeChangeOpt: '',
			// 儿童有何兴趣爱好（1钢琴2绘画3其他）
			krHobby: '',
			// 有无特殊灯光要求（1可调光源2双控开关3地脚线）
			krSpecialLightsReuqest: '',
			krSpecialLightsReuqestArr: [],
			// 对该房间的色彩要求
			krColorRequest: '',
			// 老人是否有特殊的生理方面的考虑
			krOldPhysiologyOpt: '',
			// 是否有旧家具需要保留
			krOldFurnitureKeepOpt: '',
			// 是否有旧家具需要保留_色调
			krOldFurnitureKeepOptTone: '',
			// 是否有旧家具需要保留_尺寸: '',
			krOldFurnitureKeepOptSize: '',
			// 是否有旧家具需要保留_材质
			krOldFurnitureKeepOptMaterial: '',
			// 请注明儿童年龄、性别玩具及书籍的数
			krKidAgeGenderToyBookInfo: '',
		},
		guestRoom: {
			// 房间的使用频率及主要功能
			roomUseRateMainFun: '',
			// 家居配置
			roomHomeConfig: '',
			// 是否需要_客房（1视听设备2电话3网线）
			roomGrOpt: '',
			roomGrOptArr: [],
			// 是否需要_客房相关要求
			roomGrRequest: '',
			// 有无特殊灯光要求_客房（1可调光源2双控开关3地脚线）
			roomGrLightingReuqest: '',
			roomGrLightingReuqestArr: [],
			// 是否需要储藏功能
			roomStoreFun: '',
			// 房间有无特殊装饰要求
			roomSpecialDecorationOpt: '',
		},
		restroom: {
			// 对天花、墙、地面材料的要求
			wcCeilingWallGroundRequest: '',
			// 洁具的颜色、档次、品质、品牌
			wcAppInfo: '',
			// 冷热水系统的改造要求
			wcHotColdWaterRequest: '',
			// 灯光的具体要求
			wcLightingRequest: '',
			// 卫生间的色彩倾向（0冷色1暖色）
			wcColor: '',
		},

		balcony: {
			// 是否需要封闭阳台以及材料（0否1是）
			balconyBlockStuffOpt: '',
			// 是否需要封闭阳台以及材料_是（1铝合金2塑钢3木制）
			balconyBlockStuff: '',
			// 所有外窗更换为旭格品牌（0否1是）
			balconyWinToXugeOpt: '',
			// 所有外窗更换为旭格品牌_相关要求
			balconyWindwToXugeRequest: '',
			// 阳台功能要求（1晾衣服2健身3休息4储物5养殖花木）
			balconyFunRequest: '',
			balconyFunRequestArr: [],
			// 阳台功能要求_相关要求			
			balconyFunctionWant: '',
		},

		additional: {
			// 电话的数量、要求
			addTelQtyRequest: '',
			// 电脑（多媒体）的数量、位置
			addComputerQtyPosition: '',
			// 视听设备
			addAudioVisualEquipment: '',
			// 对那些地域文化感兴趣（列举国家或城市）（1中国传统文化2亚洲其他国家文化3非洲文化4欧洲文化5美洲文化6其他国家）
			addRegionalCulture: '',
			addRegionalCultureArr: [],
			// 对绘画、饰品的爱好（1油画2水彩画3国画4现代装饰画5摄影作品6其他）
			addPaintingJewelryHobby: '',
			addPaintingJewelryHobbyArr: [], 
			// 是否有个人藏品需要展示
			addObjectsDisplayOpt: '',
			// 对室内绿化有何要求（品种、数量、位置）
			addIndoorGreeningRequest: '',
			// 是否养宠物
			addKeepPets: '',
			// 对家具的风格喜好（1清油2复合材料3混油）
			addFurnitureStyle: '',
			// 个人对服装着装、色彩有何喜好、习惯
			addDressColorStyle: '',
			// 对家居风格、色彩的喜好（品种、数量、位置）
			addHomeStyle: '',
			// 平日从事何种体育项目
			addUsualSports: '',
			// 有什么运动器械
			addSportsEquipment: '',
			// 在设计、装修中有何禁忌、忌讳
			addDesignDecorationTaboo: '',
			// 列举你喜欢的装修风格
			addPersonalDecorationStyle: '',
			// 你对以前房屋的设计及装修有何遗憾：
			addExDesignDecoRegret: '',
			// 有无旧家具或特殊物品的安置
			addOldFurnitureSpecialItemsPlaceOpt: '',
			// 有无宗教信仰
			addReligiousBeliefOpt: '',
		},
		others: {
			// 储藏室
			otherStoreroom: '',
			// 健身房
			otherGym: '',
			// 音乐室
			otherMusicRoom: '',
			// 茶室
			otherTeahouse: '',
			// 画室
			otherStudio: '',
			// 车房
			otherGarage: '',
			// 游泳池
			otherPoll: '',
			// 花房
			otherGreenhouse: '',
			// 佣人房 
			otherMaidRoom: ''

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

	// 量房时间赋值
	jQuery('#decorationTime').daterangepicker({
		singleDatePicker: true,

	}, function(d) {
		$scope.formData.generalInfo.ownerPlanTime = Date.parse(d._d);
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


	$scope.switch = function(name, val) {

		design.showSwitch(name, val);

	}

	// 第三部分
	/*
	 *@params e is the event target
	 *@params name is the string name for form data,
	 *@type	 is the type what the name is included
	 *@arr is the default array for the array to string
	*/
	$scope.checkbox = function(e, name, type, arr) {
		// var arr = arr;
		var checked = e.target.checked;

		if (checked) {
			// console.log(jQuery(this).val())
			arr.push(e.target.value)

		} else {
			// alert(1)

			var pos = jQuery.inArray(e.target.value, arr);
			// console.log(pos);

			if (pos >= 0) {
				arr.splice(pos,1);					
			}
		}

		// console.log(arr);
	 $scope.formData[type][name] = arr.join(",");

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