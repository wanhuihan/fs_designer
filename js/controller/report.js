
/* ---------------------------
	# report 量房报告页
-----------------------------*/
app.controller("report", function($scope, $http, $location, design, $location, getOrderDetail, $cookies){

	// console.log(getOrderDetail);	
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

			ownerTelPhone: '',

			ownerTelUnit: '',

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
			houseFaultView: [],
			faultViewShow: '',
			faultArr: [],

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
			type: 4,
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
			// 入户门更换为霍曼品牌参考意见
			lrGateHuomanSelOpinion: '',
			// 对玄关是有特殊要求（例如：灯光、色彩、特殊造型等）	
			lrScreenSpec: '',		
		},

		livingRoom:{
			type: 5,
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
			type: 6,
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
			type: 7,
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

			type: 8,
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

			// 存书相关要求具体内容
			libFunSpec: '',
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
			type: 9,
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

			type: 10,
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
			// 对墙、地面材料有无特殊要求
			krColorRequestRequest: '',
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
			type: 11,
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
			type: 12,
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
			type: 13,
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
			type: 14,
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
			type: 15,
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

		}
	}
	
	// 量房时间赋值
	jQuery('#surveyTime').daterangepicker({
		singleDatePicker: true,

	}, function(d) {
		// $scope.formData.generalInfo.ownerSurveyTime = Date.parse(d._d);
	});

	// 量房时间赋值
	jQuery('#decorationTime').daterangepicker({
		singleDatePicker: true,

	}, function(d) {
		// $scope.formData.generalInfo.ownerPlanTime = Date.parse(d._d);
	});

		
	/* -------------------------
		该房屋装修计划投资	start
	---------------------------*/

	$scope.investMPChangeVal = ""; // 该值是为判断是否选中含主材才赋值

	// 判断输入值之后选中含主材则 给 ownerMPlannedInvests 赋值
	$scope.investMPChange = function() {

		if ($scope.investMPChangeVal) {
			$scope.formData.generalInfo.ownerMPlannedInvests = 1;
		} else {
			$scope.formData.generalInfo.ownerMPlannedInvests = 0;
		}
		// if($scope.investMPChangeVal) {
		// 	$scope.formData.generalInfo.ownerMPlannedInvests = $scope.formData.generalInfo.ownerPlannedInvests;

		// } else {
		// 	$scope.formData.generalInfo.ownerMPlannedInvests = "";
		// }	
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

		// $scope.formData.houseBasicInfo.faultArr.push(t.parent(".info_add").find("input").val());
		
		
		// $scope.formData.houseBasicInfo.houseFaultView = $scope.formData.houseBasicInfo.faultArr.join("/*");
		$scope.formData.houseBasicInfo.houseFaultView.push(t.parent(".info_add").find("input").val());
		t.parent(".info_add").find("input").val('');
	}

	// 删除添加的缺陷之处
	$scope.removeFaultList = function(i) {

		// $scope.formData.houseBasicInfo.faultArr.splice(i,1);
		design.removeItem($scope.formData.houseBasicInfo.houseFaultView, i);
		// $scope.formData.houseBasicInfo.houseFaultView = $scope.formData.houseBasicInfo.faultArr.join(",");

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

	// 量房报告初始请求已填数据，获取checkbox部分，重新组合 显示已选
	$scope.showCheckboxData = function(type, name) {

		var lrConsiderSettingOptArr = jQuery("."+name+" input[type='checkbox']");


		if (!$scope.formData[type][name]) {
			var lrConsiderSettingOptVal = [];
		} else {
			var lrConsiderSettingOptVal = eval($scope.formData[type][name]);
		}
		
		for(var i = 0; i < lrConsiderSettingOptArr.length; i++) {

			for ( var a = 0; a < lrConsiderSettingOptVal.length; a++) {
				
				if (jQuery(lrConsiderSettingOptArr[i]).val() == lrConsiderSettingOptVal[a]) {
					
					jQuery(lrConsiderSettingOptArr[i]).attr("checked",true);
				
				}
			}

		}		
	}

	$scope.hasSubmit = '';
	$scope.getData = function() {

		$http({
			method: 'post',
			url: g.host+'/decoration_designer/volumeReport/selectVolumeReportByTaskCode',
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

			// console.log(data);

			if (data.data.volumeList.length == 0) {

				$scope.formData.generalInfo.createName = window.localStorage.fs_design_realName;
				var a = new  Date(); 
				// a.getFullYear(); 
				// a.getMonth(); 
				// a.getDate()
				// 2016年12月24日
				$scope.formData.generalInfo.creatTime = a.getFullYear() + '年' + (a.getMonth()+1) + '月'+a.getDate()+'日'
				return false;

			}

			if (data.code == 10) {

				alert(data.msg);

				return false;

			}

			$scope.hasSubmit = data.data.hasSubmit;

			var obj = data.data.volumeList[0];

			for (var i in obj) {
				for (var a in $scope.formData[i]) {

					if (obj[i].hasOwnProperty(a)) {
						$scope.formData[i][a] = obj[i][a];
					} 
					if (i == 'generalInfo')	{
						$scope.formData[i]['createName'] = obj[i]['createName'];
						$scope.formData[i]['createTime'] = obj[i]['createTime'];
					}			
				}

			}

			var surveyTime = new Date();

			var planTime = new Date();
			
			surveyTime.setTime($scope.formData.generalInfo.ownerSurveyTime);

			planTime.setTime($scope.formData.generalInfo.ownerPlanTime); 

			jQuery("#surveyTime").val(surveyTime.toLocaleDateString());

			jQuery("#decorationTime").val(planTime.toLocaleDateString());

			if ($scope.formData.houseBasicInfo.houseFaultView) {
				$scope.formData.houseBasicInfo.houseFaultView = eval($scope.formData.houseBasicInfo.houseFaultView);
			} else {
				$scope.formData.houseBasicInfo.houseFaultView = [];
			}

			if ($scope.formData.generalInfo.ownerMPlannedInvests == 1) {
				$scope.investMPChangeVal = true;
			} else {
				$scope.investMPChangeVal = false;
			}
			// console.log($scope.formData.houseBasicInfo.houseFaultView)
			if ($scope.formData.houseBasicInfo.houseFaultView) {
				jQuery(".houseFaultView").show();
			}

			if ($scope.formData.houseBasicInfo.houseHeatingChnageView != '') {
				jQuery(".houseHeatingChnageView").show();
			} 

			if ($scope.formData.houseBasicInfo.houseAcBuild == 1) {
				jQuery(".houseAcBuild").show();
			}

			if ($scope.formData.houseBasicInfo.houseWholeCabinetBuild == 1) {
				jQuery(".houseWholeCabinetBuild").show();
			}

			if ($scope.formData.houseBasicInfo.houseWcCeilingTileBuild == 1) {
				jQuery(".houseWcCeilingTileBuild").show();
			}

			if ($scope.formData.houseBasicInfo.houseWcCeilingTileBuild == 1) {
				jQuery(".houseKitTileCeilingBuild").show();
			}

			if ($scope.formData.houseBasicInfo.houseKitTileCeilingBuild == 1) {
				jQuery(".houseKitCeilingStuff").show();
			}

			
			if ($scope.formData.abstruse.lrConsiderSettingOpt) {
				$scope.formData.abstruse.lrConsiderSettingOpt = eval($scope.formData.abstruse.lrConsiderSettingOpt);
			}

			if ($scope.formData.livingRoom.sittingLrMainFun) {
				$scope.formData.livingRoom.sittingLrMainFun = eval($scope.formData.livingRoom.sittingLrMainFun);
			}

			if ($scope.formData.livingRoom.sittingPartyContent) {
				$scope.formData.livingRoom.sittingPartyContent = eval($scope.formData.livingRoom.sittingPartyContent);
			}

			if ($scope.formData.dinningRoom.drUseNumRate) {
				$scope.formData.dinningRoom.drUseNumRate = eval($scope.formData.dinningRoom.drUseNumRate);
			}	

			if ($scope.formData.dinningRoom.drEquipmentOpt) {
				$scope.formData.dinningRoom.drEquipmentOpt = eval($scope.formData.dinningRoom.drEquipmentOpt);
			}			

			if ($scope.formData.readingRoom.libFun) {
				$scope.formData.readingRoom.libFun = eval($scope.formData.readingRoom.libFun);
			}

			if ($scope.formData.readingRoom.libBooksKindNum) {
				$scope.formData.readingRoom.libBooksKindNum = eval($scope.formData.readingRoom.libBooksKindNum);
			}

			if ($scope.formData.readingRoom.libNetworkOpt) {
				$scope.formData.readingRoom.libNetworkOpt = eval($scope.formData.readingRoom.libNetworkOpt);
			}

			if ($scope.formData.mainRoom.brDepotThings) {
				$scope.formData.mainRoom.brDepotThings = eval($scope.formData.mainRoom.brDepotThings);
			}

			if ($scope.formData.mainRoom.brNetworkOpt) {
				$scope.formData.mainRoom.brNetworkOpt = eval($scope.formData.mainRoom.brNetworkOpt);
			}

			if ($scope.formData.kidRoom.krSpecialLightsReuqest) {
				$scope.formData.kidRoom.krSpecialLightsReuqest = eval($scope.formData.kidRoom.krSpecialLightsReuqest);
			}

			if ($scope.formData.guestRoom.roomGrOpt) {
				$scope.formData.guestRoom.roomGrOpt = eval($scope.formData.guestRoom.roomGrOpt);
			}

			if ($scope.formData.guestRoom.roomGrLightingReuqest) {
				$scope.formData.guestRoom.roomGrLightingReuqest = eval($scope.formData.guestRoom.roomGrLightingReuqest);
			}

			if ($scope.formData.balcony.balconyFunRequest) {
				$scope.formData.balcony.balconyFunRequest = eval($scope.formData.balcony.balconyFunRequest);
			}

			if ($scope.formData.additional.addRegionalCulture) {
				$scope.formData.additional.addRegionalCulture = eval($scope.formData.additional.addRegionalCulture);
			}

			if ($scope.formData.additional.addPaintingJewelryHobby) {
				$scope.formData.additional.addPaintingJewelryHobby = eval($scope.formData.additional.addPaintingJewelryHobby);
			}			

			$scope.showCheckboxData('abstruse', 'lrConsiderSettingOpt');
			$scope.showCheckboxData('livingRoom', 'sittingLrMainFun');
			$scope.showCheckboxData('livingRoom', 'sittingPartyContent');
			$scope.showCheckboxData('dinningRoom', 'drUseNumRate');
			$scope.showCheckboxData('dinningRoom', 'drEquipmentOpt');
			$scope.showCheckboxData('readingRoom', 'libFun');
			$scope.showCheckboxData('readingRoom', 'libBooksKindNum');
			$scope.showCheckboxData('readingRoom', 'libNetworkOpt');
			$scope.showCheckboxData('mainRoom', 'brDepotThings');
			$scope.showCheckboxData('mainRoom', 'brNetworkOpt');

			$scope.showCheckboxData('kidRoom', 'krSpecialLightsReuqest');

			$scope.showCheckboxData('guestRoom', 'roomGrOpt');

			$scope.showCheckboxData('guestRoom', 'roomGrLightingReuqest');

			$scope.showCheckboxData('balcony', 'balconyFunRequest');

			$scope.showCheckboxData('additional', 'addRegionalCulture');
			$scope.showCheckboxData('additional', 'addPaintingJewelryHobby');

			if ($scope.formData.abstruse.lrScreenCultureOpt == 1) {
				jQuery(".lrScreenCultureOpt").show();
			}

		}).error(function(data) {
			console.log(data);
		})		
	}

	$scope.getData();
	$scope.roleCode = window.localStorage.fs_design_role_code;
	
	$scope.$watch('hasSubmit', function(val) {
		// console.log(val);
		if (val) {
			jQuery(".report_page_four").show();
		}

	})

	// 第三部分
	/*
	 * @params e is the event target
	 * @params name is the string name for form data,
	 * @type	 is the type what the name is included
	 * @arr is the default array for the array to string
	*/
	$scope.checkbox = function(e, name, type, arr) {
		// var arr = arr;
		var checked = e.target.checked;

		if (!$scope.formData[type][name]) {
			arr = [];
		} else {
			arr = eval($scope.formData[type][name]);
		}	

		if (checked) {
	
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
	 $scope.formData[type][name] = arr;

	}

	var step = angular.element(document.getElementsByClassName("step"));
	var stepCont = angular.element(document.getElementsByClassName("step_content"));

	// 当前第几步骤
	$scope.currentStep = "";

	// 显示当前步骤的表单内容
	for (var i = 0; i < step.length; i++) {

		if (angular.element(step[i]).hasClass("current")) {
			$scope.currentStep = angular.element(step[i]).attr("id");

			if(stepCont[i].getAttribute("content") == $scope.currentStep) {
				angular.element(stepCont[i]).addClass("show");
			}			

		}
	}

	// 下一步操作的时候进行判断显示下一步的样式和内容
	$scope.nextStep = function(step) {

		console.log($scope.formData.generalInfo.createTime, $scope.formData.generalInfo.createName);
		
		if (step == 'step_1') {

		}

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
			$scope.formData.generalInfo.ownerSurveyTime = Date.parse(jQuery("#surveyTime").val());
			$scope.formData.generalInfo.ownerPlanTime = Date.parse(jQuery("#decorationTime").val());
			
		}

		$http({
			url: g.host+'/decoration_designer/volumeReport/addVolumeReport',
			method: 'post',
			data: {
				volumeReportJson: $scope.formData,
				decorationTaskCode: $scope.orderCode,
				status: 0,
				token: $cookies.fs_designer_token
			},

	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {

	                    var jsonStr = [];

	                    for (i in obj[p]) {
	                    	jsonStr.push(JSON.stringify(obj[p][i]));
	                    }

	                    str.push(encodeURIComponent(p) + "= {data:[" + jsonStr.join(",") + ']}');
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    

	            // console.log(str.join("&"))  
	            return str.join("&");  

	        }			
		}).success(function(data) {
			// $scope.getData();
			console.log('success');
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

	$scope.subReport = function() {

		$http({
			url: g.host+'/decoration_designer/volumeReport/addVolumeReport',
			method: 'post',
			data: {
				volumeReportJson: $scope.formData,
				decorationTaskCode: $scope.orderCode,
				status: 1,
				token: $cookies.fs_designer_token
			},

	        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
	        
	        transformRequest: function(obj) {    
	            var str = [];    
	            for (var p in obj) {    
	                
	                if (typeof obj[p] == 'object' ) {

	                    var jsonStr = [];

	                    for (i in obj[p]) {
	                    	jsonStr.push(JSON.stringify(obj[p][i]));
	                    }

	                    str.push(encodeURIComponent(p) + "= {data:[" + jsonStr.join(",") + ']}');
	                } else {
	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
	                }                     
	            }    
	            // console.log(str.join("&"))  
	            return str.join("&");  

	        }			
		}).success(function(data) {
			// console.log(data);
			$scope.hasSubmit = true;
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
				}).success(function(data) {})	
			}

		})		
	}

})