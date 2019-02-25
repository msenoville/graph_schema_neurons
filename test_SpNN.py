
# coding: utf-8
#!python

import numpy
import pyNN.spiNNaker as sim

sim.setup()

pop_2 = sim.Population(4000, sim.IF_cond_exp(v_rest=-65 , cm=1 , tau_m=20 , tau_refrac=0 , tau_syn_E=5 , tau_syn_I=5 , e_rev_E=5 , e_rev_I=0 , v_thresh=-50 , v_reset=-65 , i_offset=0 ))
pop_2.initialize(v=-65 , gsyn_exc=0 , gsyn_inh=0 , label="Pop" )
pop_2.record('spikes')
pop_2.record('v')
pop_3 = sim.Population(1000, sim.IF_cond_exp(v_rest=-65 , cm=1 , tau_m=20 , tau_refrac=0 , tau_syn_E=5 , tau_syn_I=5 , e_rev_E=5 , e_rev_I=0 , v_thresh=-50 , v_reset=-65 , i_offset=0 ))
pop_3.initialize(v=-65 , gsyn_exc=0 , gsyn_inh=0 , label="Pop2" )
pop_3.record('spikes')
pop_3.record('v')
prj_4 = sim.Projection(pop_2, pop_3, sim.FixedProbabilityConnector(0.1, false),sim.StaticSynapse(weight=0.4, delay=1.1), receptor_type='excitatory')
prj_5 = sim.Projection(pop_3, pop_2, sim.FixedProbabilityConnector(0.1, false),sim.StaticSynapse(weight=0.7, delay=1), receptor_type='inhibitory')
prj_6 = sim.Projection(pop_3, pop_3, sim.FixedProbabilityConnector(0.1, false),sim.StaticSynapse(weight=0.5, delay=1.1), receptor_type='inhibitory')
prj_7 = sim.Projection(pop_2, pop_2, sim.FixedProbabilityConnector(undefined, false),sim.StaticSynapse(weight=0.7, delay=1), receptor_type='excitatory')
prj_9 = sim.Projection(pop_8, pop_2, sim.FixedProbabilityConnector(undefined, false),sim.StaticSynapse(weight=0.5, delay=0.8), receptor_type='excitatory')
prj_10 = sim.Projection(pop_8, pop_3, sim.FixedProbabilityConnector(undefined, false),sim.StaticSynapse(weight=0.5, delay=1.2), receptor_type='excitatory')

pop_2.write_data("test_pop_2.h5")


sim.run(undefined)
sim.end()
			