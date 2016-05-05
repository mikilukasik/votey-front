app.controller('promotablesCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getPromotableQuestions()
  });
  $scope.getPromotableQuestions = function() {
    $rootScope.spinIt = true;
    return apiService.getPromotables().then(function(res) {
      $rootScope.spinIt = false;
      $rootScope.promotables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };

  $scope.doRefresh = function() {
    $scope.getPromotableQuestions()
     .then(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
   };

  


})