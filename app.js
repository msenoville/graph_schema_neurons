(function() {

'use strict';

window.bbpConfig =  {
    api: {
        user: {
            v0: "https://services.humanbrainproject.eu/oidc/v0/api",
            v1: "https://services.humanbrainproject.eu/idm/v1/api"
        },
        collab: {
            v0: "https://services.humanbrainproject.eu/collab/v0"
        }
    },
    auth: {
        url: "https://services.humanbrainproject.eu/oidc",
        clientId: "16b18a87-668d-42a3-9d59-497a127c006a"
    },
    oidc: {
        debug: false
    }
}

var graphSchemaApp = angular.module('graphSchemaApp',
                                   ['ui.router',
                                    'ngFileSaver',
                                    'ngSanitize',
                                    'ui.bootstrap',
                                    'angularModalService',
                                    'jobService',
                                    'bbpOidcClient',
                                    'clb-identity',
                                    'clb-collab']);


graphSchemaApp.config(function($stateProvider, $urlRouterProvider, bbpOidcSessionProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: 'graphController'
        })

        // // nested list with custom controller
        // .state('home.list', {
        //     url: '/list',
        //     templateUrl: 'partial-home-list.html',
        //     controller: function($scope) {
        //         $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        //     }
        // })

        // // nested list with just some random string data
        // .state('home.paragraph', {
        //     url: '/paragraph',
        //     template: 'I could sure use a drink right now.'
        // })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

    // set to true if missing token should automatically redirect to login page.
    bbpOidcSessionProvider.alwaysPromptLogin(true);
    // set to true if the app should ensure a valid token is present before displaying the page.
    bbpOidcSessionProvider.ensureToken(true);
});

})();