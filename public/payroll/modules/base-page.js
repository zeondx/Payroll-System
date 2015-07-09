//base module creation
angular.module("basePage", ["ngRoute", "empPayCtrl", "empGenPayCtrl"])
	.config(function ($routeProvider) {
	$routeProvider.when("/reim", {
		templateUrl: "views/forms.html"
	});

	$routeProvider.when("/empPayHist", {
		templateUrl: "views/select-employee-by-id.html"
	});

	$routeProvider.when("/empPick", {
		templateUrl: "views/employee-payment-history.html"
	});

	$routeProvider.when("/empFormSuccess", {
		templateUrl: "views/empForm-success-page.html"
	});
	
	$routeProvider.when("/empPaySuccess", {
		templateUrl: "views/empPay-success-page.html"
	});
	
	$routeProvider.when("/empFailure", {
		templateUrl: "views/empForm-failure-page.html"
	});
	
	$routeProvider.when("empPayFailure", {
		templateUrl: "views/empPay-failure-page.html"
	})

	$routeProvider.otherwise({
		templateUrl: "views/generatePayments.html"
	});
})
	.run(function ($rootScope) {
	$rootScope.employees = [];
});

