var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('PopDialogController', ['$scope', '$element', 'title', 'close', 'name_value', 'size', 'celltype',
'param_v_rest', 'param_cm', 'param_tau_m', 'param_tau_m', 'param_tau_m', 'param_tau_refrac', 'param_tau_syn_E', 'param_tau_syn_I',
'param_i_offset', 'param_v_reset', 'param_v_thresh', 'param_e_rev_E', 'param_e_rev_I', 'param_gbar_Na', 'param_gbar_K', 'param_g_leak',
'param_v_offset', 'param_e_rev_Na', 'param_e_rev_K', 'param_e_rev_leak', 'param_tau_cm', 'param_v_spike', 'param_a', 'param_b',
'param_delta_T', 'param_tau_w', 'init_isyn_exc', 'init_isyn_inh', 'init_gsyn_exc', 'init_gsyn_inh', 'init_v', 'init_w',
'Recording_spikes', 'Recording_v', 'Simulation_time', 'Simulation_name', 'param_rate', 'param_start', 'param_duration',
	function($scope, $element, title, close, name_value, size, celltype,
		param_v_rest, param_cm, param_tau_m, param_tau_m, param_tau_m, param_tau_refrac, param_tau_syn_E, param_tau_syn_I,
		param_i_offset, param_v_reset, param_v_thresh, param_e_rev_E, param_e_rev_I, param_gbar_Na, param_gbar_K, param_g_leak,
		param_v_offset, param_e_rev_Na, param_e_rev_K, param_e_rev_leak, param_tau_cm, param_v_spike, param_a, param_b,
		param_delta_T, param_tau_w, init_isyn_exc, init_isyn_inh, init_gsyn_exc, init_gsyn_inh, init_v, init_w,
		Recording_spikes, Recording_v, Simulation_time, Simulation_name, param_rate, param_start, param_duration) {
		
		$scope.v_rest_dist = 0;
		$scope.param_cm_dist = 0;
		$scope.param_tau_m_dist = 0;
		$scope.param_tau_refrac_dist = 0;
		$scope.param_tau_syn_E_dist = 0;
		$scope.param_tau_syn_I_dist = 0;
		$scope.param_i_offset_dist = 0;
		$scope.param_v_reset_dist = 0;
		$scope.param_v_thresh_dist = 0;
		$scope.init_v_dist = 0;
		$scope.param_e_rev_E_dist = 0;
		$scope.param_e_rev_I_dist = 0;
		
		$scope.title = title;
		$scope.name_value = name_value;
		// $scope.level = level;
		$scope.size = size;
		$scope.celltype = celltype;
		$scope.param_v_rest = param_v_rest;
		$scope.param_cm = param_cm;
		$scope.param_tau_m = param_tau_m;
		$scope.param_tau_refrac = param_tau_refrac;
		$scope.param_tau_syn_E = param_tau_syn_E;
		$scope.param_tau_syn_I = param_tau_syn_I;
		$scope.param_i_offset = param_i_offset;
		$scope.param_v_reset = param_v_reset;
		$scope.param_v_thresh = param_v_thresh;
		$scope.param_e_rev_E = param_e_rev_E;
		$scope.param_e_rev_I = param_e_rev_I;
		$scope.param_gbar_Na = param_gbar_Na;
		$scope.param_gbar_K = param_gbar_K;
		$scope.param_g_leak = param_g_leak;
		$scope.param_v_offset = param_v_offset;
		$scope.param_e_rev_Na = param_e_rev_Na;
		$scope.param_e_rev_K = param_e_rev_K;
		$scope.param_e_rev_leak = param_e_rev_leak;
		$scope.param_tau_cm = param_tau_cm;
		$scope.param_v_spike = param_v_spike;
		$scope.param_a = param_a;
		$scope.param_b = param_b;
		$scope.param_delta_T = param_delta_T;
		$scope.param_tau_w = param_tau_w;
		$scope.init_isyn_exc = init_isyn_exc;
		$scope.init_isyn_inh = init_isyn_inh;
		$scope.init_gsyn_exc = init_gsyn_exc;
		$scope.init_gsyn_inh = init_gsyn_inh;
		$scope.init_v = init_v;
		$scope.init_w = init_w;
		$scope.Recording_spikes = Recording_spikes;
		$scope.Recording_v = Recording_v;
		$scope.Simulation_time = Simulation_time;
		$scope.Simulation_name = Simulation_name;
		$scope.param_rate = param_rate;
		$scope.param_start = param_start;
		$scope.param_duration = param_duration;

		if($scope.celltype == "empty_no_edge"){
			$scope.celltype = "IF_curr_alpha";
		}

		$scope.updateForm = function() {
			if(($scope.celltype == "IF_curr_alpha") || ($scope.celltype == "IF_curr_exp")){
				if(($scope.param_v_rest == "") || ($scope.param_v_rest == null)){ $scope.param_v_rest = -65,0; }
				if(($scope.param_cm == "") || ($scope.param_cm == null)){ $scope.param_cm = 1,0; }
				if(($scope.param_tau_m == "") || ($scope.param_tau_m == null)){ $scope.param_tau_m = 20,0; }
				if(($scope.param_tau_refrac == "") || ($scope.param_tau_refrac == null)){ $scope.param_tau_refrac = 0,0; }
				if(($scope.param_tau_syn_E == "") || ($scope.param_tau_syn_E == null)){ $scope.param_tau_syn_E = 5,0; }
				if(($scope.param_tau_syn_I == "") || ($scope.param_tau_syn_I == null)){ $scope.param_tau_syn_I = 5,0; }
				if(($scope.param_i_offset == "") || ($scope.param_i_offset == null)){ $scope.param_i_offset = 0,0; }
				if(($scope.param_v_reset == "") || ($scope.param_v_reset == null)){ $scope.param_v_reset = -65,0; }
				if(($scope.param_v_thresh == "") || ($scope.param_v_thresh == null)){ $scope.param_v_thresh = -50,0; }
				if(($scope.init_v == "") || ($scope.init_v == null)){ $scope.init_v = -65,0; }
				if(($scope.init_isyn_exc == "") || ($scope.init_isyn_exc == null)){ $scope.init_isyn_exc = 0,0; }
				if(($scope.init_isyn_inh == "") || ($scope.init_isyn_inh == null)){ $scope.init_isyn_inh = 0,0; }
			}
			if(($scope.celltype == "IF_cond_alpha") || ($scope.celltype == "IF_cond_exp")){
				if(($scope.param_v_rest == "") || ($scope.param_v_rest == null)){ $scope.param_v_rest = -65,0; }
				if(($scope.param_cm == "") || ($scope.param_cm == null)){ $scope.param_cm = 1,0; }
				if(($scope.param_tau_m == "") || ($scope.param_tau_m == null)){ $scope.param_tau_m = 20,0; }
				if(($scope.param_tau_refrac == "") || ($scope.param_tau_refrac == null)){ $scope.param_tau_refrac = 0,0; }
				if(($scope.param_tau_syn_E == "") || ($scope.param_tau_syn_E == null)){ $scope.param_tau_syn_E = 5,0; }
				if(($scope.param_tau_syn_I == "") || ($scope.param_tau_syn_I == null)){ $scope.param_tau_syn_I = 5,0; }
				if(($scope.param_e_rev_E == "") || ($scope.param_e_rev_E == null)){ $scope.param_e_rev_E = 5.0; }
				if(($scope.param_e_rev_I == "") || ($scope.param_e_rev_I == null)){ $scope.param_e_rev_I = 0.0; }
				if(($scope.param_i_offset == "") || ($scope.param_i_offset == null)){ $scope.param_i_offset = 0,0; }
				if(($scope.param_v_reset == "") || ($scope.param_v_reset == null)){ $scope.param_v_reset = -65,0; }
				if(($scope.param_v_thresh == "") || ($scope.param_v_thresh == null)){ $scope.param_v_thresh = -50,0; }
				if(($scope.init_v == "") || ($scope.init_v == null)){ $scope.init_v = -65,0; }
				if(($scope.init_gsyn_exc == "") || ($scope.init_gsyn_exc == null)){ $scope.init_gsyn_exc = 0,0; }
				if(($scope.init_gsyn_inh == "") || ($scope.init_gsyn_inh == null)){ $scope.init_gsyn_inh = 0,0; }
			}
			if($scope.celltype == "HH_cond_exp"){
				if(($scope.param_gbar_Na == "") || ($scope.param_gbar_Na == null)){ $scope.param_gbar_Na = 20,0; }
				if(($scope.param_gbar_K == "") || ($scope.param_gbar_K == null)){ $scope.param_gbar_K = 6.0; }
				if(($scope.param_g_leak == "") || ($scope.param_g_leak == null)){ $scope.param_g_leak = 0,01; }
				if(($scope.param_cm == "") || ($scope.param_cm == null)){ $scope.param_cm = 0,2; }
				if(($scope.param_v_offset == "") || ($scope.param_v_offset == null)){ $scope.param_v_offset = -63,0; }
				if(($scope.param_e_rev_Na == "") || ($scope.param_e_rev_Na == null)){ $scope.param_e_rev_Na = 50,0; }
				if(($scope.param_e_rev_K == "") || ($scope.param_e_rev_K == null)){ $scope.param_e_rev_K = -90,0; }
				if(($scope.param_e_rev_leak == "") || ($scope.param_e_rev_leak == null)){ $scope.param_e_rev_leak = 65,0; }
				if(($scope.param_e_rev_E == "") || ($scope.param_e_rev_E == null)){ $scope.param_e_rev_E = 0,0; }
				if(($scope.param_e_rev_I == "") || ($scope.param_e_rev_I == null)){ $scope.param_e_rev_I = -80,0; }
				if(($scope.param_tau_syn_E == "") || ($scope.param_tau_syn_E == null)){ $scope.param_tau_syn_E = 5,0; }
				if(($scope.param_tau_syn_I == "") || ($scope.param_tau_syn_I == null)){ $scope.param_tau_syn_I = 5,0; }
				if(($scope.init_v == "") || ($scope.init_v == null)){ $scope.init_v = -65,0; }
				if(($scope.init_gsyn_exc == "") || ($scope.init_gsyn_exc == null)){ $scope.init_gsyn_exc = 0,0; }
				if(($scope.init_gsyn_inh == "") || ($scope.init_gsyn_inh == null)){ $scope.init_gsyn_inh = 0,0; }
			}
			if($scope.celltype == "EIF_cond_alpha_isfa_ista"){
				if(($scope.param_tau_cm == "") || ($scope.param_tau_cm == null)){ $scope.param_tau_cm = 0,281; }
				if(($scope.param_tau_refrac == "") || ($scope.param_tau_refrac == null)){ $scope.param_tau_refrac = 0,0; }
				if(($scope.param_v_spike == "") || ($scope.param_v_spike == null)){ $scope.param_v_spike = 0,0; }
				if(($scope.param_v_reset == "") || ($scope.param_v_reset == null)){ $scope.param_v_reset = -70,6; }
				if(($scope.param_v_rest == "") || ($scope.param_v_rest == null)){ $scope.param_v_rest = -70,6; }
				if(($scope.param_tau_m == "") || ($scope.param_tau_m == null)){ $scope.param_tau_m = 9,3667; }
				if(($scope.param_i_offset == "") || ($scope.param_i_offset == null)){ $scope.param_i_offset = 0,0; }
				if(($scope.param_a == "") || ($scope.param_a == null)){ $scope.param_a = 4,0; }
				if(($scope.param_b == "") || ($scope.param_b == null)){ $scope.param_b = 0,0805; }
				if(($scope.param_delta_T == "") || ($scope.param_delta_T == null)){ $scope.param_delta_T = 2,0; }
				if(($scope.param_tau_w == "") || ($scope.param_tau_w == null)){ $scope.param_tau_w = 144,0; }
				if(($scope.param_v_thresh == "") || ($scope.param_v_thresh == null)){ $scope.param_v_thresh = -50,4; }
				if(($scope.param_e_rev_E == "") || ($scope.param_e_rev_E == null)){ $scope.param_e_rev_E = 0,0; }
				if(($scope.param_tau_syn_E == "") || ($scope.param_tau_syn_E == null)){ $scope.param_tau_syn_E = 5,0; }
				if(($scope.param_e_rev_I == "") || ($scope.param_e_rev_I == null)){ $scope.param_e_rev_I = -80,0; }
				if(($scope.param_tau_syn_I == "") || ($scope.param_tau_syn_I == null)){ $scope.param_tau_syn_I = 5,0; }
				if(($scope.init_v == "") || ($scope.init_v == null)){ $scope.init_v = -65,0; }
				if(($scope.init_w == "") || ($scope.init_w == null)){ $scope.init_w = 0,0; }
				if(($scope.init_gsyn_exc == "") || ($scope.init_gsyn_exc == null)){ $scope.init_gsyn_exc = 0,0; }
				if(($scope.init_gsyn_inh == "") || ($scope.init_gsyn_inh == null)){ $scope.init_gsyn_inh = 0,0; }
			}
			if($scope.celltype == "SpikeSourcePoisson"){
				if(($scope.param_rate == "") || ($scope.param_rate == null)){ $scope.param_rate = 1; }
				if(($scope.param_start == "") || ($scope.param_start == null)){ $scope.param_start = 0; }
				if(($scope.param_duration == "") || ($scope.param_duration == null)){ $scope.param_duration = 10000000000; }
			}
			if($scope.celltype == "SpikeSourceArray"){
				if(($scope.param_duration == "") || ($scope.param_duration == null)){ $scope.param_duration = 10000000000; }
			}
		};

		$scope.updateDist = function(class_param, dist){
			console.log("updateDist" + dist);
			if(dist == 0){
				document.getElementById(class_param + "_dist_0").classList.add("active");
				document.getElementById(class_param + "_dist_1").classList.remove("active");
				document.getElementById(class_param + "_dist_2").classList.remove("active");
				document.getElementById(class_param + "_dist_3").classList.remove("active");
			}
			if(dist == 1){
				document.getElementById(class_param + "_dist_0").classList.remove("active");
				document.getElementById(class_param + "_dist_1").classList.add("active");
				document.getElementById(class_param + "_dist_2").classList.remove("active");
				document.getElementById(class_param + "_dist_3").classList.remove("active");
			}
			if(dist == 2){
				document.getElementById(class_param + "_dist_0").classList.remove("active");
				document.getElementById(class_param + "_dist_1").classList.remove("active");
				document.getElementById(class_param + "_dist_2").classList.add("active");
				document.getElementById(class_param + "_dist_3").classList.remove("active");
			}
			if(dist == 3){
				document.getElementById(class_param + "_dist_0").classList.remove("active");
				document.getElementById(class_param + "_dist_1").classList.remove("active");
				document.getElementById(class_param + "_dist_2").classList.remove("active");
				document.getElementById(class_param + "_dist_3").classList.add("active");
			}
		};

		if(($scope.celltype == "") || ($scope.celltype == null)){
			$scope.celltype = "IF_curr_alpha";
		}
		$scope.beforeClose = function(){
			if(($scope.name_value == "") || ($scope.name_value == null)){
				$scope.msgAlert = "Name is required."
			}
			else if(($scope.size == null) || ($scope.size.toString() == "")){
				$scope.msgAlert = "Size value is required."
			} else{
				$scope.close()
			}
		};
		$scope.close = function() {
			close({
				name_value: $scope.name_value,
				// level: $scope.level,
				size: $scope.size,
				celltype: $scope.celltype,
				param_v_rest: $scope.param_v_rest,
				param_cm: $scope.param_cm,
				param_tau_m: $scope.param_tau_m,
				param_tau_refrac: $scope.param_tau_refrac,
				param_tau_syn_E: $scope.param_tau_syn_E,
				param_tau_syn_I: $scope.param_tau_syn_I,
				param_i_offset: $scope.param_i_offset,
				param_v_reset: $scope.param_v_reset,
				param_v_thresh: $scope.param_v_thresh,
				param_e_rev_E: $scope.param_e_rev_E,
				param_e_rev_I: $scope.param_e_rev_I,
				param_gbar_Na: $scope.param_gbar_Na,
				param_gbar_K: $scope.param_gbar_K,
				param_g_leak: $scope.param_g_leak,
				param_v_offset: $scope.param_v_offset,
				param_e_rev_Na: $scope.param_e_rev_Na,
				param_e_rev_K: $scope.param_e_rev_K,
				param_e_rev_leak: $scope.param_e_rev_leak,
				param_tau_cm: $scope.param_tau_cm,
				param_v_spike: $scope.param_v_spike,
				param_a: $scope.param_a,
				param_b: $scope.param_b,
				param_delta_T: $scope.param_delta_T,
				param_tau_w: $scope.param_tau_w,
				init_isyn_exc: $scope.init_isyn_exc,
				init_isyn_inh: $scope.init_isyn_inh,
				init_gsyn_exc: $scope.init_gsyn_exc,
				init_gsyn_inh: $scope.init_gsyn_inh,
				init_v: $scope.init_v,
				init_w: $scope.init_w,
				Recording_spikes: $scope.Recording_spikes,
				Recording_v: $scope.Recording_v,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
				param_rate: $scope.param_rate,
				param_start: $scope.param_start,
				param_duration: $scope.param_duration,
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
				size: size,
				celltype: celltype,
				param_v_rest: param_v_rest,
				param_cm: param_cm,
				param_tau_m: param_tau_m,
				param_tau_refrac: param_tau_refrac,
				param_tau_syn_E: param_tau_syn_E,
				param_tau_syn_I: param_tau_syn_I,
				param_i_offset: param_i_offset,
				param_v_reset: param_v_reset,
				param_v_thresh: param_v_thresh,
				param_e_rev_E: param_e_rev_E,
				param_e_rev_I: param_e_rev_I,
				param_gbar_Na: param_gbar_Na,
				param_gbar_K: param_gbar_K,
				param_g_leak: param_g_leak,
				param_v_offset: param_v_offset,
				param_e_rev_Na: param_e_rev_Na,
				param_e_rev_K: param_e_rev_K,
				param_e_rev_leak: param_e_rev_leak,
				param_tau_cm: param_tau_cm,
				param_v_spike: param_v_spike,
				param_a: param_a,
				param_b: param_b,
				param_delta_T: param_delta_T,
				param_tau_w: param_tau_w,
				init_isyn_exc: init_isyn_exc,
				init_isyn_inh: init_isyn_inh,
				init_gsyn_exc: init_gsyn_exc,
				init_gsyn_inh: init_gsyn_inh,
				init_v: init_v,
				init_w: init_w,
				Recording_spikes: $scope.Recording_spikes,
				Recording_v: $scope.Recording_v,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
				param_rate: $scope.param_rate,
				param_start: $scope.param_start,
				param_duration: $scope.param_duration,
			}, 100); // close, but give 100ms for bootstrap to animate
			$('.modal-backdrop').remove();
		};
	}
]);
