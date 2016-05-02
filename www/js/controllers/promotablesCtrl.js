app.controller('promotablesCtrl', function($rootScope, $scope, apiService, errorService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.getPromotableQuestions()
  });
  $scope.getPromotableQuestions = function() {
    $rootScope.spinIt = true;
    apiService.getPromotables().then(function(res) {
      $rootScope.spinIt = false;
      $scope.promotables = res.data;
    }, function(err) {
      $rootScope.spinIt = false;
      errorService.dealWithError(err);
    });
  };

  $rootScope.promote = {
    up: function(question) {
      $rootScope.spinIt = true;
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: true
      }).then(function(res) {
        $rootScope.spinIt = false;
        
        if(res.success){
          if(question.previousPromotion === 'down') question.promoteDown--;
          question.promoteUp++;
          question.previousPromotion = 'up';
        }

        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    down: function(question) {
      $rootScope.spinIt = true;
      apiService.postPromotion({
        clientMongoId: $rootScope.clientMongoId,
        questionId: question._id,
        promoting: false
      }).then(function(res) {
        $rootScope.spinIt = false;

        if(res.success){
          if(question.previousPromotion === 'up') question.promoteUp--;
          question.promoteDown++;
          question.previousPromotion = 'down';
        }
        
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    escalate: function(question) {
      $rootScope.spinIt = true;
      apiService.escalateQuestion(question._id).then(function(res) {
        $rootScope.spinIt = false;
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    }
  };


})