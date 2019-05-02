var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('PopDialogController', ['$scope', '$element', 'title', 'close', 'name_value', 'size', 'celltype',
'v_rest_dist', 'param_v_rest_dist', 'param_v_rest', 'param_v_rest_distribution', 'param_v_rest_p1', 'param_v_rest_p2', 'param_v_rest_fx',
'param_cm_dist', 'param_cm', 'param_cm_distribution', 'param_cm_p1', 'param_cm_p2', 'param_cm_fx',
'param_tau_m_dist', 'param_tau_m', 'param_tau_m_distribution', 'param_tau_m_p1', 'param_tau_m_p2', 'param_tau_m_fx',
'param_tau_refrac_dist', 'param_tau_refrac', 'param_tau_refrac_distribution', 'param_tau_refrac_p1', 'param_tau_refrac_p2', 'param_tau_refrac_fx',
'param_tau_syn_E_dist', 'param_tau_syn_E', 'param_tau_syn_E_distribution', 'param_tau_syn_E_p1', 'param_tau_syn_E_p2', 'param_tau_syn_E_fx',
'param_tau_syn_I_dist', 'param_tau_syn_I', 'param_tau_syn_I_distribution', 'param_tau_syn_I_p1', 'param_tau_syn_I_p2', 'param_tau_syn_I_fx',
'param_i_offset_dist', 'param_i_offset', 'param_i_offset_distribution', 'param_i_offset_p1', 'param_i_offset_p2', 'param_i_offset_fx',
'param_v_reset_dist', 'param_v_reset', 'param_v_reset_distribution', 'param_v_reset_p1', 'param_v_reset_p2', 'param_v_reset_fx',
'param_v_thresh_dist', 'param_v_thresh', 'param_v_thresh_distribution', 'param_v_thresh_p1', 'param_v_thresh_p2', 'param_v_thresh_fx', 
'param_e_rev_E_dist', 'param_e_rev_E', 'param_e_rev_E_distribution', 'param_e_rev_E_p1', 'param_e_rev_E_p2', 'param_e_rev_E_fx',
'param_e_rev_I_dist', 'param_e_rev_I', 'param_e_rev_I_distribution', 'param_e_rev_I_p1', 'param_e_rev_I_p2', 'param_e_rev_I_fx',
'param_gbar_Na_dist', 'param_gbar_Na', 'param_gbar_Na_distribution', 'param_gbar_Na_p1', 'param_gbar_Na_p2', 'param_gbar_Na_fx',
'param_gbar_K_dist', 'param_gbar_K', 'param_gbar_K_distribution', 'param_gbar_K_p1', 'param_gbar_K_p2', 'param_gbar_K_fx',
'param_g_leak_dist', 'param_g_leak', 'param_g_leak_distribution', 'param_g_leak_p1', 'param_g_leak_p2', 'param_g_leak_fx',
'param_v_offset_dist', 'param_v_offset', 'param_v_offset_distribution', 'param_v_offset_p1', 'param_v_offset_p2', 'param_v_offset_fx',
'param_e_rev_Na_dist', 'param_e_rev_Na', 'param_e_rev_Na_distribution', 'param_e_rev_Na_p1', 'param_e_rev_Na_p2', 'param_e_rev_Na_fx',
'param_e_rev_K_dist', 'param_e_rev_K', 'param_e_rev_K_distribution', 'param_e_rev_K_p1', 'param_e_rev_K_p2', 'param_e_rev_K_fx',
'param_e_rev_leak_dist', 'param_e_rev_leak', 'param_e_rev_leak_distribution', 'param_e_rev_leak_p1', 'param_e_rev_leak_p2', 'param_e_rev_leak_fx',
'param_tau_cm', 
'param_v_spike_dist', 'param_v_spike', 'param_v_spike_distribution', 'param_v_spike_p1', 'param_v_spike_p2', 'param_v_spike_fx',
'param_a_dist', 'param_a', 'param_a_distribution', 'param_a_p1', 'param_a_p2', 'param_a_fx',
'param_b_dist', 'param_b', 'param_b_distribution', 'param_b_p1', 'param_b_p2', 'param_b_fx',
'param_delta_T_dist', 'param_delta_T', 'param_delta_T_distribution', 'param_delta_T_p1', 'param_delta_T_p2', 'param_delta_T_fx',
'param_tau_w_dist', 'param_tau_w', 'param_tau_w_distribution', 'param_tau_w_p1', 'param_tau_w_p2', 'param_tau_w_fx',
'init_isyn_exc', 
'init_isyn_inh', 
'init_gsyn_exc', 
'init_gsyn_inh', 
'init_v_dist', 'init_v', 'init_v_distribution', 'init_v_p1', 'init_v_p2', 'init_v_fx',
'init_w_dist', 'init_w', 'init_w_distribution', 'init_w_p1', 'init_w_p2', 'init_w_fx',
'Recording_spikes', 
'Recording_v', 
'Simulation_time', 
'Simulation_name', 
'param_rate_dist', 'param_rate', 'param_rate_p1', 'param_rate_p2', 'param_rate_fx',
'param_start_dist', 'param_start', 'param_start_p1', 'param_start_p2', 'param_start_fx',
'param_duration_dist', 'param_duration', 'param_duration_p1', 'param_duration_p2', 'param_duration_fx',
	function($scope, $element, title, close, name_value, size, celltype,
		v_rest_dist, param_v_rest_dist, param_v_rest, param_v_rest_distribution, param_v_rest_p1, param_v_rest_p2, param_v_rest_fx,
		param_cm_dist, param_cm, param_cm_distribution, param_cm_p1, param_cm_p2, param_cm_fx,
		param_tau_m_dist, param_tau_m, param_tau_m_distribution, param_tau_m_p1, param_tau_m_p2, param_tau_m_fx,
		param_tau_refrac_dist, param_tau_refrac, param_tau_refrac_distribution, param_tau_refrac_p1, param_tau_refrac_p2, param_tau_refrac_fx,
		param_tau_syn_E_dist, param_tau_syn_E, param_tau_syn_E_distribution, param_tau_syn_E_p1, param_tau_syn_E_p2, param_tau_syn_E_fx,
		param_tau_syn_I_dist, param_tau_syn_I, param_tau_syn_I_distribution, param_tau_syn_I_p1, param_tau_syn_I_p2, param_tau_syn_I_fx,
		param_i_offset_dist, param_i_offset, param_i_offset_distribution, param_i_offset_p1, param_i_offset_p2, param_i_offset_fx,
		param_v_reset_dist, param_v_reset, param_v_reset_distribution, param_v_reset_p1, param_v_reset_p2, param_v_reset_fx,
		param_v_thresh_dist, param_v_thresh, param_v_thresh_distribution, param_v_thresh_p1, param_v_thresh_p2, param_v_thresh_fx, 
		param_e_rev_E_dist, param_e_rev_E, param_e_rev_E_distribution, param_e_rev_E_p1, param_e_rev_E_p2, param_e_rev_E_fx,
		param_e_rev_I_dist, param_e_rev_I, param_e_rev_I_distribution, param_e_rev_I_p1, param_e_rev_I_p2, param_e_rev_I_fx,
		param_gbar_Na_dist, param_gbar_Na, param_gbar_Na_distribution, param_gbar_Na_p1, param_gbar_Na_p2, param_gbar_Na_fx,
		param_gbar_K_dist, param_gbar_K, param_gbar_K_distribution, param_gbar_K_p1, param_gbar_K_p2, param_gbar_K_fx,
		param_g_leak_dist, param_g_leak, param_g_leak_distribution, param_g_leak_p1, param_g_leak_p2, param_g_leak_fx,
		param_v_offset_dist, param_v_offset, param_v_offset_distribution, param_v_offset_p1, param_v_offset_p2, param_v_offset_fx,
		param_e_rev_Na_dist, param_e_rev_Na, param_e_rev_Na_distribution, param_e_rev_Na_p1, param_e_rev_Na_p2, param_e_rev_Na_fx,
		param_e_rev_K_dist, param_e_rev_K, param_e_rev_K_distribution, param_e_rev_K_p1, param_e_rev_K_p2, param_e_rev_K_fx,
		param_e_rev_leak_dist, param_e_rev_leak, param_e_rev_leak_distribution, param_e_rev_leak_p1, param_e_rev_leak_p2, param_e_rev_leak_fx,
		param_tau_cm, 
		param_v_spike_dist, param_v_spike, param_v_spike_distribution, param_v_spike_p1, param_v_spike_p2, param_v_spike_fx,
		param_a_dist, param_a, param_a_distribution, param_a_p1, param_a_p2, param_a_fx,
		param_b_dist, param_b, param_b_distribution, param_b_p1, param_b_p2, param_b_fx,
		param_delta_T_dist, param_delta_T, param_delta_T_distribution, param_delta_T_p1, param_delta_T_p2, param_delta_T_fx,
		param_tau_w_dist, param_tau_w, param_tau_w_distribution, param_tau_w_p1, param_tau_w_p2, param_tau_w_fx,
		init_isyn_exc, 
		init_isyn_inh, 
		init_gsyn_exc, 
		init_gsyn_inh, 
		init_v_dist, init_v, init_v_distribution, init_v_p1, init_v_p2, init_v_fx,
		init_w_dist, init_w, init_w_distribution, init_w_p1, init_w_p2, init_w_fx,
		Recording_spikes, 
		Recording_v, 
		Simulation_time, 
		Simulation_name, 
		param_rate_dist, param_rate, param_rate_p1, param_rate_p2, param_rate_fx,
		param_start_dist, param_start, param_start_p1, param_start_p2, param_start_fx,
		param_duration_dist, param_duration, param_duration_p1, param_duration_p2, param_duration_fx) {
				
		$scope.title = title;
		$scope.name_value = name_value;
		// $scope.level = level;
		$scope.size = size;
		$scope.celltype = celltype;
		$scope.param_v_rest = param_v_rest;
		$scope.param_v_rest_distribution = param_v_rest_distribution;
		$scope.param_v_rest_p1 = param_v_rest_p1;
		$scope.param_v_rest_p2 = param_v_rest_p2;
		$scope.param_v_rest_fx = param_v_rest_fx;
		$scope.param_cm = param_cm;
		$scope.param_cm_distribution = param_cm_distribution;
		$scope.param_cm_p1 = param_cm_p1;
		$scope.param_cm_p2 = param_cm_p2;
		$scope.param_cm_fx = param_cm_fx;
		$scope.param_tau_m = param_tau_m;
		$scope.param_tau_m_distribution = param_tau_m_distribution;
		$scope.param_tau_m_p1 = param_tau_m_p1;
		$scope.param_tau_m_p2 = param_tau_m_p2;
		$scope.param_tau_m_fx = param_tau_m_fx;
		$scope.param_tau_refrac = param_tau_refrac;
		$scope.param_tau_refrac_distribution = param_tau_refrac_distribution;
		$scope.param_tau_refrac_p1 = param_tau_refrac_p1;
		$scope.param_tau_refrac_p2 = param_tau_refrac_p2;
		$scope.param_tau_refrac_fx = param_tau_refrac_fx;
		$scope.param_tau_syn_E = param_tau_syn_E;
		$scope.param_tau_syn_E_distribution = param_tau_syn_E_distribution;
		$scope.param_tau_syn_E_p1 = param_tau_syn_E_p1;
		$scope.param_tau_syn_E_p2 = param_tau_syn_E_p2;
		$scope.param_tau_syn_E_fx = param_tau_syn_E_fx;
		$scope.param_tau_syn_I = param_tau_syn_I;
		$scope.param_tau_syn_I_distribution = param_tau_syn_I_distribution;
		$scope.param_tau_syn_I_p1 = param_tau_syn_I_p1;
		$scope.param_tau_syn_I_p2 = param_tau_syn_I_p2;
		$scope.param_tau_syn_I_fx = param_tau_syn_I_fx;
		$scope.param_i_offset = param_i_offset;
		$scope.param_i_offset_distribution = param_i_offset_distribution;
		$scope.param_i_offset_p1 = param_i_offset_p1;
		$scope.param_i_offset_p2 = param_i_offset_p2;
		$scope.param_i_offset_fx = param_i_offset_fx;
		$scope.param_v_reset = param_v_reset;
		$scope.param_v_reset_distribution = param_v_reset_distribution;
		$scope.param_v_reset_p1 = param_v_reset_p1;
		$scope.param_v_reset_p2 = param_v_reset_p2;
		$scope.param_v_reset_fx = param_v_reset_fx;
		$scope.param_v_thresh = param_v_thresh;
		$scope.param_e_rev_E = param_e_rev_E;
		$scope.param_e_rev_E_distribution = param_e_rev_E_distribution;
		$scope.param_e_rev_E_p1 = param_e_rev_E_p1;
		$scope.param_e_rev_E_p2 = param_e_rev_E_p2;
		$scope.param_e_rev_E_fx = param_e_rev_E_fx;
		$scope.param_e_rev_I = param_e_rev_I;
		$scope.param_e_rev_I_distribution = param_e_rev_I_distribution;
		$scope.param_e_rev_I_p1 = param_e_rev_I_p1;
		$scope.param_e_rev_I_p2 = param_e_rev_I_p2;
		$scope.param_e_rev_I_fx = param_e_rev_I_fx;
		$scope.param_gbar_Na = param_gbar_Na;
		$scope.param_gbar_Na_distribution = param_gbar_Na_distribution;
		$scope.param_gbar_Na_p1 = param_gbar_Na_p1;
		$scope.param_gbar_Na_p2 = param_gbar_Na_p2;
		$scope.param_gbar_Na_fx = param_gbar_Na_fx;
		$scope.param_gbar_K = param_gbar_K;
		$scope.param_gbar_K_distribution = param_gbar_K_distribution;
		$scope.param_gbar_K_p1 = param_gbar_K_p1;
		$scope.param_gbar_K_p2 = param_gbar_K_p2;
		$scope.param_gbar_K_fx = param_gbar_K_fx;
		$scope.param_g_leak = param_g_leak;
		$scope.param_g_leak_distribution = param_g_leak_distribution;
		$scope.param_g_leak_p1 = param_g_leak_p1;
		$scope.param_g_leak_p2 = param_g_leak_p2;
		$scope.param_g_leak_fx = param_g_leak_fx;
		$scope.param_v_offset = param_v_offset;
		$scope.param_v_offset_distribution = param_v_offset_distribution;
		$scope.param_v_offset_p1 = param_v_offset_p1;
		$scope.param_v_offset_p2 = param_v_offset_p2;
		$scope.param_v_offset_fx = param_v_offset_fx;
		$scope.param_e_rev_Na = param_e_rev_Na;
		$scope.param_e_rev_Na_distribution = param_e_rev_Na_distribution;
		$scope.param_e_rev_Na_p1 = param_e_rev_Na_p1;
		$scope.param_e_rev_Na_p2 = param_e_rev_Na_p2;
		$scope.param_e_rev_Na_fx = param_e_rev_Na_fx;
		$scope.param_e_rev_K = param_e_rev_K;
		$scope.param_e_rev_K_distribution = param_e_rev_K_distribution;
		$scope.param_e_rev_K_p1 = param_e_rev_K_p1;
		$scope.param_e_rev_K_p2 = param_e_rev_K_p2;
		$scope.param_e_rev_K_fx = param_e_rev_K_fx;
		$scope.param_e_rev_leak = param_e_rev_leak;
		$scope.param_e_rev_leak_distribution = param_e_rev_leak_distribution;
		$scope.param_e_rev_leak_p1 = param_e_rev_leak_p1;
		$scope.param_e_rev_leak_p2 = param_e_rev_leak_p2;
		$scope.param_e_rev_leak_fx = param_e_rev_leak_fx;
		$scope.param_tau_cm = param_tau_cm;
		$scope.param_v_spike_dist = param_v_spike_dist;
		$scope.param_v_spike = param_v_spike;
		$scope.param_v_spike_distribution = param_v_spike_distribution;
		$scope.param_v_spike_p1 = param_v_spike_p1;
		$scope.param_v_spike_p2 = param_v_spike_p2;
		$scope.param_v_spike_fx = param_v_spike_fx;
		$scope.param_a_dist = param_a_dist;
		$scope.param_a = param_a;
		$scope.param_a_distribution = param_a_distribution;
		$scope.param_a_p1 = param_a_p1;
		$scope.param_a_p2 = param_a_p2;
		$scope.param_a_fx = param_a_fx;
		$scope.param_b_dist = param_b_dist;
		$scope.param_b = param_b;
		$scope.param_b_distribution = param_b_distribution;
		$scope.param_b_p1 = param_b_p1;
		$scope.param_b_p2 = param_b_p2;
		$scope.param_b_fx = param_b_fx;
		$scope.param_delta_T_dist = param_delta_T_dist;
		$scope.param_delta_T = param_delta_T;
		$scope.param_delta_T_distribution = param_delta_T_distribution;
		$scope.param_delta_T_p1 = param_delta_T_p1;
		$scope.param_delta_T_p2 = param_delta_T_p2;
		$scope.param_delta_T_fx = param_delta_T_fx;
		$scope.param_tau_w_dist = param_tau_w_dist;
		$scope.param_tau_w = param_tau_w;
		$scope.param_tau_w_distribution = param_tau_w_distribution;
		$scope.param_tau_w_p1 = param_tau_w_p1;
		$scope.param_tau_w_p2 = param_tau_w_p2;
		$scope.param_tau_w_fx = param_tau_w_fx;
		$scope.init_isyn_exc = init_isyn_exc;
		$scope.init_isyn_inh = init_isyn_inh;
		$scope.init_gsyn_exc = init_gsyn_exc;
		$scope.init_gsyn_inh = init_gsyn_inh;
		$scope.init_v_dist = init_v_dist;
		$scope.init_v = init_v;
		$scope.init_v_distribution = init_v_distribution;
		$scope.init_v_p1 = init_v_p1;
		$scope.init_v_p2 = init_v_p2;
		$scope.init_v_fx = init_v_fx;
		$scope.init_w_dist = init_w_dist;
		$scope.init_w = init_w;
		$scope.init_w_distribution = init_w_distribution;
		$scope.init_w_p1 = init_w_p1;
		$scope.init_w_p2 = init_w_p2;
		$scope.init_w_fx = init_w_fx;
		$scope.Recording_spikes = Recording_spikes;
		$scope.Recording_v = Recording_v;
		$scope.Simulation_time = Simulation_time;
		$scope.Simulation_name = Simulation_name;
		$scope.param_rate_dist = param_rate_dist;
		$scope.param_rate = param_rate;
		$scope.param_rate_p1 = param_rate_p1;
		$scope.param_rate_p2 = param_rate_p2;
		$scope.param_rate_fx = param_rate_fx;
		$scope.param_start_dist = param_start_dist;
		$scope.param_start = param_start;
		$scope.param_start_p1 = param_start_p1;
		$scope.param_start_p2 = param_start_p2;
		$scope.param_start_fx = param_start_fx;
		$scope.param_duration_dist = param_duration_dist;
		$scope.param_duration = param_duration;
		$scope.param_duration_p1 = param_duration_p1;
		$scope.param_duration_p2 = param_duration_p2;
		$scope.param_duration_fx = param_duration_fx;

		if(($scope.v_rest_dist == "") || ($scope.v_rest_dist == null)){
			$scope.v_rest_dist = 0;
		}
		if(($scope.param_v_rest_dist == "") || ($scope.param_v_rest_dist == null)){
			$scope.param_v_rest_dist = 0;
		}
		if(($scope.param_cm_dist == "") || ($scope.param_cm_dist == null)){
			$scope.param_cm_dist = 0;
		}
		if(($scope.param_tau_m_dist == "") || ($scope.param_tau_m_dist == null)){
			$scope.param_tau_m_dist = 0;
		}
		if(($scope.param_tau_refrac_dist == "") || ($scope.param_tau_refrac_dist == null)){
			$scope.param_tau_refrac_dist = 0;
		}
		if(($scope.param_tau_syn_E_dist == "") || ($scope.param_tau_syn_E_dist == null)){
			$scope.param_tau_syn_E_dist = 0;
		}
		if(($scope.param_tau_syn_I_dist == "") || ($scope.param_tau_syn_I_dist == null)){
			$scope.param_tau_syn_I_dist = 0;
		}
		if(($scope.param_i_offset_dist == "") || ($scope.param_i_offset_dist == null)){
			$scope.param_i_offset_dist = 0;
		}
		if(($scope.param_v_reset_dist == "") || ($scope.param_v_reset_dist == null)){
			$scope.param_v_reset_dist = 0;
		}
		if(($scope.param_cm_param_v_thresh_distdist == "") || ($scope.param_v_thresh_dist == null)){
			$scope.param_v_thresh_dist = 0;
		}
		if(($scope.init_v_dist == "") || ($scope.init_v_dist == null)){
			$scope.init_v_dist = 0;
		}
		if(($scope.init_w_dist == "") || ($scope.init_w_dist == null)){
			$scope.init_w_dist = 0;
		}
		if(($scope.param_e_rev_E_dist == "") || ($scope.param_e_rev_E_dist == null)){
			$scope.param_e_rev_E_dist = 0;
		}
		if(($scope.param_e_rev_I_dist == "") || ($scope.param_e_rev_I_dist == null)){
			$scope.param_e_rev_I_dist = 0;
		}
		if(($scope.param_gbar_Na_dist == "") || ($scope.param_gbar_Na_dist == null)){
			$scope.param_gbar_Na_dist = 0;
		}
		if(($scope.param_gbar_K_dist == "") || ($scope.param_gbar_K_dist == null)){
			$scope.param_gbar_K_dist = 0;
		}
		if(($scope.param_g_leak_dist == "") || ($scope.param_g_leak_dist == null)){
			$scope.param_g_leak_dist = 0;
		}
		if(($scope.param_v_offset_dist == "") || ($scope.param_v_offset_dist == null)){
			$scope.param_v_offset_dist = 0;
		}
		if(($scope.param_e_rev_Na_dist == "") || ($scope.param_e_rev_Na_dist == null)){
			$scope.param_e_rev_Na_dist = 0;
		}
		if(($scope.param_e_rev_K_dist == "") || ($scope.param_e_rev_K_dist == null)){
			$scope.param_e_rev_K_dist = 0;
		}
		if(($scope.param_e_rev_leak_dist == "") || ($scope.param_e_rev_leak_dist == null)){
			$scope.param_e_rev_leak_dist = 0;
		}
		if(($scope.param_v_spike_dist == "") || ($scope.param_v_spike_dist == null)){
			$scope.param_v_spike_dist = 0;
		}
		if(($scope.param_a_dist == "") || ($scope.param_a_dist == null)){
			$scope.param_a_dist = 0;
		}
		if(($scope.param_b_dist == "") || ($scope.param_b_dist == null)){
			$scope.param_b_dist = 0;
		}
		if(($scope.param_delta_T_dist == "") || ($scope.param_delta_T_dist == null)){
			$scope.param_delta_T_dist = 0;
		}
		if(($scope.param_tau_w_dist == "") || ($scope.param_tau_w_dist == null)){
			$scope.param_tau_w_dist = 0;
		}
		if(($scope.param_rate_dist == "") || ($scope.param_rate_dist == null)){
			$scope.param_rate_dist = 0;
		}
		if(($scope.param_start_dist == "") || ($scope.param_start_dist == null)){
			$scope.param_start_dist = 0;
		}
		if(($scope.param_duration_dist == "") || ($scope.param_duration_dist == null)){
			$scope.param_duration_dist = 0;
		}
		if(($scope.param_spike_times_dist == "") || ($scope.param_spike_times_dist == null)){
			$scope.param_spike_times_dist = 0;
		}
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
				v_rest_dist: $scope.v_rest_dist,
				param_v_rest_dist: $scope.param_v_rest_dist,
				param_v_rest: $scope.param_v_rest,
				param_v_rest_distribution: $scope.param_v_rest_distribution,
				param_v_rest_p1: $scope.param_v_rest_p1,
				param_v_rest_p2: $scope.param_v_rest_p2, 
				param_v_rest_fx: $scope.param_v_rest_fx,
				param_cm_dist: $scope.param_cm_dist,
				param_cm: $scope.param_cm,
				param_cm_distribution: $scope.param_cm_distribution,
				param_cm_p1: $scope.param_cm_p1, 
				param_cm_p2: $scope.param_cm_p2, 
				param_cm_fx: $scope.param_cm_fx,
				param_tau_m_dist: $scope.param_tau_m_dist,
				param_tau_m: $scope.param_tau_m,
				param_tau_m_distribution: $scope.param_tau_m_distribution, 
				param_tau_m_p1: $scope.param_tau_m_p1, 
				param_tau_m_p2: $scope.param_tau_m_p2, 
				param_tau_m_fx: $scope.param_tau_m_fx,
				param_tau_refrac_dist: $scope.param_tau_refrac_dist,
				param_tau_refrac: $scope.param_tau_refrac,
				param_tau_refrac_distribution: $scope.param_tau_refrac_distribution,
				param_tau_refrac_p1: $scope.param_tau_refrac_p1,
				param_tau_refrac_p2: $scope.param_tau_refrac_p2,
				param_tau_refrac_fx: $scope.param_tau_refrac_fx,
				param_tau_syn_E_dist: $scope.param_tau_syn_E_dist,
				param_tau_syn_E: $scope.param_tau_syn_E,
				param_tau_syn_E_distribution: $scope.param_tau_syn_E_distribution,
				param_tau_syn_E_p1: $scope.param_tau_syn_E_p1,
				param_tau_syn_E_p2: $scope.param_tau_syn_E_p2,
				param_tau_syn_E_fx: $scope.param_tau_syn_E_fx,
				param_tau_syn_I_dist: $scope.param_tau_syn_E_dist,
				param_tau_syn_I: $scope.param_tau_syn_I,
				param_tau_syn_I_distribution: $scope.param_tau_syn_E_distribution,
				param_tau_syn_I_p1: $scope.param_tau_syn_E_p1,
				param_tau_syn_I_p2: $scope.param_tau_syn_E_p2,
				param_tau_syn_I_fx: $scope.param_tau_syn_E_fx,
				param_i_offset_dist: $scope.param_i_offset_dist,
				param_i_offset: $scope.param_i_offset,
				param_i_offset_distribution: $scope.param_i_offset_distribution,
				param_i_offset_p1: $scope.param_i_offset_p1,
				param_i_offset_p2: $scope.param_i_offset_p2,
				param_i_offset_fx: $scope.param_i_offset_fx,
				param_v_reset_dist: $scope.param_v_reset_dist,
				param_v_reset: $scope.param_v_reset,
				param_v_reset_distribution: $scope.param_v_reset_distribution,
				param_v_reset_p1: $scope.param_v_reset_p1,
				param_v_reset_p2: $scope.param_v_reset_p2,
				param_v_reset_fx: $scope.param_v_reset_fx,
				param_v_thresh_dist: $scope.param_v_thresh_dist,
				param_v_thresh: $scope.param_v_thresh,
				param_v_thresh_distribution: $scope.param_v_thresh_distribution,
				param_v_thresh_p1: $scope.param_v_thresh_p1,
				param_v_thresh_p2: $scope.param_v_thresh_p2,
				param_v_thresh_fx: $scope.param_v_thresh_fx,
				param_e_rev_E_dist: $scope.param_e_rev_E_dist,
				param_e_rev_E: $scope.param_e_rev_E,
				param_e_rev_E_distribution: $scope.param_e_rev_E_distribution,
				param_e_rev_E_p1: $scope.param_e_rev_E_p1,
				param_e_rev_E_p2: $scope.param_e_rev_E_p2,
				param_e_rev_E_fx: $scope.param_e_rev_E_fx,
				param_e_rev_I_dist: $scope.param_e_rev_I_dist,
				param_e_rev_I: $scope.param_e_rev_I,
				param_e_rev_I_distribution: $scope.param_e_rev_I_distribution,
				param_e_rev_I_p1: $scope.param_e_rev_I_p1,
				param_e_rev_I_p2: $scope.param_e_rev_I_p2,
				param_e_rev_I_fx: $scope.param_e_rev_I_fx,
				param_gbar_Na_dist: $scope.param_gbar_Na_dist,
				param_gbar_Na: $scope.param_gbar_Na,
				param_gbar_Na_distribution: $scope.param_gbar_Na_distribution,
				param_gbar_Na_p1: $scope.param_gbar_Na_p1,
				param_gbar_Na_p2: $scope.param_gbar_Na_p2,
				param_gbar_Na_fx: $scope.param_gbar_Na_fx,
				param_gbar_K_dist: $scope.param_gbar_K_dist,
				param_gbar_K: $scope.param_gbar_K,
				param_gbar_K_distribution: $scope.param_gbar_K_distribution,
				param_gbar_K_p1: $scope.param_gbar_K_p1,
				param_gbar_K_p2: $scope.param_gbar_K_p2,
				param_gbar_K_fx: $scope.param_gbar_K_fx,
				param_g_leak_dist: $scope.param_g_leak_dist,
				param_g_leak: $scope.param_g_leak,
				param_g_leak_distribution: $scope.param_g_leak_distribution,
				param_g_leak_p1: $scope.param_g_leak_p1,
				param_g_leak_p2: $scope.param_g_leak_p2,
				param_g_leak_fx: $scope.param_g_leak_fx,
				param_v_offset_dist: $scope.param_v_offset_dist,
				param_v_offset: $scope.param_v_offset,
				param_v_offset_distribution: $scope.param_v_offset_distribution,
				param_v_offset_p1: $scope.param_v_offset_p1,
				param_v_offset_p2: $scope.param_v_offset_p2,
				param_v_offset_fx: $scope.param_v_offset_fx,
				param_e_rev_Na_dist: $scope.param_e_rev_Na_dist,
				param_e_rev_Na: $scope.param_e_rev_Na,
				param_e_rev_Na_distribution: $scope.param_e_rev_Na_distribution,
				param_e_rev_Na_p1: $scope.param_e_rev_Na_p1,
				param_e_rev_Na_p2: $scope.param_e_rev_Na_p2,
				param_e_rev_Na_fx: $scope.param_e_rev_Na_fx,
				param_e_rev_K_dist: $scope.param_e_rev_K_dist,
				param_e_rev_K: $scope.param_e_rev_K,
				param_e_rev_K_distribution: $scope.param_e_rev_K_distribution,
				param_e_rev_K_p1: $scope.param_e_rev_K_p1,
				param_e_rev_K_p2: $scope.param_e_rev_K_p2,
				param_e_rev_K_fx: $scope.param_e_rev_K_fx,
				param_e_rev_leak_dist: $scope.param_e_rev_leak_dist,
				param_e_rev_leak: $scope.param_e_rev_leak,
				param_e_rev_leak_distribution: $scope.param_e_rev_leak_distribution,
				param_e_rev_leak_p1: $scope.param_e_rev_leak_p1,
				param_e_rev_leak_p2: $scope.param_e_rev_leak_p2,
				param_e_rev_leak_fx: $scope.param_e_rev_leak_fx,
				param_tau_cm: $scope.param_tau_cm,
				param_v_spike_dist: $scope.param_v_spike_dist,
				param_v_spike: $scope.param_v_spike,
				param_v_spike_distribution: $scope.param_v_spike_distribution,
				param_v_spike_p1: $scope.param_v_spike_p1,
				param_v_spike_p2: $scope.param_v_spike_p2,
				param_v_spike_fx: $scope.param_v_spike_fx,
				param_a_dist: $scope.param_a_dist,
				param_a: $scope.param_a,
				param_a_distribution: $scope.param_a_distribution,
				param_a_p1: $scope.param_a_p1,
				param_a_p2: $scope.param_a_p2,
				param_a_fx: $scope.param_a_fx,
				param_b_dist: $scope.param_b_dist,
				param_b: $scope.param_b,
				param_b_distribution: $scope.param_b_distribution,
				param_b_p1: $scope.param_b_p1,
				param_b_p2: $scope.param_b_p2,
				param_b_fx:$scope.param_b_fx,
				param_delta_T_dist: $scope.param_delta_T_dist,
				param_delta_T: $scope.param_delta_T,
				param_delta_T_distribution: $scope.param_delta_T_distribution,
				param_delta_T_p1: $scope.param_delta_T_p1,
				param_delta_T_p2: $scope.param_delta_T_p2,
				param_delta_T_fx: $scope.param_delta_T_fx,
				param_tau_w_dist: $scope.param_tau_w_dist,
				param_tau_w: $scope.param_tau_w,
				param_tau_w_distribution: $scope.param_tau_w_distribution,
				param_tau_w_p1: $scope.param_tau_w_p1,
				param_tau_w_p2: $scope.param_tau_w_p2,
				param_tau_w_fx: $scope.param_tau_w_fx,
				init_isyn_exc: $scope.init_isyn_exc,
				init_isyn_inh: $scope.init_isyn_inh,
				init_gsyn_exc: $scope.init_gsyn_exc,
				init_gsyn_inh: $scope.init_gsyn_inh,
				init_v_dist: $scope.init_v_dist,
				init_v: $scope.init_v,
				init_v_distribution: $scope.init_v_distribution,
				init_v_p1: $scope.init_v_p1,
				init_v_p2: $scope.init_v_p2,
				init_v_fx: $scope.init_v_fx,
				init_w_dist: $scope.init_w_dist,
				init_w: $scope.init_w,
				init_w_distribution: $scope.init_w_distribution,
				init_w_p1: $scope.init_w_p1,
				init_w_p2: $scope.init_w_p2,
				init_w_fx: $scope.init_w_fx,
				Recording_spikes: $scope.Recording_spikes,
				Recording_v: $scope.Recording_v,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
				param_rate_dist: $scope.param_rate_dist,
				param_rate: $scope.param_rate,
				param_rate_p1: $scope.param_rate_p1,
				param_rate_p2: $scope.param_rate_p2,
				param_rate_fx: $scope.param_rate_fx,
				param_start_dist: $scope.param_start_dist,
				param_start: $scope.param_start,
				param_start_p1: $scope.param_start_p1,
				param_start_p2: $scope.param_start_p2,
				param_start_fx: $scope.param_start_fx,
				param_duration_dist: $scope.param_duration_dist,
				param_duration: $scope.param_duration,
				param_duration_p1: $scope.param_duration_p1,
				param_duration_p2: $scope.param_duration_p2,
				param_duration_fx: $scope.param_duration_fx,
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
				name_value: $scope.name_value,
				// level: $scope.level,
				size: $scope.size,
				celltype: $scope.celltype,
				v_rest_dist: $scope.v_rest_dist,
				param_v_rest_dist: $scope.param_v_rest_dist,
				param_v_rest: $scope.param_v_rest,
				param_v_rest_distribution: $scope.param_v_rest_distribution,
				param_v_rest_p1: $scope.param_v_rest_p1,
				param_v_rest_p2: $scope.param_v_rest_p2, 
				param_v_rest_fx: $scope.param_v_rest_fx,
				param_cm_dist: $scope.param_cm_dist,
				param_cm: $scope.param_cm,
				param_cm_distribution: $scope.param_cm_distribution,
				param_cm_p1: $scope.param_cm_p1, 
				param_cm_p2: $scope.param_cm_p2, 
				param_cm_fx: $scope.param_cm_fx,
				param_tau_m_dist: $scope.param_tau_m_dist,
				param_tau_m: $scope.param_tau_m,
				param_tau_m_distribution: $scope.param_tau_m_distribution, 
				param_tau_m_p1: $scope.param_tau_m_p1, 
				param_tau_m_p2: $scope.param_tau_m_p2, 
				param_tau_m_fx: $scope.param_tau_m_fx,
				param_tau_refrac_dist: $scope.param_tau_refrac_dist,
				param_tau_refrac: $scope.param_tau_refrac,
				param_tau_refrac_distribution: $scope.param_tau_refrac_distribution,
				param_tau_refrac_p1: $scope.param_tau_refrac_p1,
				param_tau_refrac_p2: $scope.param_tau_refrac_p2,
				param_tau_refrac_fx: $scope.param_tau_refrac_fx,
				param_tau_syn_E_dist: $scope.param_tau_syn_E_dist,
				param_tau_syn_E: $scope.param_tau_syn_E,
				param_tau_syn_E_distribution: $scope.param_tau_syn_E_distribution,
				param_tau_syn_E_p1: $scope.param_tau_syn_E_p1,
				param_tau_syn_E_p2: $scope.param_tau_syn_E_p2,
				param_tau_syn_E_fx: $scope.param_tau_syn_E_fx,
				param_tau_syn_I_dist: $scope.param_tau_syn_E_dist,
				param_tau_syn_I: $scope.param_tau_syn_I,
				param_tau_syn_I_distribution: $scope.param_tau_syn_E_distribution,
				param_tau_syn_I_p1: $scope.param_tau_syn_E_p1,
				param_tau_syn_I_p2: $scope.param_tau_syn_E_p2,
				param_tau_syn_I_fx: $scope.param_tau_syn_E_fx,
				param_i_offset_dist: $scope.param_i_offset_dist,
				param_i_offset: $scope.param_i_offset,
				param_i_offset_distribution: $scope.param_i_offset_distribution,
				param_i_offset_p1: $scope.param_i_offset_p1,
				param_i_offset_p2: $scope.param_i_offset_p2,
				param_i_offset_fx: $scope.param_i_offset_fx,
				param_v_reset_dist: $scope.param_v_reset_dist,
				param_v_reset: $scope.param_v_reset,
				param_v_reset_distribution: $scope.param_v_reset_distribution,
				param_v_reset_p1: $scope.param_v_reset_p1,
				param_v_reset_p2: $scope.param_v_reset_p2,
				param_v_reset_fx: $scope.param_v_reset_fx,
				param_v_thresh_dist: $scope.param_v_thresh_dist,
				param_v_thresh: $scope.param_v_thresh,
				param_v_thresh_distribution: $scope.param_v_thresh_distribution,
				param_v_thresh_p1: $scope.param_v_thresh_p1,
				param_v_thresh_p2: $scope.param_v_thresh_p2,
				param_v_thresh_fx: $scope.param_v_thresh_fx,
				param_e_rev_E_dist: $scope.param_e_rev_E_dist,
				param_e_rev_E: $scope.param_e_rev_E,
				param_e_rev_E_distribution: $scope.param_e_rev_E_distribution,
				param_e_rev_E_p1: $scope.param_e_rev_E_p1,
				param_e_rev_E_p2: $scope.param_e_rev_E_p2,
				param_e_rev_E_fx: $scope.param_e_rev_E_fx,
				param_e_rev_I_dist: $scope.param_e_rev_I_dist,
				param_e_rev_I: $scope.param_e_rev_I,
				param_e_rev_I_distribution: $scope.param_e_rev_I_distribution,
				param_e_rev_I_p1: $scope.param_e_rev_I_p1,
				param_e_rev_I_p2: $scope.param_e_rev_I_p2,
				param_e_rev_I_fx: $scope.param_e_rev_I_fx,
				param_gbar_Na_dist: $scope.param_gbar_Na_dist,
				param_gbar_Na: $scope.param_gbar_Na,
				param_gbar_Na_distribution: $scope.param_gbar_Na_distribution,
				param_gbar_Na_p1: $scope.param_gbar_Na_p1,
				param_gbar_Na_p2: $scope.param_gbar_Na_p2,
				param_gbar_Na_fx: $scope.param_gbar_Na_fx,
				param_gbar_K_dist: $scope.param_gbar_K_dist,
				param_gbar_K: $scope.param_gbar_K,
				param_gbar_K_distribution: $scope.param_gbar_K_distribution,
				param_gbar_K_p1: $scope.param_gbar_K_p1,
				param_gbar_K_p2: $scope.param_gbar_K_p2,
				param_gbar_K_fx: $scope.param_gbar_K_fx,
				param_g_leak_dist: $scope.param_g_leak_dist,
				param_g_leak: $scope.param_g_leak,
				param_g_leak_distribution: $scope.param_g_leak_distribution,
				param_g_leak_p1: $scope.param_g_leak_p1,
				param_g_leak_p2: $scope.param_g_leak_p2,
				param_g_leak_fx: $scope.param_g_leak_fx,
				param_v_offset_dist: $scope.param_v_offset_dist,
				param_v_offset: $scope.param_v_offset,
				param_v_offset_distribution: $scope.param_v_offset_distribution,
				param_v_offset_p1: $scope.param_v_offset_p1,
				param_v_offset_p2: $scope.param_v_offset_p2,
				param_v_offset_fx: $scope.param_v_offset_fx,
				param_e_rev_Na_dist: $scope.param_e_rev_Na_dist,
				param_e_rev_Na: $scope.param_e_rev_Na,
				param_e_rev_Na_distribution: $scope.param_e_rev_Na_distribution,
				param_e_rev_Na_p1: $scope.param_e_rev_Na_p1,
				param_e_rev_Na_p2: $scope.param_e_rev_Na_p2,
				param_e_rev_Na_fx: $scope.param_e_rev_Na_fx,
				param_e_rev_K_dist: $scope.param_e_rev_K_dist,
				param_e_rev_K: $scope.param_e_rev_K,
				param_e_rev_K_distribution: $scope.param_e_rev_K_distribution,
				param_e_rev_K_p1: $scope.param_e_rev_K_p1,
				param_e_rev_K_p2: $scope.param_e_rev_K_p2,
				param_e_rev_K_fx: $scope.param_e_rev_K_fx,
				param_e_rev_leak_dist: $scope.param_e_rev_leak_dist,
				param_e_rev_leak: $scope.param_e_rev_leak,
				param_e_rev_leak_distribution: $scope.param_e_rev_leak_distribution,
				param_e_rev_leak_p1: $scope.param_e_rev_leak_p1,
				param_e_rev_leak_p2: $scope.param_e_rev_leak_p2,
				param_e_rev_leak_fx: $scope.param_e_rev_leak_fx,
				param_tau_cm: $scope.param_tau_cm,
				param_v_spike_dist: $scope.param_v_spike_dist,
				param_v_spike: $scope.param_v_spike,
				param_v_spike_distribution: $scope.param_v_spike_distribution,
				param_v_spike_p1: $scope.param_v_spike_p1,
				param_v_spike_p2: $scope.param_v_spike_p2,
				param_v_spike_fx: $scope.param_v_spike_fx,
				param_a_dist: $scope.param_a_dist,
				param_a: $scope.param_a,
				param_a_distribution: $scope.param_a_distribution,
				param_a_p1: $scope.param_a_p1,
				param_a_p2: $scope.param_a_p2,
				param_a_fx: $scope.param_a_fx,
				param_b_dist: $scope.param_b_dist,
				param_b: $scope.param_b,
				param_b_distribution: $scope.param_b_distribution,
				param_b_p1: $scope.param_b_p1,
				param_b_p2: $scope.param_b_p2,
				param_b_fx:$scope.param_b_fx,
				param_delta_T_dist: $scope.param_delta_T_dist,
				param_delta_T: $scope.param_delta_T,
				param_delta_T_distribution: $scope.param_delta_T_distribution,
				param_delta_T_p1: $scope.param_delta_T_p1,
				param_delta_T_p2: $scope.param_delta_T_p2,
				param_delta_T_fx: $scope.param_delta_T_fx,
				param_tau_w_dist: $scope.param_tau_w_dist,
				param_tau_w: $scope.param_tau_w,
				param_tau_w_distribution: $scope.param_tau_w_distribution,
				param_tau_w_p1: $scope.param_tau_w_p1,
				param_tau_w_p2: $scope.param_tau_w_p2,
				param_tau_w_fx: $scope.param_tau_w_fx,
				init_isyn_exc: $scope.init_isyn_exc,
				init_isyn_inh: $scope.init_isyn_inh,
				init_gsyn_exc: $scope.init_gsyn_exc,
				init_gsyn_inh: $scope.init_gsyn_inh,
				init_v_dist: $scope.init_v_dist,
				init_v: $scope.init_v,
				init_v_distribution: $scope.init_v_distribution,
				init_v_p1: $scope.init_v_p1,
				init_v_p2: $scope.init_v_p2,
				init_v_fx: $scope.init_v_fx,
				init_w_dist: $scope.init_w_dist,
				init_w: $scope.init_w,
				init_w_distribution: $scope.init_w_distribution,
				init_w_p1: $scope.init_w_p1,
				init_w_p2: $scope.init_w_p2,
				init_w_fx: $scope.init_w_fx,
				Recording_spikes: $scope.Recording_spikes,
				Recording_v: $scope.Recording_v,
				Simulation_time: $scope.Simulation_time,
				Simulation_name: $scope.Simulation_name,
				param_rate_dist: $scope.param_rate_dist,
				param_rate: $scope.param_rate,
				param_rate_p1: $scope.param_rate_p1,
				param_rate_p2: $scope.param_rate_p2,
				param_rate_fx: $scope.param_rate_fx,
				param_start_dist: $scope.param_start_dist,
				param_start: $scope.param_start,
				param_start_p1: $scope.param_start_p1,
				param_start_p2: $scope.param_start_p2,
				param_start_fx: $scope.param_start_fx,
				param_duration_dist: $scope.param_duration_dist,
				param_duration: $scope.param_duration,
				param_duration_p1: $scope.param_duration_p1,
				param_duration_p2: $scope.param_duration_p2,
				param_duration_fx: $scope.param_duration_fx,
			}, 100); // close, but give 100ms for bootstrap to animate
			$('.modal-backdrop').remove();
		};
	}
]);
