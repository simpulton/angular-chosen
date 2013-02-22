var module = angular.module('myApp', []);

module.directive('chosen',function(){
    var linker = function(scope,element,attrs) {
        var model = attrs['ngModel'];

        scope.$watch('recipientsList',function(){
            element.trigger('liszt:updated');
        });

        /* Added this in so that you could preselect items */
        scope.$watch(model, function () {
            element.trigger("liszt:updated");
        });

        element.chosen();
    };

    return {
        restrict:'A',
        link: linker
    }
})


function RecipientsController($scope,$http) {
    $scope.url = 'recipients.json';
    $scope.recipientsList = [];

    $scope.fetchRecipients = function() {
        $http.get($scope.url).then(function(result){
            $scope.recipientsList = result.data;
        });
    }

    $scope.fetchRecipients();
}