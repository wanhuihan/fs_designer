

app.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.when("", "login")

    // 登录界面
    $stateProvider.state('/', {
        url: '/login',
        resolve: {

        },

        views: {
            'mainBody': {
                templateUrl: 'templates/login.html',
                // controller: 'navigation'
                controller: function($scope, $location) {
                    if (document.cookie.indexOf('fs_designer_token') > 0 ) {
                        $location.path("/dashboard");
                    } else {
                        // $location.path("");
                    }                
                }
            },
        },
    })

    // 主面板
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        resolve: {

        },

        views: {
            'header': {
                templateUrl: 'templates/header.html',
                controller: 'header'
            },

            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',

            // },

            'mainBody': {
                templateUrl:'templates/dashboard.html', 
                // templateUrl: 'templates/main_body.html',
                // controller: 'navigation'
                controller: 'dashboard'
                },
        },
    })

    // 订单列表
    $stateProvider.state("dashboard.orders", {
        url: '/orders',
        resolve: {

        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/myOrders.html',
                controller: 'orders'
            },
            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',
            //     template: ''
            // },            
        }
    })

    // 订单详情
    $stateProvider.state("dashboard.orders.details", {
        url: '/details?id&code',
        resolve: {

        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/myOrderDetails.html',
                controller: 'orderDetails'
            },
            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',
            //     template: ''
            // },            
        }
    })

    // 工程量
    $stateProvider.state("dashboard.orders.workload", {
        url: '/workload?id&code',
        resolve: {

        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/workLoad.html',
                controller: 'workLoad'
            },
            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',
            //     template: ''
            // },            
        }
    })

    // 量房报告
    $stateProvider.state("dashboard.orders.report", {

        url: '/report?id&code',

        resolve: {
            getOrderDetail: function($http, $location, $cookies) {
                // return $http({
                //     method: 'post',
                //     url: g.host+'/decoration_designer/decorationTask/order/view',
                //     data: {
                //         decorationTaskCode: $location.search().code,
                //         token: $cookies.fs_designer_token
                //     }
                // })
            }
        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/report.html',
                controller: 'report'
            }
        }

    })
    // 物料清单

    $stateProvider.state("dashboard.orders.bom", {

        url: '/bom?id&code',

        views: {
            "mainBody@": {
                templateUrl: 'templates/bom.html',
                controller: 'bom'
            }
        }

    })
    // 设计图
    $stateProvider.state("dashboard.orders.design", {

        url: '/design?id&code',

        views: {
            "mainBody@": {
                templateUrl: 'templates/design.html',
                controller: 'design'
            }
        }

    })

    // 成本控制单
    $stateProvider.state("dashboard.orders.costForm", {

        url: '/costForm?id&code',

        views: {
            "mainBody@": {
                templateUrl: 'templates/costForm.html',
                controller: 'costForm'
            }
        }

    })


    // 物料清单
    $stateProvider.state("dashboard.material", {
        url: '/material?id&code',

        views: {
            "mainBody@": {
                templateUrl: 'templates/material.html'
            }
        }
    })



    // 账户列表
    $stateProvider.state("dashboard.myAccount", {
        url: '/myAccount',
        resolve: {

        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/myAccount.html',
                controller: 'myAccount'
            },
            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',
            //     template: ''
            // },            
        }
    })


    //  图库
    $stateProvider.state("dashboard.gallery", {
        url: '/gallery',
        resolve: {

        },

        views: {
            "mainBody@": {
                templateUrl: 'templates/gallery.html',
                controller: 'gallery'
            },
            // 'sideBar': {
            //     // templateUrl: 'templates/sideBar.html',
            //     template: ''
            // },            
        }
    })






})