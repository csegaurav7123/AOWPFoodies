/**
 * Created by AOWPINS01_01 on 6/23/2015.
 */
var app= angular.module('capstoneApp',['ngRoute','ngPiechart']);

app.controller('capstoneController', function($scope, $http,$sce,$filter) {
    $scope.active={};
    $scope.range=new Array(5);
    $http.get("data/challenges.json")
        .success(function(response)
        {
            $scope.journeys = response;
            $scope.active.activeClass=response[0].Cuisine;
        });
    $scope.trustSrc = function(address) {
        $scope.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyDeesusO5tFgcZ-HET_3hFKfuZtfxNprCk&q="+address;
        return $sce.trustAsResourceUrl($scope.mapUrl);
    };
    $scope.activeClass='active';
    $scope.getTabOpen=function(tab){
        $scope.active.activeClass=tab;
        $scope.tabName=tab;
    };
    $scope.typeFilter="Most Recent";
    $scope.filterByType=function(type){
        $scope.typeFilter=type;
    }
}).controller('piechart',  function($scope){

        $scope.chart2 = [{
            value:8000,
            color:'#FF0000'
        },{
            value:500,
            color:'#FF6347'
        }];
        $scope.config = {

            lineWidth:10,
            lineColor:'transparent'
        }

    });