app.controller('promotableQuestionCtrl', function($rootScope, $scope, $stateParams, $ionicModal, $ionicPopup, modalService, apiService, errorService, classesService) {
  $scope.questionId = $stateParams.promotableId;

  $scope.postCommentObj = {};
  $scope.question = {};

  $rootScope.toConsole('$scope.questionId', $stateParams.promotableId);
  $rootScope.spinIt = true;

  $scope.init = function(){

    $scope.updateQuestions();

  };



  $scope.updateQuestions = function (){

    apiService.getQuestion($scope.questionId).then(function(result) {
      var question = result.data;
      $rootScope.spinIt = false;
      $rootScope.toConsole('question received', question)
      $scope.question = question;
    }, function(err) {
      errorService.dealWithError(err);
      $rootScope.spinIt = false;
    })

  };
    

  $scope.postComment = function (){

    var newComment = new classesService.comment({
      text: $scope.postCommentObj.comment,
    })

    $scope.postCommentObj.comment && apiService.postComment($scope.question, newComment).then(function(result){
      // $scope.question.comments.push(newComment);
      return apiService.getQuestion($scope.questionId);
      
    }).then(function(result){
      $scope.question = result.data;
      $scope.postCommentObj.comment = '';
    });
  };

  modalService.initAreYouSureModal($scope);

  $scope.commentOptions = {

    remove: function(question, comment){
      
      $ionicPopup.confirm({
        title: 'Are you sure you want to remove this comment?',
        //template: 'No Connection Found.'

      }).then(function(confirmed){
        if(confirmed){

          apiService.deleteComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })


        }
      });

    },

    edit: function(question, comment){
      comment.isEditing = true;
    },

    cancelEdit: function(question, comment){
      comment.isEditing = false;
    },

    save: function(question, comment){
      
          comment.isEditing = undefined;
          apiService.putComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })



    },

    report: function(question, comment){
      
      $ionicPopup.confirm({
        title: 'Are you sure you want to report this comment for being inappropriate?',
        //template: 'No Connection Found.'

      }).then(function(confirmed){
        if(confirmed){

          apiService.reportComment(question, comment).then(function(apiRes){
            $scope.updateQuestions();
          })


        }
      });

    },

  }

  $scope.init();




  
})