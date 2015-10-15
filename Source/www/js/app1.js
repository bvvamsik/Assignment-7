var app=angular.module("myApp", []);



app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike) {

$scope.pageClass = 'register';
$scope.register = function(uname, fname, lname, pword, email) {
   console.log("inside login function");
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ',
    data: JSON.stringify({
                username: uname,
                firstname: fname,
                lastname: lname,
                password: pword,
                email: email
            }),
    contentType: "application/json"
}).success(function() {    
    alert($scope.fname+" - User Registered Successfully");
    $scope.uname ="";
    $scope.pword ="";
    $scope.email ="";
    $scope.lname="";
    $scope.fname="";
        })
}
    
})

.controller('RegisterCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window) {
    //api key : txrusPCK4DZrtU0mq2_bsKgxb2FgvGyP
    // https://api.mongolab.com/api/1/databases/facecomv1/collections/users?apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ
    console.log("RegisterCtrl: Started controller");
    
    $scope.removeUser = function(uname, pword) {
        console.log("RegisterCtrl: removeUser: Entered with: " + uname + ", " + pword);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&f={"password":1,"_id":1}&fo=true&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ'
        })
        .success(function(data) {
            console.log("RegisterCtrl: removeUser: Found "+data.password+", "+data._id.$oid);
            if (data.password == pword) {
                $http({
                    method: 'DELETE',
                    url: 'https://api.mongolab.com/api/1/databases/facecomv1/collections/'+data._id.$oid+'?apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ',
                    async: true
                })
                .success(function() {
                    $scope.displayRMsg = "User "+uname+" has been removed";
                })
                .error(function() {
                    alert("Failed to remove user");
                });
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to find user '+uname);
        });
        console.log("RegisterCtrl: removeUser: Finished");
    };
    
    $scope.loginUser = function(uname, pword) {
        console.log("RegisterCtrl: loginUser: Entered with: " + uname + ", " + pword);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&f={"password":1}&fo=true&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ'
        })
        .success(function(data) {
            if (data.password == pword) {
                $window.location.href = "/index.html";
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to authenticate user '+uname);
        });
        console.log("RegisterCtrl: loginUser: Finished");
    };
    
    $scope.changeEmail = function(uname, pword, newemail) {
        console.log("RegisterCtrl: changeEmail: Entered with: " + uname + ", " + pword + ", " + newemail);
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&f={"_id":1}&fo=true&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ'
        })
        .success(function(dat) {
            console.log("RegisterCtrl: changeEmail: found user");
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ',
                    data: JSON.stringify({ "$set" : { "email": newemail } }),
                    contentType: 'Application/json'
                })
                .success(function() {
                    $scope.displayEMsg = "Email changed";
                })
                .error(function() {
                    alert('Failed to update email');
                });
        })
        .error(function() {
            alert('Failed to find existing info for ' + uname);
        });
        console.log("RegisterCtrl: changeEmail: Finished");
    };
    
    $scope.changePword = function(uname, oldpass, newpass, newpass2) {
        console.log("RegisterCtrl: changePword: Entered with: " + uname + ", " + oldpass + ", " + newpass + ", " + newpass2);
        if (newpass != newpass2) {
            alert('New passwords do not match');
            return;
        }
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&f={"password":1}&fo=true&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ'
        })
        .success(function(dat) {
            if (dat.password == oldpass) {
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/facecomv1/collections/users?q={"name":"'+uname+'"}&apiKey=osDL6aZehdu2rFRlWBc6z2HhoStllGkZ',
                    data: JSON.stringify({ "$set" : { "password": newpass } }),
                    contentType: 'Application/json'
                })
                .success(function() {
                    $scope.displayMsg = "Password changed";
                })
                .error(function() {
                    alert('Failed to update password');
                });
                        
            } else {
                alert('Old password is invalid');
            }
        })
        .error(function() {
            alert('Failed to authenticate existing info for ' + uname);
        });
        console.log("RegisterCtrl: changePword: Finished");
    };


});

