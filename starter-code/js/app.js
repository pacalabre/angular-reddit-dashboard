var reddItApp = angular.module('reddItApp',['ngStorage']);

reddItApp.controller( 'reddItCtrl',['$scope', '$http', '$localStorage', function($scope, $http, $localStorage){
  $scope.searchTerm = '';
  $scope.postInfo=[];
  $scope.history=[];

  $scope.search = function(){
    $scope.saveData();

    var req = {
      url:'http://www.reddit.com/search.json?q='+ $scope.searchTerm,
      method:'GET'
    }

    $http(req).then(function success(res) {

      $scope.history.push($scope.searchTerm);
      console.log("history = "+$scope.history);
      var redditData = res.data.data.children;
      for(var i=0;i<redditData.length;i++){
        $scope.postInfo.push(redditData[i].data)
        console.log($scope.postInfo)
      }
    }, function error(error) {
      console.log(error);
    });
  }

  $scope.saveData = function() {

    var searchHistory = {
      search: $scope.searchTerm
    }
    $localStorage.searchHistory = searchHistory;
  }

  var init = function() {
    $scope.searchHistory = $localStorage.searchHistory;
  }
  init();
}]);
