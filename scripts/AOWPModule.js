/**
 * Created by AOWPINS01_01 on 6/26/2015.
 */
angular.module("foodie",['ngRoute','aowpFoodie'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/',{
                templateUrl: 'Home.html'
            }).
            when('/journeys',{
                templateUrl: 'Journeys.html',
                controller: 'journeyCtrl'
            }).
            when('/journeys/details',{
                templateUrl: 'journeys-overview.html',
                controller: 'capstoneController'
            }).
            when('/journeys/details/challenge',{
                templateUrl: 'ChallengeDetail.html',
                controller: 'challengeCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
