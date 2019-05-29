var graphSchemaApp = angular.module('graphSchemaApp');

// function to generate string of python script
graphSchemaApp.value('python_script_string', function(cells, hardware_platform, Simulation_time, Simulation_name) {
    var str_inst = "";
    var str_rwd = ""; //string for run and write_data function
    angular.forEach(cells, function(val, key) {
        console.log("data cell : " + val.data_cell);
        if((val.data_cell == undefined) | (val.data_cell == null)) {
            if(val.edge == true){ // Is user doesn't set his own value, generate default line
                val.data_cell = '{' +
                    '"celltype": "empty_edge"' +
                '}';
            } else {
                val.data_cell = '{' +
                    '"celltype": "empty_no_edge"' +
                '}';
            }
        }
        if((val.value == null) && (val.edge == true)){
            val.value = "default_edge";
        }

        if(val.value != undefined){
            try {
                var json_pop_param = JSON.parse(val.data_cell);
            } catch(error) {
                var json_pop_param = {celltype: "error"};
            }
            if(json_pop_param.celltype != "error"){
                try {
                    if(json_pop_param.v_rest_dist == 0){
                        param_v_rest = json_pop_param.param_v_rest;
                    } else if(json_pop_param.v_rest_dist == 1){
                        param_v_rest = "RandomDistribution('" +
                            json_pop_param.param_v_rest_distribution+"', (" + 
                            json_pop_param.param_v_rest_p1 + ", " + 
                            json_pop_param.param_v_rest_p2 + 
                        "))";
                    } else if(json_pop_param.v_rest_dist == 2){
                        param_v_rest = json_pop_param.param_v_rest_fx;
                    }

                    if(json_pop_param.param_cm_dist == 0){
                        param_cm = json_pop_param.param_cm;
                    } else if(json_pop_param.param_cm_dist == 1){
                        param_cm = "RandomDistribution('" +
                            json_pop_param.param_cm_distribution+"', (" + 
                            json_pop_param.param_cm_p1 + ", " + 
                            json_pop_param.param_cm_p2 + 
                        "))";
                    } else if(json_pop_param.param_cm_dist == 2){
                        param_cm = json_pop_param.param_cm_rest_fx;
                    }

                    if(json_pop_param.param_tau_m_dist == 0){
                        param_tau_m = json_pop_param.param_tau_m;
                    } else if(json_pop_param.param_tau_m_dist == 1){
                        param_tau_m = "RandomDistribution('" +
                            json_pop_param.param_tau_m_distribution+"', (" + 
                            json_pop_param.param_tau_m_p1 + ", " + 
                            json_pop_param.param_tau_m_p2 + 
                        "))";
                    } else if(json_pop_param.param_tau_m_dist == 2){
                        param_tau_m = json_pop_param.param_tau_m_fx;
                    }

                    if(json_pop_param.param_tau_refrac_dist == 0){
                        param_tau_refrac = json_pop_param.param_tau_refrac;
                    } else if(json_pop_param.param_tau_refrac_dist == 1){
                        param_tau_refrac = "RandomDistribution('" +
                            json_pop_param.param_tau_refrac_distribution+"', (" + 
                            json_pop_param.param_tau_refrac_p1 + ", " + 
                            json_pop_param.param_tau_refrac_p2 + 
                        "))";
                    } else if(json_pop_param.param_tau_refrac_dist == 2){
                        param_tau_refrac = json_pop_param.param_tau_refrac_fx;
                    }

                    if(json_pop_param.param_tau_syn_E_dist == 0){
                        param_tau_syn_E = json_pop_param.param_tau_syn_E;
                    } else if(json_pop_param.param_tau_syn_E_dist == 1){
                        param_tau_syn_E = "RandomDistribution('" +
                            json_pop_param.param_tau_syn_E_distribution+"', (" + 
                            json_pop_param.param_tau_syn_E_p1 + ", " + 
                            json_pop_param.param_tau_syn_E_p2 + 
                        "))";
                    } else if(json_pop_param.param_tau_syn_E_dist == 2){
                        param_tau_syn_E = json_pop_param.param_tau_syn_E_fx;
                    }

                    if(json_pop_param.param_tau_syn_I_dist == 0){
                        param_tau_syn_I = json_pop_param.param_tau_syn_I;
                    } else if(json_pop_param.param_tau_syn_I_dist == 1){
                        param_tau_syn_I = "RandomDistribution('" +
                            json_pop_param.param_tau_syn_I_distribution+"', (" + 
                            json_pop_param.param_tau_syn_I_p1 + ", " + 
                            json_pop_param.param_tau_syn_I_p2 + 
                        "))";
                    } else if(json_pop_param.param_tau_syn_I_dist == 2){
                        param_tau_syn_I = json_pop_param.param_tau_syn_I_fx;
                    }

                    if(json_pop_param.param_i_offset_dist == 0){
                        param_i_offset = json_pop_param.param_i_offset;
                    } else if(json_pop_param.param_i_offset_dist == 1){
                        param_i_offset = "RandomDistribution('" +
                            json_pop_param.param_i_offset_distribution+"', (" + 
                            json_pop_param.param_i_offset_p1 + ", " + 
                            json_pop_param.param_i_offset_p2 + 
                        "))";
                    } else if(json_pop_param.param_i_offset_dist == 2){
                        param_i_offset = json_pop_param.param_i_offset_fx;
                    }

                    if(json_pop_param.param_v_reset_dist == 0){
                        param_v_reset = json_pop_param.param_v_reset;
                    } else if(json_pop_param.param_v_reset_dist == 1){
                        param_v_reset = "RandomDistribution('" +
                            json_pop_param.param_v_reset_distribution+"', (" + 
                            json_pop_param.param_v_reset_p1 + ", " + 
                            json_pop_param.param_v_reset_p2 + 
                        "))";
                    } else if(json_pop_param.param_v_reset_dist == 2){
                        param_v_reset = json_pop_param.param_v_reset_fx;
                    }

                    if(json_pop_param.param_v_thresh_dist == 0){
                        param_v_thresh = json_pop_param.param_v_thresh;
                    } else if(json_pop_param.param_v_thresh_dist == 1){
                        param_v_thresh = "RandomDistribution('" +
                            json_pop_param.param_v_thresh_distribution+"', (" + 
                            json_pop_param.param_v_thresh_p1 + ", " + 
                            json_pop_param.param_v_thresh_p2 + 
                        "))";
                    } else if(json_pop_param.param_v_thresh_dist == 2){
                        param_v_thresh = json_pop_param.param_v_thresh_fx;
                    }

                    if(json_pop_param.param_e_rev_E_dist == 0){
                        param_e_rev_E = json_pop_param.param_e_rev_E;
                    } else if(json_pop_param.param_e_rev_E_dist == 1){
                        param_e_rev_E = "RandomDistribution('" +
                            json_pop_param.param_e_rev_E_distribution+"', (" + 
                            json_pop_param.param_e_rev_E_p1 + ", " + 
                            json_pop_param.param_e_rev_E_p2 + 
                        "))";
                    } else if(json_pop_param.param_e_rev_E_dist == 2){
                        param_e_rev_E = json_pop_param.param_e_rev_E_fx;
                    }

                    if(json_pop_param.param_e_rev_I_dist == 0){
                        param_e_rev_I = json_pop_param.param_e_rev_I;
                    } else if(json_pop_param.param_e_rev_I_dist == 1){
                        param_e_rev_I = "RandomDistribution('" +
                            json_pop_param.param_e_rev_I_distribution+"', (" + 
                            json_pop_param.param_e_rev_I_p1 + ", " + 
                            json_pop_param.param_e_rev_I_p2 + 
                        "))";
                    } else if(json_pop_param.param_e_rev_I_dist == 2){
                        param_e_rev_I = json_pop_param.param_e_rev_I_fx;
                    }

                    if(json_pop_param.param_gbar_Na_dist == 0){
                        param_gbar_Na = json_pop_param.param_gbar_Na;
                    } else if(json_pop_param.param_gbar_Na_dist == 1){
                        param_gbar_Na = "RandomDistribution('" +
                            json_pop_param.param_gbar_Na_distribution+"', (" + 
                            json_pop_param.param_gbar_Na_p1 + ", " + 
                            json_pop_param.param_gbar_Na_p2 + 
                        "))";
                    } else if(json_pop_param.param_gbar_Na_dist == 2){
                        param_gbar_Na = json_pop_param.param_gbar_Na_fx;
                    }

                    if(json_pop_param.param_gbar_K_dist == 0){
                        param_gbar_K = json_pop_param.param_gbar_K;
                    } else if(json_pop_param.param_gbar_K_dist == 1){
                        param_gbar_K = "RandomDistribution('" +
                            json_pop_param.param_gbar_K_distribution+"', (" + 
                            json_pop_param.param_gbar_K_p1 + ", " + 
                            json_pop_param.param_gbar_K_p2 + 
                        "))";
                    } else if(json_pop_param.param_gbar_K_dist == 2){
                        param_gbar_K = json_pop_param.param_gbar_K_fx;
                    }

                    if(json_pop_param.param_g_leak_dist == 0){
                        param_g_leak = json_pop_param.param_g_leak;
                    } else if(json_pop_param.param_g_leak_dist == 1){
                        param_g_leak = "RandomDistribution('" +
                            json_pop_param.param_g_leak_distribution+"', (" + 
                            json_pop_param.param_g_leak_p1 + ", " + 
                            json_pop_param.param_g_leak_p2 + 
                        "))";
                    } else if(json_pop_param.param_g_leak_dist == 2){
                        param_g_leak = json_pop_param.param_g_leak_fx;
                    }

                    if(json_pop_param.param_v_offset_dist == 0){
                        param_v_offset = json_pop_param.param_v_offset;
                    } else if(json_pop_param.param_v_offset_dist == 1){
                        param_v_offset = "RandomDistribution('" +
                            json_pop_param.param_v_offset_distribution+"', (" + 
                            json_pop_param.param_v_offset_p1 + ", " + 
                            json_pop_param.param_v_offset_p2 + 
                        "))";
                    } else if(json_pop_param.param_v_offset_dist == 2){
                        param_v_offset = json_pop_param.param_v_offset_fx;
                    }

                    if(json_pop_param.param_e_rev_Na_dist == 0){
                        param_e_rev_Na = json_pop_param.param_e_rev_Na;
                    } else if(json_pop_param.param_e_rev_Na_dist == 1){
                        param_e_rev_Na = "RandomDistribution('" +
                            json_pop_param.param_e_rev_Na_distribution+"', (" + 
                            json_pop_param.param_e_rev_Na_p1 + ", " + 
                            json_pop_param.param_e_rev_Na_p2 + 
                        "))";
                    } else if(json_pop_param.param_e_rev_Na_dist == 2){
                        param_e_rev_Na = json_pop_param.param_e_rev_Na_fx;
                    }

                    if(json_pop_param.param_e_rev_K_dist == 0){
                        param_e_rev_K = json_pop_param.param_e_rev_K;
                    } else if(json_pop_param.param_e_rev_K_dist == 1){
                        param_e_rev_K = "RandomDistribution('" +
                            json_pop_param.param_e_rev_K_distribution+"', (" + 
                            json_pop_param.param_e_rev_K_p1 + ", " + 
                            json_pop_param.param_e_rev_K_p2 + 
                        "))";
                    } else if(json_pop_param.param_e_rev_K_dist == 2){
                        param_e_rev_K = json_pop_param.param_e_rev_K_fx;
                    }

                    if(json_pop_param.param_e_rev_leak_dist == 0){
                        param_e_rev_leak = json_pop_param.param_e_rev_leak;
                    } else if(json_pop_param.param_e_rev_leak_dist == 1){
                        param_e_rev_leak = "RandomDistribution('" +
                            json_pop_param.param_e_rev_leak_distribution+"', (" + 
                            json_pop_param.param_e_rev_leak_p1 + ", " + 
                            json_pop_param.param_e_rev_leak_p2 + 
                        "))";
                    } else if(json_pop_param.param_e_rev_leak_dist == 2){
                        param_e_rev_leak = json_pop_param.param_e_rev_leak_fx;
                    }

                    if(json_pop_param.param_v_spike_dist == 0){
                        param_v_spike = json_pop_param.param_v_spike;
                    } else if(json_pop_param.param_v_spike_dist == 1){
                        param_v_spike = "RandomDistribution('" +
                            json_pop_param.param_v_spike_distribution+"', (" + 
                            json_pop_param.param_v_spike_p1 + ", " + 
                            json_pop_param.param_v_spike_p2 + 
                        "))";
                    } else if(json_pop_param.param_v_spike_dist == 2){
                        param_v_spike = json_pop_param.param_v_spike_fx;
                    }

                    if(json_pop_param.param_a_dist == 0){
                        param_a = json_pop_param.param_a;
                    } else if(json_pop_param.param_a_dist == 1){
                        param_a = "RandomDistribution('" +
                            json_pop_param.param_a_distribution+"', (" + 
                            json_pop_param.param_a_p1 + ", " + 
                            json_pop_param.param_a_p2 + 
                        "))";
                    } else if(json_pop_param.param_a_dist == 2){
                        param_a = json_pop_param.param_a_fx;
                    }

                    if(json_pop_param.param_b_dist == 0){
                        param_b = json_pop_param.param_b;
                    } else if(json_pop_param.param_b_dist == 1){
                        param_b = "RandomDistribution('" +
                            json_pop_param.param_b_distribution+"', (" + 
                            json_pop_param.param_b_p1 + ", " + 
                            json_pop_param.param_b_p2 + 
                        "))";
                    } else if(json_pop_param.param_b_dist == 2){
                        param_b = json_pop_param.param_b_fx;
                    }

                    if(json_pop_param.param_delta_T_dist == 0){
                        param_delta_T = json_pop_param.param_delta_T;
                    } else if(json_pop_param.param_delta_T_dist == 1){
                        param_delta_T = "RandomDistribution('" +
                            json_pop_param.param_delta_T_distribution+"', (" + 
                            json_pop_param.param_delta_T_p1 + ", " + 
                            json_pop_param.param_delta_T_p2 + 
                        "))";
                    } else if(json_pop_param.param_delta_T_dist == 2){
                        param_delta_T = json_pop_param.param_delta_T_fx;
                    }

                    if(json_pop_param.param_tau_w_dist == 0){
                        param_tau_w = json_pop_param.param_tau_w;
                    } else if(json_pop_param.param_tau_w_dist == 1){
                        param_tau_w = "RandomDistribution('" +
                            json_pop_param.param_tau_w_distribution+"', (" + 
                            json_pop_param.param_tau_w_p1 + ", " + 
                            json_pop_param.param_tau_w_p2 + 
                        "))";
                    } else if(json_pop_param.param_tau_w_dist == 2){
                        param_tau_w = json_pop_param.param_tau_w_fx;
                    }

                    if(json_pop_param.init_v_dist == 0){
                        init_v = json_pop_param.init_v;
                    } else if(json_pop_param.init_v_dist == 1){
                        init_v = "RandomDistribution('" +
                            json_pop_param.init_v_distribution+"', (" + 
                            json_pop_param.init_v_p1 + ", " + 
                            json_pop_param.init_v_p2 + 
                        "))";
                    } else if(json_pop_param.init_v_dist == 2){
                        init_v = json_pop_param.init_v_fx;
                    }

                    if(json_pop_param.init_w_dist == 0){
                        init_w = json_pop_param.init_w;
                    } else if(json_pop_param.init_w_dist == 1){
                        init_w = "RandomDistribution('" +
                            json_pop_param.init_w_distribution+"', (" + 
                            json_pop_param.init_w_p1 + ", " + 
                            json_pop_param.init_w_p2 + 
                        "))";
                    } else if(json_pop_param.init_w_dist == 2){
                        init_w = json_pop_param.init_w_fx;
                    }

                    if(json_pop_param.param_rate_dist == 0){
                        param_rate = json_pop_param.param_rate;
                    } else if(json_pop_param.param_rate_dist == 1){
                        param_rate = "RandomDistribution('" +
                            json_pop_param.param_rate_distribution+"', (" + 
                            json_pop_param.param_rate_p1 + ", " + 
                            json_pop_param.param_rate_p2 + 
                        "))";
                    } else if(json_pop_param.param_rate_dist == 2){
                        param_rate = json_pop_param.param_rate_fx;
                    }

                    if(json_pop_param.param_start_dist == 0){
                        param_start = json_pop_param.param_start;
                    } else if(json_pop_param.param_start_dist == 1){
                        param_start = "RandomDistribution('" +
                            json_pop_param.param_start_distribution+"', (" + 
                            json_pop_param.param_start_p1 + ", " + 
                            json_pop_param.param_start_p2 + 
                        "))";
                    } else if(json_pop_param.param_start_dist == 2){
                        param_start = json_pop_param.param_start_fx;
                    }

                    if(json_pop_param.param_duration_dist == 0){
                        param_duration = json_pop_param.param_duration;
                    } else if(json_pop_param.param_duration_dist == 1){
                        param_duration = "RandomDistribution('" +
                            json_pop_param.param_duration_distribution+"', (" + 
                            json_pop_param.param_duration_p1 + ", " + 
                            json_pop_param.param_duration_p2 + 
                        "))";
                    } else if(json_pop_param.param_duration_dist == 2){
                        param_duration = json_pop_param.param_duration_fx;
                    }

                    if(json_pop_param.param_synaptic_weight_dist == 0){
                        synaptic_weight = json_pop_param.synaptic_weight;
                    }
                    else if(json_pop_param.param_synaptic_weight_dist == 1){
                        synaptic_weight = "RandomDistribution('" +
                            json_pop_param.param_synaptic_weight_distribution+"', (" + 
                            json_pop_param.param_synaptic_weight_p1 + ", " + 
                            json_pop_param.param_synaptic_weight_p2 + 
                        "))";
                    }
                    else if(json_pop_param.param_synaptic_weight_dist == 2){
                        synaptic_weight = param_synaptic_weight_fx;
                    }

                    if(json_pop_param.param_synaptic_delay_dist == 0){
                        synaptic_delay = json_pop_param.synaptic_delay;
                    }
                    else if(json_pop_param.param_synaptic_delay_dist == 1){
                        synaptic_delay = "RandomDistribution('" +
                            json_pop_param.param_synaptic_delay_distribution+"', (" + 
                            json_pop_param.param_synaptic_delay_p1 + ", " + 
                            json_pop_param.param_synaptic_delay_p2 + 
                        "))";
                    }
                    else if(json_pop_param.param_synaptic_delay_dist == 2){
                        synaptic_delay = param_synaptic_delay_fx;
                    }

                    if(json_pop_param.celltype == "IF_curr_alpha"){
                        str_inst += "pop_"+ val.id +" = " +
                        "sim.Population(" + json_pop_param.size + ", sim.IF_curr_alpha(v_rest="+param_v_rest +
                        ", cm="+param_cm +
                        ", tau_m="+param_tau_m +
                        ", tau_refrac="+param_tau_refrac +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", tau_syn_I="+param_tau_syn_I +
                        ", i_offset="+param_i_offset +
                        ", v_reset="+param_v_reset +
                        ", v_thresh="+param_v_thresh +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        // ", isyn_exc="+json_pop_param.init_isyn_exc +
                        // ", isyn_inh="+json_pop_param.init_isyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_curr_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_curr_exp(v_rest="+param_v_rest +
                        ", cm="+param_cm +
                        ", tau_m="+param_tau_m +
                        ", tau_refrac="+param_tau_refrac +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", tau_syn_I="+param_tau_syn_I +
                        ", i_offset="+param_i_offset +
                        ", v_reset="+param_v_reset +
                        ", v_thresh="+param_v_thresh +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        // ", isyn_exc="+json_pop_param.init_isyn_exc +
                        // ", isyn_inh="+json_pop_param.init_isyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_cond_alpha"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_cond_alpha(v_rest="+param_v_rest +
                        ", cm="+param_cm +
                        ", tau_m="+param_tau_m +
                        ", tau_refrac="+param_tau_refrac +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", tau_syn_I="+param_tau_syn_I +
                        ", e_rev_E="+param_e_rev_E +
                        ", e_rev_I="+param_e_rev_I +
                        ", v_thresh="+param_v_thresh +
                        ", v_reset="+param_v_reset +
                        ", i_offset="+param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        ")\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_cond_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_cond_exp(v_rest="+param_v_rest +
                        ", cm="+param_cm +
                        ", tau_m="+param_tau_m +
                        ", tau_refrac="+param_tau_refrac +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", tau_syn_I="+param_tau_syn_I +
                        ", e_rev_E="+param_e_rev_E +
                        ", e_rev_I="+param_e_rev_I +
                        ", v_thresh="+param_v_thresh +
                        ", v_reset="+param_v_reset +
                        ", i_offset="+param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "HH_cond_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.HH_cond_exp(gbar_Na="+param_gbar_Na +
                        ", gbar_K="+param_gbar_K +
                        ", g_leak="+param_g_leak +
                        ", cm="+param_cm +
                        ", v_offset="+param_v_offset +
                        ", e_rev_Na="+param_e_rev_Na +
                        ", e_rev_K="+param_e_rev_K +
                        ", e_rev_leak="+param_e_rev_leak +
                        ", e_rev_E="+param_e_rev_E +
                        ", e_rev_I="+param_e_rev_I +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", tau_syn_I="+param_tau_syn_I +
                        ", i_offset="+param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "EIF_cond_alpha_isfa_ista"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.EIF_cond_alpha_isfa_ista(cm="+param_cm +
                        ", tau_refrac="+param_tau_refrac +
                        ", v_spike="+param_v_spike +
                        ", v_reset="+param_v_reset +
                        ", v_rest="+param_v_rest +
                        ", tau_m="+param_tau_m +
                        ", i_offset="+param_i_offset +
                        ", a="+param_a +
                        ", b="+param_b +
                        ", delta_T="+param_delta_T +
                        ", tau_w="+param_tau_w +
                        ", v_thresh="+param_v_thresh +
                        ", e_rev_E="+param_e_rev_E +
                        ", tau_syn_E="+param_tau_syn_E +
                        ", e_rev_I="+param_e_rev_I +
                        ", tau_syn_I="+param_tau_syn_I +
                        " ), label='"+json_pop_param.name_value +
                        ")\n"+
                        "pop_"+ val.id +".initialize(v="+init_v +
                        ", w="+init_w +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        "')\n";
                    }
                    if(json_pop_param.celltype == "empty_edge"){
                        str_inst += "sim.Projection(pop_2, pop_2, sim.AllToAllConnector(), sim.StaticSynapse())\n";
                        str_inst += "pop_3.initialize(v=-65 , isyn_exc=3 , isyn_inh=0 , label=Pop3)\n";
                    }
                    if(json_pop_param.celltype == "empty_no_edge"){
                        str_inst += "pop_"+ val.id + " = sim.Population(" +
                        "1, sim.IF_curr_alpha(v_rest=-65 , cm=1 , tau_m=20 , tau_refrac=0 , tau_syn_E=5 , tau_syn_I=5 , i_offset=0 , v_reset=-65 , v_thresh=-50 " +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "SpikeSourcePoisson"){
                        str_inst += "sim.Population(" + json_pop_param.size + ", sim.SpikeSourcePoisson(" +
                        "rate=" + param_rate +
                        ", start=" + param_start +
                        ", duration=" + param_duration +
                        "))\n";
                    }
                    if(json_pop_param.celltype == "SpikeSourceArray"){
                        str_inst += "";
                    }
                    if(json_pop_param.celltype == "projection"){
                        var synapse_type = json_pop_param.synapse_type
                        if(json_pop_param.connectors_type == "AllToAll"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+", sim.AllToAllConnector(), " +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                            // } else if(synapse_type == 'receptor_type'){
                            // 	str_inst += "" +
                            // )\n";
                            // }
                        }
                        if(json_pop_param.connectors_type == "OneToOne"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+", sim.OneToOneConnector()," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedProbability"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+
                                ", sim.FixedProbabilityConnector(" +
                                json_pop_param.FixedProbability_p_connect + ", " +
                                " allow_self_connections=" + json_pop_param.FixedProbability_allow_self_connections +
                                ")," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FromFile"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id + ", pop_"+val.target.id +
                                ", sim.FromFileConnector(" +
                                json_pop_param.FromFile_file + ", " +
                                json_pop_param.FromFile_distributed + ", " +
                                json_pop_param.FromFile_safe + ", " +
                                json_pop_param.FromFile_callback +
                                ")," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedNumberPre"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id +
                                ", sim.FixedNumberPreConnector(" +
                                json_pop_param.FixedNumberPre_n + ", " +
                                json_pop_param.FixedNumberPre_with_replacement + ", " +
                                json_pop_param.FixedNumberPre_allow_self_connections +
                                ")," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedNumberPost"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id +
                                ", sim.FixedNumberPostConnector(" +
                                json_pop_param.FixedNumberPost_n + ", " +
                                json_pop_param.FixedNumberPost_with_replacement + ", " +
                                json_pop_param.FixedNumberPost_allow_self_connections +
                                ")," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedTotalNumber"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+", sim.FixedTotalNumberConnector()," +
                                "sim.StaticSynapse(weight=" + synaptic_weight + ", delay=" + synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                    } else { // For all populations
                        if(json_pop_param.Recording_spikes == true){
                            str_inst += "pop_" + val.id + ".record('spikes')\n";
                        }
                        if(json_pop_param.Recording_v == true){
                            str_inst += "pop_" + val.id + ".record('v')\n";
                        }
                        // if((json_pop_param.Simulation_time != null) && (json_pop_param.Simulation_time != "")){
                        // 	str_rwd += "sim.run(" + json_pop_param.Simulation_time + "')\n";
                        // }
                        if((Simulation_name != null) && (Simulation_name != "")){
                            // str_rwd += "pop_" + val.id + ".write_data(\"" + Simulation_name + "_pop_" + val.id + ".h5\")\n";
                            str_rwd += "pop_" + val.id + ".write_data(\"" + Simulation_name + "_pop_" + val.id + ".pkl\")\n";
                        }
                    }
                } catch(error) {
                    str_inst += "";
                    str_rwd += "";
                }
            }
        }
    });

    var import_platform = "";
    if (hardware_platform == "NEST"){
        import_platform = "import pyNN.nest as sim";
    } else if(hardware_platform == "BrainScaleS"){
        import_platform = "import pyNN.brainscales as sim";
    } else if(hardware_platform == "SpiNNaker"){
        import_platform = "import pyNN.spiNNaker as sim";
    } else{
        import_platform = "import pyNN.nest as sim";
    }

    var scriptText = `
# coding: utf-8
#!python

import numpy
`+ import_platform +`
from pyNN.random import RandomDistribution

sim.setup()

`+ str_inst +`

sim.run(` + Simulation_time + `)

`+ str_rwd +`

sim.end()
`;

    return scriptText;
});
