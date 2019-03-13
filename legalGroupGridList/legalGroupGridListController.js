
var spApp = angular.module("rootApp");
spApp.controller("legalGroupGridListController", ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.isList = true;
    $scope.groupList = [];
    $scope.gridList = [];
    $rootScope.$on("termsData", function (evt, data) {
        console.log(data);
        $.each(data, function (key, values) {
            if (values.Title === 'LPG Groups') {
                values.Nodes.results.map(function (node) {
                    var groups = [];
                    node.Nodes.results.map(function (item) {
                        groupObj = {
                            groupname: node.Title,
                            title: item.Title,
                            url: node.SimpleUrl,
                            nav_isOpenInNewWindow: false

                        };
                        item.CustomProperties && item.CustomProperties.results.filter(function (a) {
                            if (a.Key == "nav_external" &&
                                a.Value == "yes") {
                                groupObj.nav_isOpenInNewWindow = true;
                            }
                        });
                        groups.push(groupObj);
                    })
                    $scope.groupList.push({
                        groupname: node.Title,
                        list: groups
                    });
                    console.log($scope.groupList, $scope.gridList);
                    $scope.gridList = $scope.gridList.concat(groups);
                });
                // $scope.$apply();

            }
        });
    });
    $scope.displayGrid = function () { $scope.isList = false };
    $scope.displayList = function () { $scope.isList = true };
    $scope.applyOpenInNewWindowIcon = function (group) {
        console.log(group)

    };
}
]);  