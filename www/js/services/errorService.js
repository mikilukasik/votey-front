app.factory('errorService', function($rootScope, $http) {
  return {
    dealWithError: function(err, showToastr) {

      $rootScope.toConsole('silentError:', err)

      if (err.status === 0) $rootScope.toastr('error', 'There was no response from the server.');

      if(showToastr) $rootScope.toastr(
      	showToastr.type ? showToastr.type : 'error',
      	showToastr.text ? showToastr.text : 'error: ' + err.data,
      	showToastr.text ? false : true						//noTranslate
      );

    }
  }
})