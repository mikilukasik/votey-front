//source  
//
//https://forum.ionicframework.com/t/ion-option-button-in-list-toggle-by-icon-click-instead-of-swipe/9703/4
app.directive('clickForOptions', ['$ionicGesture', '$timeout', function($ionicGesture, $timeout) {
  return {
    restrict: 'A',
    // scope: {
    //   alwaysShowButtons: '@' 
    // },
    link: function(scope, element, attrs) {

      var buttons = element[0].querySelector('.item-options');
      var content = element[0].querySelector('.item-content');

      var thisFunc = function() {
        $timeout(function() {
            if (!scope.$eval(attrs.alwaysShowButtons)) thisFunc2();
        }, 10);
        
      };

      var thisFunc2 = function(e) {
        if (!buttons) {
          return;
        }

        var buttonsWidth = buttons.offsetWidth;
        var contentWidth = content.offsetWidth;

        ionic.requestAnimationFrame(function() {
          //content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

          if (!buttons.classList.contains('invisible')) {
            content.style.width = 'auto';//contentWidth + buttonsWidth + 'px';
            buttons.classList.add('invisible');

          } else {
            content.style.width = contentWidth - buttonsWidth + 'px';
            buttons.classList.remove('invisible');
          }
        });

      };

      
      $ionicGesture.on('tap', thisFunc, element);
   
      //buttons.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

      buttons.classList.remove('invisible');
      thisFunc2();

    }
  };
}])