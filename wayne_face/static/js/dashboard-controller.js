let app = angular.module('headlightChallenge', [])

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.controller('dashboardController', function($scope, $http) {
  console.log('started')
  $http.defaults.xsrfCookieName = 'csrftoken';
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';

  $scope.reportPhoto = function(pk) {
    $http.post('/report_photo/', {pk: pk}).then(
      function success(response) {
        window.location.reload(false);
      },
      function error(response) {
        console.log(response.data);
      }
    )
  }

  $scope.submitPhoto = function() {
    console.log($scope.image)
    $http.post('/submit_photo/', {image: $scope.image}).then(
      function success(response) {
        window.location.reload(false);
      },
      function error(response) {
        console.log(response.data);
      }
    )
  }



});
