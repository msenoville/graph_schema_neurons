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
                    if(json_pop_param.celltype == "IF_curr_alpha"){
                        str_inst += "pop_"+ val.id +" = " +
                        "sim.Population(" + json_pop_param.size + ", sim.IF_curr_alpha(v_rest="+json_pop_param.param_v_rest +
                        ", cm="+json_pop_param.param_cm +
                        ", tau_m="+json_pop_param.param_tau_m +
                        ", tau_refrac="+json_pop_param.param_tau_refrac +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        ", i_offset="+json_pop_param.param_i_offset +
                        ", v_reset="+json_pop_param.param_v_reset +
                        ", v_thresh="+json_pop_param.param_v_thresh +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        // ", isyn_exc="+json_pop_param.init_isyn_exc +
                        // ", isyn_inh="+json_pop_param.init_isyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_curr_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_curr_exp(v_rest="+json_pop_param.param_v_rest +
                        ", cm="+json_pop_param.param_cm +
                        ", tau_m="+json_pop_param.param_tau_m +
                        ", tau_refrac="+json_pop_param.param_tau_refrac +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        ", i_offset="+json_pop_param.param_i_offset +
                        ", v_reset="+json_pop_param.param_v_reset +
                        ", v_thresh="+json_pop_param.param_v_thresh +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        // ", isyn_exc="+json_pop_param.init_isyn_exc +
                        // ", isyn_inh="+json_pop_param.init_isyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_cond_alpha"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_cond_alpha(v_rest="+json_pop_param.param_v_rest +
                        ", cm="+json_pop_param.param_cm +
                        ", tau_m="+json_pop_param.param_tau_m +
                        ", tau_refrac="+json_pop_param.param_tau_refrac +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        ", e_rev_E="+json_pop_param.param_e_rev_E +
                        ", e_rev_I="+json_pop_param.param_e_rev_I +
                        ", v_thresh="+json_pop_param.param_v_thresh +
                        ", v_reset="+json_pop_param.param_v_reset +
                        ", i_offset="+json_pop_param.param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        ")\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "IF_cond_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.IF_cond_exp(v_rest="+json_pop_param.param_v_rest +
                        ", cm="+json_pop_param.param_cm +
                        ", tau_m="+json_pop_param.param_tau_m +
                        ", tau_refrac="+json_pop_param.param_tau_refrac +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        ", e_rev_E="+json_pop_param.param_e_rev_E +
                        ", e_rev_I="+json_pop_param.param_e_rev_I +
                        ", v_thresh="+json_pop_param.param_v_thresh +
                        ", v_reset="+json_pop_param.param_v_reset +
                        ", i_offset="+json_pop_param.param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "HH_cond_exp"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.HH_cond_exp(gbar_Na="+json_pop_param.param_gbar_Na +
                        ", gbar_K="+json_pop_param.param_gbar_K +
                        ", g_leak="+json_pop_param.param_g_leak +
                        ", cm="+json_pop_param.param_cm +
                        ", v_offset="+json_pop_param.param_v_offset +
                        ", e_rev_Na="+json_pop_param.param_e_rev_Na +
                        ", e_rev_K="+json_pop_param.param_e_rev_K +
                        ", e_rev_leak="+json_pop_param.param_e_rev_leak +
                        ", e_rev_E="+json_pop_param.param_e_rev_E +
                        ", e_rev_I="+json_pop_param.param_e_rev_I +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        ", i_offset="+json_pop_param.param_i_offset +
                        " ), label='"+json_pop_param.name_value +
                        "')\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        // ", gsyn_exc="+json_pop_param.init_gsyn_exc +
                        // ", gsyn_inh="+json_pop_param.init_gsyn_inh +
                        // ", label='"+json_pop_param.name_value +
                        ")\n";
                    }
                    if(json_pop_param.celltype == "EIF_cond_alpha_isfa_ista"){
                        str_inst += "pop_"+ val.id +" = sim.Population(" + json_pop_param.size + ", sim.EIF_cond_alpha_isfa_ista(cm="+json_pop_param.param_cm +
                        ", tau_refrac="+json_pop_param.param_tau_refrac +
                        ", v_spike="+json_pop_param.param_v_spike +
                        ", v_reset="+json_pop_param.param_v_reset +
                        ", v_rest="+json_pop_param.param_v_rest +
                        ", tau_m="+json_pop_param.param_tau_m +
                        ", i_offset="+json_pop_param.param_i_offset +
                        ", a="+json_pop_param.param_a +
                        ", b="+json_pop_param.param_b +
                        ", delta_T="+json_pop_param.param_delta_T +
                        ", tau_w="+json_pop_param.param_tau_w +
                        ", v_thresh="+json_pop_param.param_v_thresh +
                        ", e_rev_E="+json_pop_param.param_e_rev_E +
                        ", tau_syn_E="+json_pop_param.param_tau_syn_E +
                        ", e_rev_I="+json_pop_param.param_e_rev_I +
                        ", tau_syn_I="+json_pop_param.param_tau_syn_I +
                        " ), label='"+json_pop_param.name_value +
                        ")\n"+
                        "pop_"+ val.id +".initialize(v="+json_pop_param.init_v +
                        ", w="+json_pop_param.init_w +
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
                        str_inst += "pop_"+ val.id +" = " + "sim.Population(" + json_pop_param.size + ", sim.SpikeSourcePoisson(" +
                        "rate=" + json_pop_param.param_rate +
                        ", start=" + json_pop_param.param_start +
                        ", duration=" + json_pop_param.param_duration +
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
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                            // } else if(synapse_type == 'receptor_type'){
                            // 	str_inst += "" +
                            // )\n";
                            // }
                        }
                        if(json_pop_param.connectors_type == "OneToOne"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+", sim.OneToOneConnector()," +
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedProbability"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+
                                ", sim.FixedProbabilityConnector(" +
                                json_pop_param.FixedProbability_p_connect + ", " +
                                " allow_self_connections=" + json_pop_param.FixedProbability_allow_self_connections +
                                ")," +
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
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
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
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
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
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
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
                            }
                        }
                        if(json_pop_param.connectors_type == "FixedTotalNumber"){
                            if(synapse_type == 'static'){
                                str_inst += "prj_"+ val.id +" = sim.Projection(pop_"+val.source.id+", pop_"+val.target.id+", sim.FixedTotalNumberConnector()," +
                                "sim.StaticSynapse(weight=" + json_pop_param.synaptic_weight + ", delay=" + json_pop_param.synaptic_delay + "), receptor_type='" + json_pop_param.receptor_type+"')\n";
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

sim.setup()

`+ str_inst +`

sim.run(` + Simulation_time + `)

`+ str_rwd +`

sim.end()
`;

    return scriptText;
});
