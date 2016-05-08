app.factory('modalService', function($rootScope, $ionicModal) {

  var areYouSureModal;
  var scope;

  return {

    initAreYouSureModal: function(initOnScope){
      scope = initOnScope;
      $ionicModal.fromTemplateUrl('templates/areYouSureModal.html', {
          scope: initOnScope, 
          animation: 'none'
      }).then(function(modal) {
          areYouSureModal = modal;
      });
    },

    showAreYouSureModal: function(type) {

      return new Promise(function(resolve, reject){
        
        scope.resolveAreYouSureModal = function(val){
          areYouSureModal.hide();
          resolve(val);
        };
        areYouSureModal.show();
        
      })

    }
  }
})