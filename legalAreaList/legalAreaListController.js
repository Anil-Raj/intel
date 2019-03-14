
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
                var count = 0;
                $scope.lpgArea = [];
                $scope.lpgArea[0] = $scope.legalAreaList.slice(0, 6);
                $scope.lpgArea[1] = $scope.legalAreaList.slice(6, 12);
                $scope.lpgArea[2] = $scope.legalAreaList.slice(12);


                // $scope.legalAreaList.map(function(item,index){
                //     count++;
                //     count+=item.subArea.length;
                //     if(index+1  === $scope.legalAreaList.length ){
                //         $scope.lpgArea[count].push(...myArray.slice(lastIndex, index));
                //     } else if(count = 30 ){
                //         $scope.lpgArea[count].push(...myArray.slice(lastIndex, index));
                //         var lastIndex = index;
                //     } else if ( count = 15){
                //         $scope.lpgArea[count].push(...myArray.slice(0, index));
                //         var lastIndex = index;
                //     }
                    
                // });
                // $scope.$apply();

            }
        });
    });
}
]);  