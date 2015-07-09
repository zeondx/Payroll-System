/// <reference path="../typings/angularjs/angular.d.ts"/>
angular.module("empPayCtrl", [])
	.controller("empPayCtrl", function ($scope, $http, $location) {	
	//need to pull the data from the user with the scope service
	//need to pull the data from the restful service that contains the employees with the user submits
	$scope.findUser = function (employee) {
		$scope.employees = [];
		$http.get("http://localhost:9001/employees")
			.success(function (data) {
			angular.forEach(data, function (value, key) {
				switch (employee) {
					case value.firstName:
						$scope.employees.push(data[key]);
						break;

					case value.lastName:
						$scope.employees.push(data[key]);
						break;

					case value.id:
						$scope.employees.push(data[key]);
						break;
					default:
						break;
				}

			});
			
			//essentially if the user doesn't enter good data
			//will come back and fix this
			if ($scope.employees.length == 0) {
				alert("You didn't enter good data");
			}
			
		});
	};
	
	$scope.pickThis = function (employee) {
		var emp = employee;
		$scope.employees = [];
		$scope.employees.push(emp);
		
		$location.path("/empPick");
	};
	
	$scope.approve = function (employee) {
		employee.rForm = true;
	};
	
	$scope.disapprove = function (employee) {
		employee.rForm = false;
	};
	
	$scope.submit = function (employee) {
		$http.post("http://localhost:9001/employees", employee)
			.success(function (data) {
				
			$location.path("/empFormSuccess");

		});
	};
	
});