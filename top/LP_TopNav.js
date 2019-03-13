

var app = angular.module('rootApp');
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json; odata=verbose';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}]);
app.controller('NavigationController', ['$scope','$rootScope','$http', function ($scope,$rootScope, $http) {

    $scope.isTermsetExternal = function(Termset){
        return Termset.CustomProperties && Termset.CustomProperties.results &&  Termset.CustomProperties.results['length'] > 0 && Termset.CustomProperties.results[0].Value == 'yes';
    }
    //Replace navigation.json with '/_api/navigation/menustate?mapprovidername='GlobalNavigationSwitchableProvider'
    $http.get("https://dev-legal.intel.com/_api/navigation/menustate?mapprovidername=%27GlobalNavigationSwitchableProvider%27&customProperties=%27nav_external%27").then(function (data) {
        $scope.NavigationItems = data.data.d.MenuState.Nodes.results;
                
        console.log($scope.NavigationItems);
        $rootScope.$broadcast('termsData', $scope.NavigationItems);
        console.log()
    });
}]);




