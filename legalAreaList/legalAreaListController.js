
var spApp = angular.module("rootApp");
spApp.controller("legalAreaListController", ['$scope','$rootScope', function ($rootScope, $scope) {
    $scope.legalAreaList = [];
    $rootScope.$on("termsData",function(evt,data){
        $.each(data, function (key, values) {
            if (values.Title === 'Legal Areas') {
                values.Nodes.results.map(function(node) {
                    var legalAreaObj = {
                            title: node.Title,
                            url: node.SimpleUrl,
                            nav_isOpenInNewWindow: false,
                            subArea:node.Nodes.results
                        };
                        node.CustomProperties && node.CustomProperties.results.filter(function(a) {
                            if (a.Key == "nav_external" &&
                                a.Value == "yes") {
                                    legalAreaObj.nav_isOpenInNewWindow = true;
                            }
                        });

                    $scope.legalAreaList.push(legalAreaObj);
                });
                // $scope.$apply();

            }
        });
    });
}
]);  