app.factory('apiService', function($http, $filter, $rootScope) {
  return {
    // getSession: function(question) {
    //   var req = {
    //     method: 'POST',
    //     url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions',
      
    //     headers: {
    //       'Content-Type': 'application/json',
       //   clientMongoId: $rootScope.clientMongoId
    //     },
    //     data: {
    //       question: question
    //     }
    //   }
    //   return $http(req).then(function(res) {
    //     return res.data;
    //   });
    // },
    postLogin: function(username, password, hardWareId) { //register
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data: {
          username: username,
          password: password,
          hardWareId: hardWareId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },

    putLogin: function(username, password) { //login
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data: {
          username: username,
          password: password
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },


    postQuestion: function(questionHeader, question) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions',
      
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data: {
          newQuestion: {
            header: questionHeader,
            body: question
          }
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    postPromotion: function(promotion) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/promotions',
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data: promotion
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    escalateQuestion: function(questionId) {
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId,
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data:{
          questionId: questionId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    postVote: function(vote) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/votes',
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        },
        data: vote
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    getPromotables: function() {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/promotables?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    getVotables: function() {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/votables?rnd=' + Math.random(),
       
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    getQuestion: function(questionId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId,
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    getClientMongoId: function(hardWareId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + hardWareId,
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    checkClientMongoId: function(clientMongoId) {
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + clientMongoId,
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    },
    postClientMongoId: function(clientMongoId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + clientMongoId,
        headers: {
          'Content-Type': 'application/json',
          clientMongoId: $rootScope.clientMongoId
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text, res.data.toast.noTranslate)
        }
        return res.data;
      });
    }
  }
})