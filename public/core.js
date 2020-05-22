var profiler = angular.module('profiler', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.step = 1;
    $scope.showForm = false;
    $scope.isUpdate = false;
    $scope.profileId = "";

    $scope.nextStep = function() {
        $scope.step++;
    }

    $scope.prevStep = function() {
        $scope.step--;
    }

    $scope.setStep = function(step) {
      $scope.step = step;
    }

    $scope.toggleShowForm = function() {
      $scope.showForm = !$scope.showForm;
    }

    $scope.setIsUpdate = function(profile) {
      $scope.formData = profile;
      $scope.showForm = true;
      $scope.isUpdate = true;
      $scope.profileId = profile._id;
    }

    $http.get('/profile/')
        .success(function(data) {
            $scope.profiles = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createProfile = function() {
        $http.post('/profile/', $scope.formData)
            .success(function(data) {
                $scope.profile = data.profile;
                $scope.profiles = data.profiles;
                $scope.formData = {};
                $scope.step = 1;
                $scope.showForm = false;
                $scope.isUpdate = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateProfile = function(id) {
        $http.put('/profile/', { id, update: $scope.formData})
            .success(function(data) {
                $scope.formData = {};
                $scope.profiles = data.profiles;
                $scope.formData = {};
                $scope.step = 1;
                $scope.showForm = false;
                $scope.isUpdate = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
