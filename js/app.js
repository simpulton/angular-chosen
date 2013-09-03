var module = angular.module('myApp', []);

module.directive('chosen',function(){
    var linker = function(scope,element,attrs) {
        var list = attrs['chosen'];

        scope.$watch(list, function(){
            element.trigger('liszt:updated');
            element.trigger("chosen:updated");
        });

        element.chosen();
    };

    return {
        restrict:'A',
        link: linker
    }
})

module.controller('RecipientsController', function($scope, $http) {
    $scope.url = 'recipients.json';
    $scope.recipients = [];
    $scope.selectedRecipients = [2,4,6,8]; // DUMMY DATA
    $scope.recipientsList = [];

    var selectRecipients = function() {
        $scope.recipients = _.filter($scope.recipientsList, function(item) {
            return _.contains($scope.selectedRecipients, item.id);
        });
    }

    $scope.fetchRecipients = function() {
        $http.get($scope.url).then(function(result){
            $scope.recipientsList = result.data;
            selectRecipients();
        });
    }

    $scope.fetchRecipients();
});