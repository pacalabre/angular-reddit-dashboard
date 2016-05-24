var reddItApp = angular.module('reddItApp',[]);

reddItApp.controller( 'reddItCtrl',['$scope', '$http', function($scope, $http){
  $scope.searchTerm = '';
  $scope.postInfo= {
    title: '',
    author: '',
    ups: '',
    comments:'',
    image:''
  };



  $scope.search = function(){
    var req = {
      url:'http://www.reddit.com/search.json?q='+ $scope.searchTerm,
      method:'GET'
    }

    $http(req).then(function success(res) {
      var redditData = res.data.data.children;
      console.log(redditData.length);
      for(var i=0;i<redditData.length;i++){
        $scope.postInfo.title = redditData[i].data.title;
        $scope.postInfo.author = redditData[i].data.author;
        $scope.postInfo.ups = redditData[i].data.ups;
        $scope.postInfo.comments = redditData[i].data.num_comments;
        $scope.postInfo.image = redditData[i].data.thumbnail;
        console.log($scope.postInfo.ups);
      }
      console.log($scope.title);
      console.log(res.data.data.children);
    }, function error(error) {
      console.log(error);
    });
  }
}]);
