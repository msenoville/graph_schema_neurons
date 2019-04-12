var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('Dlg_script_python', ['$scope', '$element', 'title', 'close', 'filename', 'hardware_platform', 'Simulation_time', 'Simulation_name',
	function($scope, $element, title, close, filename, hardware_platform, Simulation_time, Simulation_name){
		$scope.title = title;
		$scope.filename = filename;
		$scope.hardware_platform = hardware_platform;
		$scope.Simulation_time = Simulation_time;
		$scope.Simulation_name = Simulation_name;

		$scope.beforeClose = function(){
			if(($scope.Simulation_time == null) || ($scope.Simulation_time.toString() == "")){
				$scope.msgAlert = "Simulation time value is required.";
			} else if(($scope.Simulation_name == "") || ($scope.Simulation_name == null)){
				$scope.msgAlert = "Simulation name value is required.";
			} else {
				$scope.close();
			}
		};
		$scope.close = function() {
			close({
				filename: $scope.filename,
				hardware_platform: $scope.hardware_platform,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
			}, 100);
			//$scope.submitJob($scope.job, jobService);
			$('.modal-backdrop').remove();
		};
		$scope.cancel = function() {
			close({
				filename: $scope.filename,
				hardware_platform: $scope.hardware_platform,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
			}, 100);
			$('.modal-backdrop').remove();
		};
	}
]);
