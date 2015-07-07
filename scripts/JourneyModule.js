
angular.module('aowpFoodie',['ngRoute','ngPiechart']);
angular.module("aowpFoodie") .controller('capstoneController', function($scope, $http,$sce,$filter,$location) {
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
    $scope.continueClicked = function(){
        console.log("hello");
        $location.path("/journeys/details/challenge");
    }
    $scope.getTabOpen=function(tab){
        $scope.active.activeClass=tab;
        $scope.tabName=tab;
        console.log($scope.tabName);
        $scope.chart2 = [{
            value:8000,
            color:'#FF0000'
        },{
            value:500,
            color:'#FF6347'
        }];
        $scope.config = {

            lineWidth:10,
            lineColor:'red'
        }

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

})
.controller("journeyCtrl",function($scope, $http, journeyService, userService, $location){
        this.$inject = ['$scope','$http', 'journeyService', 'userService', '$location'];
        userService.getUserDetails()
            .then(function(data){
                $scope.userDetails= data;
                $scope.validateUser = function(){

                    if(($scope.username=="gaurav1125")&&($scope.password=="aowp123"))
                    {
                        $scope.validUser=true;
                        $location.path("/journeys");
                        var myEl = angular.element( document.querySelector( '#loginButton' ) );
                        myEl.attr('data-dismiss','modal');
                        journeyService.getJourneys()
                            .then(function(data){
                                $scope.journeys= data;
                            });

                    }
                    else{
                        alert("Invalid Credentials");
                    }
                }
            });

        $scope.journeySelected = function(){

            $location.path("/journeys/details");

        }
    }).controller("challengeCtrl", function($scope,journeyDetailsService){

        $scope.rating=[];
        $scope.ratingEmpty=[];
        journeyDetailsService.getjourneyDetails()
            .then(function(data){
                $scope.AmericanChallenges=data[0];
                $scope.markBtnText="Mark as Started";
                var completedCount;
                $scope.completeFlag = false;
                $scope.startFlag = false;
                for(var i=0;i<$scope.AmericanChallenges.Dishes.length;i++)
                {
                    if($scope.AmericanChallenges.Dishes[i].Status=="Started")
                    {
                        completedCount=i;
                    }
                }

                $scope.index=completedCount;
                startCompleteStatus();
                $scope.prevChallenge= function(){
                    if($scope.index!=0)
                    {
                        $scope.index= $scope.index - 1;
                    }
                    if($scope.index<completedCount)
                    {
                        $(".nextBtn").removeAttr("disabled");
                    }
                    if($scope.index==0){
                        $("#prevButton").attr('disabled','disabled');
                    }
                    startCompleteStatus();

                }
                $scope.nextChallenge= function(){



                        $scope.index= $scope.index + 1;

                    if($scope.index>0){
                        $("#prevButton").removeAttr("disabled");
                    }
                    if($scope.index==completedCount)
                    {
                        $(".nextBtn").attr('disabled','disabled');
                    }

                    startCompleteStatus();

                }
                function startCompleteStatus()
                {
                    $scope.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyDeesusO5tFgcZ-HET_3hFKfuZtfxNprCk&q="+$scope.AmericanChallenges.Dishes[$scope.index].RestaurantList[0].Address;
                    $("#mapDiv").attr("src",$scope.mapUrl);
                    //console.log($scope.mapUrl);
                    var imgUrl='url('+$scope.AmericanChallenges.Dishes[$scope.index].RestaurantList[0].imageUrl+')'
                    console.log(imgUrl);
                    $("#foodDiv").css('background-image',imgUrl);
                   // console.log($scope.AmericanChallenges.Dishes[$scope.index].RestaurantList[0].imageUrl);
                    $scope.rating=[];
                    $scope.ratingEmpty=[];
                    for(var i=0; i<$scope.AmericanChallenges.Dishes[$scope.index].RestaurantList[0].Rating;i++)
                {
                    $scope.rating.push(i);
                }
                    for(var j=5;j>$scope.rating.length;j--)
                    {
                        $scope.ratingEmpty.push(j);
                    }
                    if($scope.AmericanChallenges.Dishes[$scope.index].Status=="Completed"){

                        $("#markBtn").css("background-color", "#d0d0d0");
                        $scope.markBtnText="Way to go! Take the next challenge";
                        $scope.completeFlag = true;
                        $scope.startFlag = false;
                        $scope.startCompleteLabel="COMPLETED";
                        $(".nextBtn").removeAttr("disabled");
                        $(".nextBtn").css("background-color", "#00bfff").css("color","#ffffff");
                    }
                    if($scope.AmericanChallenges.Dishes[$scope.index].Status=="Started"){
                        $("#markBtn").css("background-color", "#00bfff");
                        $scope.markBtnText="Mark as Completed";
                        $scope.startFlag = true;
                        $scope.completeFlag = false;
                        $scope.startCompleteLabel="STARTED";
                        $(".nextBtn").attr('disabled','disabled');
                        $(".nextBtn").css("background-color", "#d0d0d0");
                    }
                    if($scope.AmericanChallenges.Dishes[$scope.index].Status=="Pending"){

                        $("#markBtn").css("background-color", "orangered");
                        $scope.markBtnText="Mark as  Started";
                        $scope.completeFlag = false;
                        $scope.startFlag = false;
                        $scope.startCompleteLabel=" ";
                        $(".nextBtn").attr('disabled','disabled');
                        $(".nextBtn").css("background-color", "#d0d0d0");
                    }
                }
            });
        $scope.alterMarkText = function(){
            console.log($scope.markBtnText);
            if($scope.markBtnText=="Mark as Started")
            {
                console.log("hello");
                $("#markBtn").css("background-color", "#00bfff");
                $scope.markBtnText="Mark as Completed";
                $scope.startFlag = true;
                $scope.startCompleteLabel="STARTED";
            }
            else if($scope.markBtnText=="Mark as Completed")
            {
                $("#markBtn").css("background-color", "#d0d0d0");
                $scope.markBtnText="Way to go! Take the next challenge";
                $scope.completeFlag = true;
                $scope.startCompleteLabel="COMPLETED";
                $(".nextBtn").removeAttr("disabled");
                $(".nextBtn").css("background-color", "#00bfff").css("color","#ffffff");
            }
        }

        //$scope.prevChallenge= function(){
        //    if($scope.index!=0)
        //    {
        //        $scope.index= $scope.index - 1;
        //    }
        //    if($scope.index==0)
        //    {
        //        $(".nextBtn").removeAttr("disabled");
        //    }
        //
        //}
        //$scope.nextChallenge= function(){
        //    alert("next");
        //
        //    if($scope.index!=0)
        //    {
        //        $scope.index= $scope.index + 1;
        //    }
        //    if($scope.index==2)
        //    {
        //        $(".nextBtn").attr("disabled")
        //    }
        //
        //}
    }).service('journeyService',function($http){
        this.getJourneys = getJourneys;
        function getJourneys(){
            return $http.get("data/GauravJourney.json")
                .then(completed)
                .catch(failed);
        }
        function completed(response){
            return response.data;
        }
        function failed(error) {
            return error.statusText;
        }

    }).service('userService',function($http){
        this.getUserDetails = getUserDetails;
        function getUserDetails(){
            return $http.get("data/userDetails.json")
                .then(completed)
                .catch(failed);
        }
        function completed(response){
            return response.data;
        }
        function failed(error) {
            return error.statusText;
        }

    }).service('journeyDetailsService',function($http){
        this.getjourneyDetails = getjourneyDetails;
        function getjourneyDetails(){
            return $http.get("data/challenges.json")
                .then(completed)
                .catch(failed);
        }
        function completed(response){
            return response.data;
        }
        function failed(error) {
            return error.statusText;
        }

    });