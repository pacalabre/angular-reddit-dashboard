var reddItApp = angular.module('reddItApp',[]);
reddItApp.controller( 'reddItCtrl',['$scope', '$http', function($scope, $http){

  $scope.search = function(){
    var req = {
      url:'http://www.reddit.com/search.json?q='+ $scope.searchTerm,
      method:'GET'
    }

    $http(req).then(function success(res) {
      var redditData = res.data.data.children;
      console.log(res.data.data.children);
    }, function error(error) {
      console.log(error);
    });
  }
}]);
