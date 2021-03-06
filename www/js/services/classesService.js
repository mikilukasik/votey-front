app.factory('classesService', function($rootScope) {
  return {
    
    comment: function(initObj){

      var comment = this;

      comment.text = '';
        
      comment.reportedBy = [];
      comment.approvedBy = [];
      comment.disapprovedBy = [];

      comment.verified = false;
      comment.addedBy = $rootScope.clientMongoId;

      comment.questionId = null;

      if(initObj) for (var key in initObj) {
        comment[key] = initObj[key];
      };

    }   
 
  };
})