

app.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.when("/", "login")

    // 登录界面
    $stateProvider.state('/', {
        url: '',
        resolve: {

        },

        views: {
            'mainBody': {
                templateUrl: 'templates/login.html',
                // controller: 'navigation'
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
                templateUrl: 'templates/header.html'
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

        views: {
            "mainBody@": {
                templateUrl: 'templates/report.html',
                controller: 'report'
            }
        }

    })
    // 物料清单

    $stateProvider.state("dashboard.orders.bom", {

        url: '/bom?id',

        views: {
            "mainBody@": {
                templateUrl: 'templates/bom.html',
                controller: 'bom'
            }
        }

    })
    // 设计图
    $stateProvider.state("dashboard.orders.design", {

        url: '/design?id',

        views: {
            "mainBody@": {
                templateUrl: 'templates/design.html',
                controller: 'design'
            }
        }

    })


    // 物料清单
    $stateProvider.state("dashboard.material", {
        url: '/material?id',

        views: {
            "mainBody@": {
                templateUrl: 'templates/material.html'
            }
        }
    })

})