angular.module("empGenPayCtrl", [])
	.controller("empGenPayCtrl", function ($scope, $http, $location) {


	//Going to pull data from the mongo database
	//the data is going to be the employee id and the total paid
	//initially nothing at first
	$scope.findUser = function (employee) {
		$scope.empPaid = [];
		$scope.emps = [];
		$http.get("http://localhost:9001/employees-paid")
			.success(function (data) {
			angular.forEach(data, function (value, key) {
				switch (employee) {
					case value.empId:
						$scope.empPaid.push(data[key]);
						break;

					case value.totalPaid:
						$scope.empPaid.push(data[key]);
						break;
					default:
						break;
				}

			});
		});

		$http.get("http://localhost:9001/employees").success(function (data) { $scope.emps = data; });
	};

	//need employee.id and the compensation and deduction math
	//take in an employee and return just the employee in the format the other collection needs to store
	$scope.payEmp = function payEmployee(emp) {
		//this is checking to see if the employees model has been defined yet in the employment payment history page
		//if so then I can use that sync the payroll page and the employment history page
		if (angular.isDefined($scope.emps)) {
		
			//variable declarations and intializing them
			//store the employees gotten from root scope, which is useful to get the scope variables set inside of another controller
			var employees = $scope.emps;

			var total = 0;
	
			//this is going to store the new representation of our employees to send to the database
			var compensation = 0;
			var deduction = 0;

			angular.forEach(employees, function (value, key) {
				var employee = {};

				if (value.id == emp.empId) {

					//translates to if the employee hasn't been paid, then select the employee
					//get their compensation, deduction, id and put into the new object 
					//the new object will be sent to mongodb
					if (value.paid == false) {

						employee.id = emp.id;
						employee.empId = value.id;
						compensation = value.compensation;
						deduction = value.deductions;
						total = compensation - deduction;
						employee.totalPaid = total;
			
						//send the employees information to the database that stores the employees id and the total amount paid
						$http.post('http://localhost:9001/employees-paid', employee).success(function (data) { });
						
						
						//set the value to true because the employee has been paid
						value.paid = true;
						
						//send the updated information of the employee being paid to other database that has their payment history
						//don't want to repay the employee twice
						$http.post('http://localhost:9001/employees', employees[key]).success(function (data) { });
						
						//set the model value in the view
						emp.totalPaid = total;
						
						updateEmpPayCtrlModel(employee);
						
					}
				}
			});
			
			//update the view that displays the employment payment history
			function updateEmpPayCtrlModel(employee) {
				var emp = $scope.employees;

				angular.forEach(emp, function (value, key) {

					if (value.id = employee.empId) {
						value.paid = true;
					}
				});
			}

		}


	};

});

