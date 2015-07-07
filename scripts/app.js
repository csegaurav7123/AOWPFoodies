angular.module('aowpFoodie', ['ngPiechart']);
angular.module("aowpFoodie")
.controller('piechart',  function($scope){

   /* $scope.chart1 = [{
        value:8000,
        color:'#42B4E6'
    },{
        value:9500,
        color:'#FF9797'
    },{
        value:1000,
        color:'#8BFEA8'
    },{
        value:3000,
        color:'#FFFFB5'
    }];*/

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
