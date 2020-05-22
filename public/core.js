var profiler = angular.module('profiler', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/profile/')
        .success(function(data) {
            $scope.profiles = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createProfile = function() {
        $http.post('/profile/', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.profiles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateProfile = function(id) {
        $http.put('/profile/' + id)
            .success(function(data) {
                $scope.profiles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
