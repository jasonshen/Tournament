let app = angular.module('headlightChallenge', [])

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('loginController', function($scope, $http) {
  $scope.loginUser = {}
  $http.defaults.xsrfCookieName = 'csrftoken';
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';

  $scope.login = function() {
    console.log("Logging in");
    $http.post('/login/', $scope.loginUser).then(
      function success(response) {
        if (response.data.status == 'success') {
          window.location.href="/dashboard/"
        }
        else {
          $scope.loginError = true;
        }
      },
      function error(response) {
        console.log(response.data);
      }
    )
  }
});
