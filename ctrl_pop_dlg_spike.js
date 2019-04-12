var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('PopDialogController_spike', ['$scope', '$element', 'title', 'close', 'name_value',
'synapse_type','receptor_type', 'connectors_type',
'synaptic_weight', 'synaptic_delay',
'TsodyksMarkram_U', 'TsodyksMarkram_tau_rec', 'TsodyksMarkram_tau_facil',
'FixedProbability_p_connect', 'AllToAll_allow_self_connections',
'FixedProbability_allow_self_connections', 'FromFile_file', 'FromFile_distributed', 'FromFile_safe', 'FromFile_callback',
'FixedNumberPre_n', 'FixedNumberPre_with_replacement', 'FixedNumberPre_allow_self_connections', 'FixedNumberPost_n',
'FixedNumberPost_with_replacement', 'FixedNumberPost_allow_self_connections', 'FixedTotalNumber_n', 'FixedTotalNumber_with_replacement',
'FixedTotalNumber_allow_self_connections', 'DistanceDependent_d_expression', 'DistanceDependent_allow_self_connections',
	function($scope, $element, title, close, name_value,
		synapse_type, receptor_type, connectors_type,
		synaptic_weight, synaptic_delay,
		TsodyksMarkram_U, TsodyksMarkram_tau_rec, TsodyksMarkram_tau_facil,
		FixedProbability_p_connect, AllToAll_allow_self_connections,
		FixedProbability_allow_self_connections, FromFile_file, FromFile_distributed, FromFile_safe, FromFile_callback,
		FixedNumberPre_n, FixedNumberPre_with_replacement, FixedNumberPre_allow_self_connections, FixedNumberPost_n,
		FixedNumberPost_with_replacement, FixedNumberPost_allow_self_connections, FixedTotalNumber_n, FixedTotalNumber_with_replacement,
		FixedTotalNumber_allow_self_connections, DistanceDependent_d_expression, DistanceDependent_allow_self_connections) {
		
		$scope.param_synaptic_weight_dist = 0;
		$scope.param_synaptic_delay_dist = 0;
		$scope.TsodyksMarkram_U_dist = 0;
		$scope.TsodyksMarkram_tau_rec_dist = 0;
		$scope.TsodyksMarkram_tau_facil_dist = 0;

		$scope.title = title;
		$scope.name_value = name_value;
		// $scope.level = level;
		$scope.synapse_type = synapse_type;
		$scope.receptor_type = receptor_type;
		$scope.connectors_type = connectors_type;
		$scope.synaptic_weight = synaptic_weight;
		$scope.synaptic_delay = synaptic_delay;
		$scope.TsodyksMarkram_U = TsodyksMarkram_U;
		$scope.TsodyksMarkram_tau_rec = TsodyksMarkram_tau_rec;
		$scope.TsodyksMarkram_tau_facil = TsodyksMarkram_tau_facil;
		$scope.FixedProbability_p_connect = FixedProbability_p_connect;
		$scope.AllToAll_allow_self_connections = AllToAll_allow_self_connections;
		$scope.FixedProbability_allow_self_connections = FixedProbability_allow_self_connections;
		$scope.FromFile_file = FromFile_file;
		$scope.FromFile_distributed = FromFile_distributed;
		$scope.FromFile_safe = FromFile_safe;
		$scope.FromFile_callback = FromFile_callback;
		$scope.FixedNumberPre_n = FixedNumberPre_n;
		$scope.FixedNumberPre_with_replacement = FixedNumberPre_with_replacement;
		$scope.FixedNumberPre_allow_self_connections = FixedNumberPre_allow_self_connections;
		$scope.FixedNumberPost_n = FixedNumberPost_n;
		$scope.FixedNumberPost_with_replacement = FixedNumberPost_with_replacement;
		$scope.FixedNumberPost_allow_self_connections = FixedNumberPost_allow_self_connections;
		$scope.FixedTotalNumber_n = FixedTotalNumber_n;
		$scope.FixedTotalNumber_with_replacement = FixedTotalNumber_with_replacement;
		$scope.FixedTotalNumber_allow_self_connections = FixedTotalNumber_allow_self_connections;
		$scope.DistanceDependent_d_expression = DistanceDependent_d_expression;
		$scope.DistanceDependent_allow_self_connections = DistanceDependent_allow_self_connections;

		if($scope.celltype == "empty_edge"){
			$scope.celltype = "projection";
		}

		if(($scope.synapse_type == "") || ($scope.synapse_type == null)){
			$scope.synapse_type = "static";
		}

		// $scope.updateForm = function() {
		// 	if(($scope.synaptic_weight == "") || ($scope.synaptic_weight == null)){ $scope.synaptic_weight = 0,0; }
		// 	if(($scope.synaptic_delay == "") || ($scope.synaptic_delay == null)){ $scope.synaptic_delay = 0,0; }
		// 	if(($scope.synapse_type == "TsodyksMarkram")){
		// 		if(($scope.TsodyksMarkram_U == "") || ($scope.TsodyksMarkram_U == null)){ $scope.TsodyksMarkram_U = 0,5; }
		// 		if(($scope.TsodyksMarkram_tau_rec == "") || ($scope.TsodyksMarkram_tau_rec == null)){ $scope.TsodyksMarkram_tau_rec = 100,0; }
		// 		if(($scope.TsodyksMarkram_tau_facil == "") || ($scope.TsodyksMarkram_tau_facil == null)){ $scope.param_tau_m = 0,0; }
		// 	}
		// };

		if(($scope.receptor_type == "") || ($scope.receptor_type == null)){
			$scope.receptor_type = "excitatory";
		}

		if(($scope.connectors_type == "") || ($scope.connectors_type == null)){
			$scope.connectors_type = "AllToAll";
		}

		$scope.beforeClose = function(){
			if(($scope.name_value == "") || ($scope.name_value == null)){
				$scope.msgAlert = "Name is required.";
			}
			else if(($scope.synaptic_weight == null) || ($scope.synaptic_weight.toString() == "")){
				$scope.msgAlert = "Synaptic weight is required.";
			}
			else if(($scope.synaptic_delay == null) || ($scope.synaptic_delay.toString() == "")){
				$scope.msgAlert = "Synaptic delay is required.";
			}
			else if(($scope.synapse_type == 'TsodyksMarkram') && (($scope.TsodyksMarkram_U == "") || ($scope.TsodyksMarkram_U == null))){
				$scope.msgAlert = "U is required.";
			}
			else if(($scope.synapse_type == 'TsodyksMarkram') && (($scope.TsodyksMarkram_tau_facil == "") || ($scope.TsodyksMarkram_tau_facil == null))){
				$scope.msgAlert = "tau_rec is required.";
			}
			else if(($scope.synapse_type == 'TsodyksMarkram') && (($scope.TsodyksMarkram_tau_rec == "") || ($scope.TsodyksMarkram_tau_rec == null))){
				$scope.msgAlert = "tau_facil is required.";
			}
			else if(($scope.receptor_type == "") || ($scope.receptor_type == null)){
				$scope.msgAlert = "Receptor type value is required.";
			}
			else {
				$scope.close();
			}
		};

		$scope.updateDist = function(class_param, dist){
			if(dist == 0){
				var elm = document.getElementsByClassName(class_param + "_dist_0");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.add("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_1");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_2");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_3");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
			}
			if(dist == 1){
				var elm = document.getElementsByClassName(class_param + "_dist_0");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_1");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.add("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_2");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_3");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
			}
			if(dist == 2){
				var elm = document.getElementsByClassName(class_param + "_dist_0");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_1");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_2");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.add("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_3");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
			}
			if(dist == 3){
				var elm = document.getElementsByClassName(class_param + "_dist_0");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_1");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_2");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.remove("active");
				}
				var elm = document.getElementsByClassName(class_param + "_dist_3");
				for (var i = 0; i < elm.length; i++) {
					elm[i].classList.add("active");
				}
			}
		};

		$scope.close = function() {
			close({
				name_value: $scope.name_value,
				// level: $scope.level,
				synapse_type: $scope.synapse_type,
				receptor_type: $scope.receptor_type,
				connectors_type: $scope.connectors_type,
				synaptic_weight: $scope.synaptic_weight,
				synaptic_delay: $scope.synaptic_delay,
				TsodyksMarkram_U: $scope.TsodyksMarkram_U,
				TsodyksMarkram_tau_rec: $scope.TsodyksMarkram_tau_rec,
				TsodyksMarkram_tau_facil: $scope.TsodyksMarkram_tau_facil,
				AllToAll_allow_self_connections: $scope.AllToAll_allow_self_connections,
				FixedProbability_p_connect: $scope.FixedProbability_p_connect,
				FixedProbability_allow_self_connections: $scope.FixedProbability_allow_self_connections,
				FromFile_file: $scope.FromFile_file,
				FromFile_distributed: $scope.FromFile_distributed,
				FromFile_safe: $scope.FromFile_safe,
				FromFile_callback: $scope.FromFile_callback,
				FixedNumberPre_n: $scope.FixedNumberPre_n,
				FixedNumberPre_with_replacement: $scope.FixedNumberPre_with_replacement,
				FixedNumberPre_allow_self_connections: $scope.FixedNumberPre_allow_self_connections,
				FixedNumberPost_n: $scope.FixedNumberPost_n,
				FixedNumberPost_with_replacement: $scope.FixedNumberPost_with_replacement,
				FixedNumberPost_allow_self_connections: $scope.FixedNumberPost_allow_self_connections,
				FixedTotalNumber_n: $scope.FixedTotalNumber_n,
				FixedTotalNumber_with_replacement: $scope.FixedTotalNumber_with_replacement,
				FixedTotalNumber_allow_self_connections: $scope.FixedTotalNumber_allow_self_connections,
				DistanceDependent_d_expression: $scope.DistanceDependent_d_expression,
				DistanceDependent_allow_self_connections: $scope.DistanceDependent_allow_self_connections,
				celltype: "projection",
			}, 100);
			$('.modal-backdrop').remove();
		};
		//  This cancel function must use the bootstrap, 'modal' function because
		//  the doesn't have the 'data-dismiss' attribute.
		$scope.cancel = function() {
			//  Manually hide the modal.
			$element.modal('hide');
			//  Now call close, returning control to the caller.
			close({
				name_value: name_value,
				// level: level,
				synapse_type: $scope.synapse_type,
				receptor_type: $scope.receptor_type,
				connectors_type: $scope.connectors_type,
				synaptic_weight: $scope.synaptic_weight,
				synaptic_delay: $scope.synaptic_delay,
				TsodyksMarkram_U: $scope.TsodyksMarkram_U,
				TsodyksMarkram_tau_rec: $scope.TsodyksMarkram_tau_rec,
				TsodyksMarkram_tau_facil: $scope.TsodyksMarkram_tau_facil,
				AllToAll_allow_self_connections: $scope.AllToAll_allow_self_connections,
				FixedProbability_p_connect: $scope.FixedProbability_p_connec,
				FixedProbability_allow_self_connections: $scope.FixedProbability_allow_self_connections,
				FromFile_file: $scope.FromFile_file,
				FromFile_distributed: $scope.FromFile_distributed,
				FromFile_safe: $scope.FromFile_safe,
				FromFile_callback: $scope.FromFile_callback,
				FixedNumberPre_n: $scope.FixedNumberPre_n,
				FixedNumberPre_with_replacement: $scope.FixedNumberPre_with_replacement,
				FixedNumberPre_allow_self_connections: $scope.FixedNumberPre_allow_self_connections,
				FixedNumberPost_n: $scope.FixedNumberPost_n,
				FixedNumberPost_with_replacement: $scope.FixedNumberPost_with_replacement,
				FixedNumberPost_allow_self_connections: $scope.FixedNumberPost_allow_self_connections,
				FixedTotalNumber_n: $scope.FixedTotalNumber_n,
				FixedTotalNumber_with_replacement: $scope.FixedTotalNumber_with_replacement,
				FixedTotalNumber_allow_self_connections: $scope.FixedTotalNumber_allow_self_connections,
				DistanceDependent_d_expression: $scope.DistanceDependent_d_expression,
				DistanceDependent_allow_self_connections: $scope.DistanceDependent_allow_self_connections,
				celltype: "projection",
			}, 100); // close, but give 100ms for bootstrap to animate
			$('.modal-backdrop').remove();
		};
	}
]);
