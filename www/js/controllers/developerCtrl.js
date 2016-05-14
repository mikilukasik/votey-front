app.controller('developerCtrl', function($rootScope, $scope, $ionicModal, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    
  });
  
  $ionicModal.fromTemplateUrl('templates/clearDb.html', {
      scope: $scope
  }).then(function(modal) {
      $scope.clearDbModal = modal;
  });

  $scope.clearDb = function(){
  	apiService.clearDb().then(function(){
  		$scope.closeClearDbModal();
  	},function(err){
  		errorService.dealWithError(err);
  	})
  	
  };

  $scope.prepareToClearDb = function(){

        $scope.clearDbModal.show();
   
  };

  $scope.closeClearDbModal = function() {
        $scope.clearDbModal.hide();
    };

  $scope.addCredit= function(amount){
    apiService.addCredit(amount).then(function(resp){
      $rootScope.myCredit = resp.data;
      $scope.addCreditAmount = '';
    })
  };

})