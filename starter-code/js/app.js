var reddItApp = angular.module('reddItApp',[]);

reddItApp.controller( 'reddItCtrl',['$scope', '$http', function($scope, $http){
  $scope.searchTerm = '';
  $scope.postInfo=[];
  $scope.history=[];

  $scope.search = function(){
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
}]);
