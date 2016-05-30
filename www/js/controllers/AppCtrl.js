app.controller('AppCtrl', function($rootScope, $scope, $q, $ionicModal, $timeout, $interval, $filter, $ionicSideMenuDelegate, apiService, toastr, errorService, $cordovaGeolocation, $cordovaDevice) {
  
  var whenMenuOpened = function(){
    apiService.getMyCredit().then(function(result){
        $rootScope.myCredit = (result.data) ? result.data: 0;
    })
  };

  $scope.$watch(function() {
    return $ionicSideMenuDelegate.getOpenRatio();
  }, function(ratio) {
    if (ratio == 1) whenMenuOpened();
  });
  $rootScope.language = preferredLanguage;
  // var posOptions = {timeout: 10000, enableHighAccuracy: false};
  // $cordovaGeolocation
  //   .getCurrentPosition(posOptions)
  //   .then(function (position) {
  //     var lat  = position.coords.latitude
  //     var long = position.coords.longitude
  //     $rootScope.toConsole('inside getCurrentPosition',lat,long)
  //   }, function(err) {
  //     // error
  //   });
  $rootScope.device = {};
  $scope.getIdFromCookie = function(dontGetCookie) {
    $rootScope.authToken = '';
    if (!dontGetCookie) {
      $rootScope.authToken = getCookie("authToken");
    }
    if ($rootScope.authToken === '') {
      $rootScope.toConsole('no authToken, requesting...');
      apiService.getAuthToken('newBrowser').then(function(res) {
        setCookie("authToken", res.authToken, 365);
        $rootScope.authToken = res.authToken;
        $rootScope.tokenCreatedAt = new Date();
        $rootScope.loginMode = 'fresh';
        $rootScope.toConsole('authToken received', $rootScope.authToken);
        $rootScope.forceResolveWaitForDevice();
      }, function(err) {
        $rootScope.toConsole('silentError', 'NO authToken AT ALL!!');
        errorService.dealWithError(err);
      })
    } else {
      $rootScope.toConsole('authToken from cookie, will check with server..', $rootScope.authToken);
      apiService.checkAuthToken($rootScope.authToken).then(function(res) {
        setCookie("authToken", res.authToken, 365);
        $rootScope.authToken = res.authToken;
        $rootScope.tokenCreatedAt = new Date();
        $rootScope.loginMode = 'cookie';
        $rootScope.toConsole('authToken without login.');
        $rootScope.forceResolveWaitForDevice()
      }, function(err) {
        $rootScope.toConsole('silentError', 'authToken cookie problem, trying again as new..');
        $scope.getIdFromCookie(true);
        errorService.dealWithError(err);
      })
    };
  };
  $rootScope.consoleLog = []
  $rootScope.toConsole = function() {
    $rootScope.consoleLog.push(arguments)
    console.log(arguments)
  };
  $rootScope.spinIt = true;
  $timeout(function() {
    if (!$rootScope.device.isReady) {
      $rootScope.toConsole('silentError:', "Device didn't get ready in " + (new Date() - indexGlobals.appStarted) + ' seconds.');
      $rootScope.toConsole('Treating device as browser.');
      $rootScope.spinIt = false;
      $rootScope.device.isBrowser = true;
      $rootScope.device.isReady = true;
      //f(!$rootScope.device.uuid) $rootScope.device.uuid = Math.random();       //in browser
      //$rootScope.forceResolveWaitForDevice();
      $scope.getIdFromCookie()
    } else {
      //mobile already initialized
    }
  }, 5000);
  $scope.getIdFromHardwareId = function() {
    $rootScope.toConsole('requesting authToken...');
    apiService.getAuthToken($rootScope.device.uuid).then(function(res) {
      $rootScope.authToken = res.authToken;
      $rootScope.tokenCreatedAt = new Date();
      $rootScope.loginMode = 'hardWareId';
      $rootScope.toConsole('authToken received', $rootScope.authToken);
      $rootScope.forceResolveWaitForDevice();
    }, function(err) {
      $rootScope.toConsole('silentError', 'NO authToken AT ALL!!');
      errorService.dealWithError(err);
    })
  }
  var whenDeviceReady = function() {
    $rootScope.toConsole('Device got ready in ' + (new Date() - indexGlobals.appStarted) + ' seconds.');
    $rootScope.device.isMobile = true;
    $rootScope.device.isReady = true;
    $rootScope.device.deviceInfo = $cordovaDevice.getDevice();
    $rootScope.device.cordova = $cordovaDevice.getCordova();
    $rootScope.device.model = $cordovaDevice.getModel();
    $rootScope.device.platform = $cordovaDevice.getPlatform();
    $rootScope.device.uuid = $cordovaDevice.getUUID();
    $rootScope.device.version = $cordovaDevice.getVersion();
    $scope.getIdFromHardwareId();
  };
  $rootScope.waitForDevice = function() {
    return $q(function(resolve, reject) {
      $rootScope.forceResolveWaitForDevice = function() {
        resolve(true) //forced
      };
      if ($rootScope.device.isReady) {
        resolve();
      } else {
        document.addEventListener("deviceready", function() {
          whenDeviceReady();
          $rootScope.toConsole('Device is ready, requesting authToken by hardWareId..')
            //resolve()
        }, false);
      }
    });
  };
  $rootScope.deviceIsReady = function() {
    return $q(function(resolve, rej) {
      if ($rootScope.gotMongoId) return resolve();
      $rootScope.waitForDevice().then(function(forced) {
        console.log('Device got ready! Forced: ', forced, 'authToken: ', $rootScope.authToken)
        $rootScope.gotMongoId = true;
        return resolve();
      })
    })
    .then(function () {
      
      if ( new Date() - $rootScope.tokenCreatedAt > 86400 * 3 ) return apiService.refreshAuthToken($rootScope.authToken);  //refreshAuthToken if older than 3 days
      
      return;
      
    })
    .then(function(newAuthTokenInObj){
      
      if(newAuthTokenInObj){
        $rootScope.authToken = newAuthTokenInObj.authToken;
        $rootScope.tokenCreatedAt = new Date();
      };
     
      return;
      
    })
  };
  $rootScope.deviceIsReady().then(function() {
    $rootScope.spinIt = false;
  })
  var watchOptions = {
    timeout: 3000,
    enableHighAccuracy: false // may cause errors if true
  };
  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      $rootScope.myPosition = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      $rootScope.toConsole('$rootScope.myPosition updated', $rootScope.myPosition)
    });
  // $rootScope.toConsole('geoCtrl ran.')
  // watch.clearWatch();
  // // OR
  // $cordovaGeolocation.clearWatch(watch)
  //   .then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });
  $rootScope.toastr = function(type, message, noTranslate) {
    if (noTranslate) {
      toastr[type](message);
    } else {
      toastr[type]($filter('translate')(message, 'toasts', $rootScope.language));
    }
  }
  //var hardWareId = Math.random() // 'tempId';
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });
  // Form data for the login modal
  $scope.loginData = {};
  $scope.logoff = function() {
    $rootScope.loginMode = undefined;
    $rootScope.toConsole('logging off.');
    if ($rootScope.device.isMobile) {
      //mobile
      $scope.getIdFromHardwareId();
    } else {
      //browser
      $scope.getIdFromCookie();
    }
  };
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });
  // Open the login modal
  $scope.openLoginModal = function() {
    $scope.loginModal.show();
  };
  // Triggered in the login modal to close it
  $scope.closeLoginModal = function() {
    $scope.loginModal.hide();
  };
  $scope.openRegisterModal = function() {
    $scope.registerModal.show();
  };
  $scope.closeRegisterModal = function() {
    $scope.registerModal.hide();
  };
  // Perform the login action when the user submits the login form
  $scope.sendLogin = function() {
    $rootScope.toConsole('Sending login', $scope.loginData);
    apiService.putLogin($scope.loginData.loginName, $scope.loginData.loginPassword).then(function(res) {
      if (res.success) {
        $rootScope.toConsole('Logged in, authToken:', res.authToken)
        $rootScope.authToken = res.authToken;
        $rootScope.tokenCreatedAt = new Date();
        $rootScope.loginMode = 'username';
        $scope.loginData.loginName = undefined;
        $scope.loginData.loginPassword = undefined;
        $scope.closeLoginModal();
      }
    }, function(err) {
      errorService.dealWithError(err, true);
    })
  };
  $scope.sendRegister = function() {
    if ($scope.loginData.registerPassword === $scope.loginData.registerPassword2) {
      $rootScope.toConsole('Registering', $scope.loginData);
      apiService.postLogin($scope.loginData.registerName, $scope.loginData.registerPassword).then(function(res) {
        if (res.success) {
          $rootScope.toConsole('Logged in, authToken:', res.authToken);
          $rootScope.authToken = res.authToken;
          $rootScope.tokenCreatedAt = new Date();
          $rootScope.loginMode = 'username';
          $scope.loginData.registerName = undefined;
          $scope.loginData.registerPassword = undefined;
          $scope.loginData.registerPassword2 = undefined;
          $scope.closeRegisterModal();
          $scope.closeLoginModal();
        };
      }, function(err) {
        errorService.dealWithError(err);
      })
    } else {
      $rootScope.toastr('error', "Passwords don't match.");
    }
  };
  $rootScope.vote = {
    up: function(question, index) {
      $rootScope.spinIt = true;
      apiService.postVote({
        // authToken: $rootScope.authToken,
        questionId: question._id,
        voting: true
      }).then(function(res) {
        $rootScope.spinIt = false;
        if (res.success) {
          if (question.previousVote === 'no') question.voteDown--;
          question.voteUp++;
          // if(!question.previousVote && index != undefined && $rootScope.votables){
          //   $rootScope.votables.push($rootScope.votables.splice(index,1)[0]);
          // };
          question.previousVote = 'yes';
        }
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    down: function(question, index) {
      $rootScope.spinIt = true;
      apiService.postVote({
        // authToken: $rootScope.authToken,
        questionId: question._id,
        voting: false
      }).then(function(res) {
        $rootScope.spinIt = false;
        if (res.success) {
          if (question.previousVote === 'yes') question.voteUp--;
          question.voteDown++;
          // if(!question.previousVote && index != undefined){
          //   $rootScope.votables.push($rootScope.votables.splice(index,1)[0]);
          // };
          question.previousVote = 'no';
        }
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    }
  };
  $rootScope.promote = {
    up: function(question, index) {
      $rootScope.spinIt = true;
      apiService.postPromotion({
        // authToken: $rootScope.authToken,
        questionId: question._id,
        promoting: true
      }).then(function(res) {
        $rootScope.spinIt = false;
        if (res.success) {
          if (question.previousPromotion === 'down') question.promoteDown--;
          question.promoteUp++;
          // if(!question.previousPromotion && index != undefined && $rootScope.promotables){
          //   $rootScope.promotables.push($rootScope.promotables.splice(index,1)[0]);
          // };
          question.previousPromotion = 'up';
        }
        $rootScope.toConsole(res)
      }, function(err) {
        $rootScope.spinIt = false;
        errorService.dealWithError(err);
      })
    },
    down: function(question, index) {
      $rootScope.spinIt = true;
      apiService.postPromotion({
        // authToken: $rootScope.authToken,
        questionId: question._id,
        promoting: false
      }).then(function(res) {
        $rootScope.spinIt = false;
        if (res.success) {
          if (question.previousPromotion === 'up') question.promoteUp--;
          question.promoteDown++;
          // if(!question.previousPromotion && index != undefined){
          //   $rootScope.promotables.push($rootScope.promotables.splice(index,1)[0]);
          // };
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