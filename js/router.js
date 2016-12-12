

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/")

    $stateProvider.state('/', {
        url: '/',
        resolve: {

        },

        views: {
            'topNav': {
                templateUrl: 'templates/header.html',
                // controller: 'navigation'
                },
        },
    })

})