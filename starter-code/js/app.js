var reddItApp = angular.module('reddItApp',['ngStorage']);

reddItApp.controller( 'reddItCtrl',['$scope', '$http', '$localStorage', function($scope, $http, $localStorage){
  $scope.searchTerm = '';
  $scope.postInfo=[];
  $scope.history=[];

  var searchHistory = {
      search: $scope.searchTerm
    }

  $scope.search = function(term){
    if (term) {
      $scope.searchTerm = term;
    }
    $scope.saveData();
    console.log($scope.searchTerm)
    var req = {
      url:'http://www.reddit.com/search.json?q='+ $scope.searchTerm,
      method:'GET'
    }

    $http(req).then(function success(res) {
      console.log($scope.searchTerm)
      $scope.history.push($scope.searchTerm);

      var redditData = res.data.data.children;
      $scope.postInfo = [];
      for(var i=0;i<redditData.length;i++){
        $scope.postInfo.push(redditData[i].data)
        console.log($scope.postInfo)
      }
    }, function error(error) {
      console.log(error);
    });
  }

  $scope.saveData = function() {

    // var searchHistory = {
    //   search: $scope.searchTerm
    // }
    $localStorage.searchHistory = searchHistory;
  }

    $scope.deleteFromLocalStorage = function(item) {
      $localStorage.searchHistory.splice($localStorage.searchHistory.indexOf(item), 1);
      localStorage.removeItem(item);

      // $localStorage.searchHistory.splice(id,1);
      // delete $localStorage;

    }

  var init = function() {
    $scope.searchHistory = $localStorage.searchHistory;
  }
  init();
}]);
