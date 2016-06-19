app.directive('comingSoon', function() {
    return {
        link: function(scope, elem, attrs) {
           
               
                elem.toggleClass('coming-soon');
                
            		attrs.href = undefined

        },
    }
});