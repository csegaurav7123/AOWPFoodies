/**
 * Created by AOWPINS01_01 on 6/24/2015.
 */
var name;
function onSignInCallback(resp) {
    //alert(resp);

    gapi.client.load('plus', 'v1', apiClientLoaded);
}

/**
 * Sets up an API call after the Google API client loads.
 */
function apiClientLoaded() {

    gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
}

/**
 * Response callback for when the API client receives a response.
 *
 * @param resp The API response object with the user email and profile information.
 */
function handleEmailResponse(resp) {

    var primaryEmail;
   name=new Array(resp.displayName,resp.image.url);

   // name.push(resp.displayName);
   // name.push(resp.image.url);
//name={ "user":resp.displayName,    "image":resp.image.url};

    for (var i=0; i < resp.emails.length; i++) {
        if (resp.emails[i].type === 'account') primaryEmail = resp.emails[i].value;
    }
    document.getElementById('responseContainer').value = 'Primary email: ' +
        primaryEmail + '\n\nFull Response:\n' + JSON.stringify(resp);
}


//====================Angular Part===================
angular.module('login',[]);
angular.module('login')
    .controller("googleController", function($scope,$http){
        /**
         * Handler for the signin callback triggered after the user selects an account.
         */

        var userDetails = name.split(',');
        $scope.name = userDetails[0];
       $scope.imageUrl = userDetails[1];
        //$http.get(name).then(function(response){
        //    $scope.details = response.data;
        //});
        //alert($scope.details);
    })
