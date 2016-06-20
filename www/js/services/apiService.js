app.factory('apiService', function($http, $filter, $rootScope, $q) {
  return {
    
    postComment: function(questionObj, comment){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions/' + questionObj._id + '/comments',
      
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          questionId: questionObj._id,
          newComment: comment
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    deleteComment: function(questionObj, comment){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'DELETE',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions/' + questionObj._id + '/comments/' + comment.id,
     
         headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
        // data: {
        //   questionId: questionObj._id,
        //   newComment: comment
        // }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    putComment: function(questionObj, comment){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions/' + questionObj._id + '/comments/' + comment.id,
     
         headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          questionId: questionObj._id,
          comment: comment
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    reportComment: function(questionObj, comment){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions/' + questionObj._id + '/comments/' + comment.id + '/report',
     
         headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
        //data: {
        //   questionId: questionObj._id,
        //   newComment: comment
        // }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    reportQuestion: function(questionObj){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions/' + questionObj._id + '/report',
     
         headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
        //data: {
        //   questionId: questionObj._id,
        //   newComment: comment
        // }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },




    clearDb: function(){
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/clearDb',
      
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {}
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    postLogin: function(username, password, hardWareId) { //register
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          username: username,
          password: password,
          hardWareId: hardWareId
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    putLogin: function(username, password) { //login
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          username: username,
          password: password
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },


    postQuestion: function(header, body) {
      return $rootScope.deviceIsReady().then(function(){ 
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions',
      
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          newQuestion: {
            header: header,
            body: body
          }
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      })
    },
    postPromotion: function(promotion) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/promotions',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: promotion
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },
    escalateQuestion: function(questionId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId,
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data:{
          questionId: questionId
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    approveComment: function(questionId, commentId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId + '/comments/' + commentId + '/approve',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    disapproveComment: function(questionId, commentId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId + '/comments/' + commentId + '/disapprove',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    approveQuestion: function(questionId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId + '/approve',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    disapproveQuestion: function(questionId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId + '/disapprove',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },


    postVote: function(vote) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/votes',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: vote
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },
    getQuestionsToReview: function() {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/toReview?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },
    getCommentsToReview: function() {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/comments/toReview?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },
    getPromotables: function() {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/promotables?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },
    getVotables: function() {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/votables?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });
      });
    },

    getMyCredit: function() {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/credit',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });

      });
    },
    getQuestion: function(questionId) {
      return $rootScope.deviceIsReady().then(function(){
        return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId + '?rnd=' + Math.random(),
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
          if(res.data.toast){
            $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
          }
          return res.data;
        });

      });
    },
    getAuthToken: function(hardWareId) {
      return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + hardWareId,
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    checkAuthToken: function(authToken) {
      
      return $http({
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + authToken,
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    
    refreshAuthToken: function(authToken) {
      
      return $http({
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/refresh-token/' + authToken,
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        }
      }).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    
    
    addCredit: function(addCreditAmount) {
      
      return $http({
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/addCredit',
        headers: {
          'Content-Type': 'application/json',
          authToken: $rootScope.authToken
        },
        data: {
          addCreditAmount: addCreditAmount
        }
      }).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    }
    
  }
})