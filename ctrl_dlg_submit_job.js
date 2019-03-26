var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('Dlg_submit_job', ['$scope', '$element', '$http', 'title', 'scriptText', 'cells', 'close', 'hardware_platform',
											 'jobService', 'Simulation_time', 'Simulation_name', 'bbpOidcSession', 'clbUser', '$location', 'clbContext',
											 'python_script_string',
	function($scope, $element, $http, title, scriptText, cells, close, hardware_platform,
			 jobService, Simulation_time, Simulation_name, bbpOidcSession, clbUser, $location, clbContext,
			 python_script_string) {

		clbUser.getCurrentUserOnly().then(
			function(response) {
				console.log(response);
			},
			function(err) {
				bbpOidcSession.login();
			});

		$scope.title = title;
		$scope.scriptText = scriptText;
		$scope.base_url = "";

		var curdate = new Date();
		$scope.job = {};

		$scope.job.collab_id = 4293;  //default value
		//$scope.job.log = " ";
        $scope.job.status = "submitted";
        //$scope.job.timestamp_completion = curdate.toUTCString();
        $scope.job.code = $scope.scriptText;
        $scope.job.command = "";
        $scope.job.hardware_config = {};
		$scope.hardware_platform = hardware_platform;
        $scope.job.tags = ["gui"];
        $scope.job.input_data = [];
        //$scope.job.output_data = [];
        //$scope.job.resource_uri = "";
		$scope.inputs = [];
		$scope.Simulation_time = Simulation_time;

		if(($scope.hardware_platform == "") || ($scope.hardware_platform == null)){
			$scope.hardware_platform = "BrainScaleS";
		}

		var ctx = null;
		console.log($location);
		console.log($location.search());
		console.log(window.location);
		if( $location.search().ctx ) {
			ctx = $location.search().ctx;
			console.log(ctx);
			clbContext.get(ctx).then(
				function(context) {
					console.log("Collab id = " + context.collab.id);
					$scope.job.collab_id = context.collab.id;
				},
				function(err) {
					 console.log(err);
				}
			);
		}
		console.log("Context is " + ctx);

		$scope.submitJob = function(job, jobService){
			job_p = JSON.stringify(job);
			console.log("Submitting job:");
			console.log(job);
			console.log(job_p);
			try {
				jobService.post(job_p, function(data, status){
					console.log("success : +" + data + "/" + status );
				})
			} catch(error) {
				console.log("error : " + error);
			}
			// .error(function(data, status){
			//  	console.log("failled : +" + data + "/" + status );
			// });
		};

		$scope.beforeClose = function(){
			if(($scope.Simulation_time == null) || ($scope.Simulation_time.toString() == "")){
				$scope.msgAlert = "Simulation time value is required."
			} else if(($scope.Simulation_name == "") || ($scope.Simulation_name == null)){
				$scope.msgAlert = "Simulation name value is required.";
			} else {
				$scope.close()
			}
		};
		$scope.close = function() {
			$scope.scriptText = python_script_string(cells, $scope.hardware_platform, $scope.Simulation_time, $scope.Simulation_name);
			$scope.job.code = $scope.scriptText;
			$scope.job.hardware_platform = $scope.hardware_platform;
			$scope.job.timestamp_submission = curdate.toUTCString();
			close({
				hardware_platform: $scope.hardware_platform,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
			}, 100);
			$scope.submitJob($scope.job, jobService);
			$('.modal-backdrop').remove();
		};
		$scope.cancel = function() {
			close({
				hardware_platform: $scope.hardware_platform,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
			}, 100);
			$('.modal-backdrop').remove();
		};
	}
]);
