var reddItApp = angular.module('reddItApp',['ngStorage']);

reddItApp.controller( 'reddItCtrl',['$scope', '$http', '$localStorage', function($scope, $http, $localStorage){
  $scope.searchTerm = '';
  $scope.postInfo=[];
  $scope.history=[];
  if($localStorage.history){
    $scope.history=$localStorage.history;
  }
  console.log($localStorage);

  var searchHistory = {
      search: $scope.searchTerm
    }

  $scope.search = function(term){
    if (term) {
      $scope.searchTerm = term;
    }
    var req = {
      url:'http://www.reddit.com/search.json?q='+ $scope.searchTerm,
      method:'GET'
    }

    $http(req).then(function success(res) {
      $scope.history.push($scope.searchTerm);
      $scope.saveData();
      var redditData = res.data.data.children;
      $scope.postInfo = [];
      for(var i=0;i<redditData.length;i++){
        $scope.postInfo.push(redditData[i].data)
      }
    }, function error(error) {
      console.log(error);
    });
  }

  $scope.saveData = function() {
    $localStorage.history = $scope.history;
    console.log($localStorage);
  }

  $scope.deleteFromLocalStorage = function(item) {
    $scope.history.splice(item, 1);
    $scope.saveData();
  }

  var init = function() {
    $scope.searchHistory = $localStorage.searchHistory;
  }
  init();
}]);
