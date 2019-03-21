var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('scotchController', function($scope) {
    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
});

graphSchemaApp.controller('graphController', function($scope, $rootScope, $state, FileSaver, $sce, ModalService, jobService, python_script_string) {
	// $state.reload();
	if (!mxClient.isBrowserSupported())
	{
		// Displays an error message if the browser is not supported.
		mxUtils.error('Browser is not supported!', 200, false);
	} else {
		// Enables guides
		mxGraphHandler.prototype.guidesEnabled = true;

		// Disables built-in context menu
		mxEvent.disableContextMenu(document.getElementById("id_graph_editor"));

		// Alt disables guides
		mxGuide.prototype.isEnabledForEvent = function(evt)
		{
			return !mxEvent.isAltDown(evt);
		};

		// Enables snapping waypoints to terminals
		mxEdgeHandler.prototype.snapToTerminals = true;

		// Overridden to define per-shape connection points
		mxGraph.prototype.getAllConnectionConstraints = function(terminal, source)
		{
			if (terminal != null && terminal.shape != null)
			{
				if (terminal.shape.stencil != null)
				{
					if (terminal.shape.stencil != null)
					{
						return terminal.shape.stencil.constraints;
					}
				}
				else if (terminal.shape.constraints != null)
				{
					return terminal.shape.constraints;
				}
			}
	
			return null;
		};
	
		// Defines the default constraints for all shapes
		mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
										 new mxConnectionConstraint(new mxPoint(0.5, 0), true),
										 new mxConnectionConstraint(new mxPoint(0.75, 0), true),
										new mxConnectionConstraint(new mxPoint(0, 0.25), true),
										new mxConnectionConstraint(new mxPoint(0, 0.5), true),
										new mxConnectionConstraint(new mxPoint(0, 0.75), true),
										new mxConnectionConstraint(new mxPoint(1, 0.25), true),
										new mxConnectionConstraint(new mxPoint(1, 0.5), true),
										new mxConnectionConstraint(new mxPoint(1, 0.75), true),
										new mxConnectionConstraint(new mxPoint(0.25, 1), true),
										new mxConnectionConstraint(new mxPoint(0.5, 1), true),
										new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
		
		// Edges have no connection points
		mxPolyline.prototype.constraints = null;
		
		var graphs = [];
		// Detect existings elements in the DOM
		// Creates a DOM node that acts as the drag source
		var img = mxUtils.createImage('img/gear.png');
		img.class = 'img_utils';
		img.style.width = '48px';
		img.style.height = '48px';
		// var img2 = mxUtils.createImage('img/gearRed.png');
		// img2.style.width = '48px';
		// img2.style.height = '48px';
		// var img3 = mxUtils.createImage('img/gearGreen.png');
		// img3.style.width = '48px';
		// img3.style.height = '48px';
		sp_tb = document.createElement('div');
		sp_tb.className='space_toolbar';

		var button_zoom_in = mxUtils.button('', function()
		{
			graph.zoomIn();
		});
		button_zoom_in.style.width = '48px';
		button_zoom_in.style.height = '48px';
		button_zoom_in.style.border = 'none';
		button_zoom_in.style.background = 'url(\'img/zoom-in.png\') no-repeat';
		button_zoom_in.style.backgroundSize = '100%';
		button_zoom_in.className = "tooltip2";
		sp_tool_zoom_in = document.createElement('span');
		sp_tool_zoom_in.textContent = "Zoom In";
		sp_tool_zoom_in.className='tooltiptext2';

		var button_zoom_out = mxUtils.button('', function()
		{
			graph.zoomOut();
		});
		button_zoom_out.style.width = '48px';
		button_zoom_out.style.height = '48px';
		button_zoom_out.style.border = 'none';
		button_zoom_out.style.background = 'url(\'img/zoom-out.png\') no-repeat';
		button_zoom_out.style.backgroundSize = '100%';

		var button_save = mxUtils.button('', function(){
			// var FileSaver = require('file-saver');
			bootbox.prompt("Please give the name to the file (.xml extension added automatically) :", function(filename){
				var encoder = new mxCodec();
				var node = encoder.encode(graph.getModel());
				var nodeText = new XMLSerializer().serializeToString(node);
				var blob = new Blob([nodeText], {type: "text/plain;charset=utf-8"});
				//in case of cancelation => filename == null
				if(filename != null){
					if(filename.length <1){
						FileSaver.saveAs(blob, "file_graph.xml");
					} else {
						FileSaver.saveAs(blob, filename + ".xml");
					}
				}
			});
		});
		button_save.style.width = '48px';
		button_save.style.height = '48px';
		button_save.style.border = 'none';
		button_save.style.background = 'url(\'img/save.png\') no-repeat';
		button_save.style.backgroundSize = '100%';

		//create button to open and load file
		var button_load = mxUtils.button('', function(){
			$('#xml_graph_file').click();

			$('input').on('change', function(evt){
				var f = evt.target.files[0];
				if (f){
					var r = new FileReader();
					r.onload = function(e){
						graph.getModel().clear();
						// var xml = mxUtils.load('file_graph.xml');
						var xml = e.target.result;
						var doc = mxUtils.parseXml(xml);
						var codec = new mxCodec(doc);
						var elt = doc.documentElement.firstChild.firstChild;
						var cells = [];
						while (elt != null){
							cells.push(codec.decodeCell(elt));
							graph.refresh();
							elt = elt.nextSibling;
						}
						graph.addCells(cells);
					};
					r.readAsText(f);
				} else {
					console.log("failed");
				}
			});
		});
		button_load.style.width = '48px';
		button_load.style.height = '48px';
		button_load.style.border = 'none';
		button_load.style.background = 'url(\'img/open.png\') no-repeat';
		button_load.style.backgroundSize = '100%';

		//create a button to clear schema
		var button_clear = mxUtils.button('', function(){
			bootbox.confirm({
				size: "small",
				message: "Are you sure to clear the graph ?",
				callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
					if(result == true){
						graph.getModel().clear();
					}
				}
			});
		});
		button_clear.style.width = '48px';
		button_clear.style.height = '48px';
		button_clear.style.border = 'none';
		button_clear.style.background = 'url(\'img/delete_clear.png\') no-repeat';
		button_clear.style.backgroundSize = '100%';

		// create a button to export to python script
		var button_exp_python = mxUtils.button('', function(){

			ModalService.showModal({
				templateUrl: "modal_script_python.html",
				controller: "Dlg_script_python",
				inputs: {
					title : "Python Script Generator",
					filename : "",
					hardware_platform : "NEST",
					Simulation_time : 10,
					Simulation_name :  "",
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					var encoder = new mxCodec();
					var node = encoder.encode(graph.getModel());
					var cells = graph.getModel().cells;
					var scriptText = python_script_string(cells, result.hardware_platform, result.Simulation_time, result.Simulation_name);
					console.log((scriptText));
					var blob = new Blob([scriptText], {type: "text/plain;charset=utf-8"});

			 		if(result.filename.length <1){
			 			FileSaver.saveAs(blob, "exp_python.py");
			 		} else {
			 			FileSaver.saveAs(blob, result.filename + ".py");
			 		}
				});
			});
		});
		button_exp_python.style.width = '48px';
		button_exp_python.style.height = '48px';
		button_exp_python.style.border = 'none';
		button_exp_python.style.background = 'url(\'img/python.png\') no-repeat';
		button_exp_python.style.backgroundSize = '100%';

		//create a button to submit job
		var button_submit = mxUtils.button('', function() {
			var scriptText = "";
			ModalService.showModal({
				templateUrl: "modal_submit_job.html",
				controller: "Dlg_submit_job",
				inputs: {
					title : "Job Submission",
					hardware_platform : "",
					Simulation_time : 10,
					Simulation_name :  "",
					scriptText : scriptText,
					jobService : jobService,
					cells: graph.getModel().cells
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					var cells = graph.getModel().cells;
					console.log(cells);
					scriptText = python_script_string(cells, result.hardware_platform, result.Simulation_time, result.Simulation_name);
					console.log((scriptText));
				});
			});
		});
		button_submit.style.width = '48px';
		button_submit.style.height = '48px';
		button_submit.style.border = 'none';
		button_submit.style.background = 'url(\'img/submit.png\') no-repeat';
		button_submit.style.backgroundSize = '100%';

		//create toolbar
		var div_toolbar = document.createElement('div');
		div_toolbar.id = 'div_toolbar';
		div_toolbar.style.width = '100%';
		div_toolbar.style.float = 'left';
		// document.body.appendChild(div_toolbar);
		document.getElementById("id_graph_editor").appendChild(div_toolbar);
		div_toolbar.appendChild(img);
		div_toolbar.appendChild(sp_tb);//blanck space between 2 button in toolbar
		// div_toolbar.appendChild(img2);
		// div_toolbar.appendChild(img3);
		div_toolbar.appendChild(button_zoom_in);
		div_toolbar.appendChild(sp_tool_zoom_in);
		div_toolbar.appendChild(button_zoom_out);
		div_toolbar.appendChild(button_save);
		div_toolbar.appendChild(button_load);
		div_toolbar.appendChild(button_clear);
		div_toolbar.appendChild(button_exp_python);
		div_toolbar.appendChild(button_submit);

		var container = document.createElement('div');
		container.id = 'svg_container';
		container.style.overflow = 'scroll';
		container.style.position = 'relative';
		container.style.float = 'left';
		container.style.minWidth = '750px';
		container.style.minWidth = '70%';
		container.style.height = '75%';
		container.style.background = 'url(\'img/grid.gif\')';
		container.style.cursor = 'default';
		// document.body.appendChild(container);
		document.getElementById("id_graph_editor").appendChild(container);

		// Creates the graph inside the given container
		var graph = new mxGraph(container);
		graph.setTooltips(true);

		graph.gridSize = 30;
		graph.centerZoom = false;

		//get connectable cells and modify style of edge
		graph.setConnectable(true);
		var style = graph.getStylesheet().getDefaultEdgeStyle();
		style[mxConstants.STYLE_ROUNDED] = true;
		style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

		graph.setPanning(true);

		// Uncomment the following if you want the container
		// to fit the size of the graph
		//graph.setResizeContainer(true);

		// Enables rubberband selection
		new mxRubberband(graph);

		// Gets the default parent for inserting new cells. This
		// is normally the first child of the root (ie. layer 0).
		var parent = graph.getDefaultParent();

		// Adds cells to the model in a single step
		graph.getModel().beginUpdate();
		graph.getModel().endUpdate();
		graphs.push(graph);

		// Returns the graph under the mouse
		var graphF = function(evt)
		{
			var x = mxEvent.getClientX(evt);
			var y = mxEvent.getClientY(evt);
			var elt = document.elementFromPoint(x, y);

			for (var i = 0; i < graphs.length; i++)
			{
				if (mxUtils.isAncestorNode(graphs[i].container, elt))
				{
					return graphs[i];
				}
			}

			return null;
		};

		// Inserts a cell at the given location
		var funct = function(graph, evt, target, x, y)
		{
			var cell = new mxCell('Pop', new mxGeometry(0, 0, 80, 30));
			cell.vertex = true;
			var cells = graph.importCells([cell], x, y, target);

			if (cells != null && cells.length > 0)
			{
				graph.scrollCellToVisible(cells[0]);
				graph.setSelectionCells(cells);
			}
		};

		// Disables built-in DnD in IE (this is needed for cross-frame DnD, see below)
		if (mxClient.IS_IE)
		{
			mxEvent.addListener(img, 'dragstart', function(evt)
			{
				evt.returnValue = false;
			});
		}

		// Detect creation of edge (Projections)
		// mxEvent.addListener(mxEvent.CONNECT, function(sender, evt){
		// 	alert("connect");
		// });
		// Creates the element that is being for the actual preview.
		var dragElt = document.createElement('div');
		dragElt.style.border = 'dashed black 1px';
		dragElt.style.width = '80px';
		dragElt.style.height = '30px';

		// Drag source is configured to use dragElt for preview and as drag icon
		// if scalePreview (last) argument is true. Dx and dy are null to force
		// the use of the defaults. Note that dx and dy are only used for the
		// drag icon but not for the preview.
		var ds = mxUtils.makeDraggable(img, graphF, funct, dragElt, null, null, graph.autoscroll, true);
		// var ds = mxUtils.makeDraggable(img2, graphF, funct2, dragElt, null, null, graph.autoscroll, true);
		// var ds = mxUtils.makeDraggable(img3, graphF, funct3, dragElt, null, null, graph.autoscroll, true);
		// Redirects feature to global switch. Note that this feature should only be used
		// if the the x and y arguments are used in funct to insert the cell.
		ds.isGuidesEnabled = function()
		{
			return graph.graphHandler.guidesEnabled;
		};

		// Restores original drag icon while outside of graph
		ds.createDragElement = mxDragSource.prototype.createDragElement;

		// Configures automatic expand on mouseover
		graph.popupMenuHandler.autoExpand = true;

		graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
		{
			// if (graph.getSelectionCount() == 1 && !graph.getModel().isEdge(cell) && !graph.isSwimlane(cell) && graph.getModel().getChildCount(cell) > 0)
			if (graph.getSelectionCount() == 1 && graph.getModel().isEdge(cell))
			{
				menu.addItem('Delete Projection', null, function()
				{
					bootbox.confirm( "Do you really remove this link ?",
					function(result){
						if(result == true){
							graph.removeCells([cell]);
						}
					});
					mxEvent.consume(evt);
				});
				menu.addItem('Configure Projection', null, function()
				{
					if (graph.isEnabled()){
						if((cell.value === undefined) | (cell.value === null)){
							cell.value = "";
						}
						if((cell.data_cell != undefined) | (cell.data_cell != null)){
							var json_data = JSON.parse(cell.data_cell);
						} else {
							var json_data = {
								"name_value": "",
								// "level": "",
								"synapse_type": "",
								"receptor_type": "",
								"connectors_type": "",
								"synaptic_weight": "",
								"synaptic_delay": "",
								"TsodyksMarkram_U": "",
								"TsodyksMarkram_tau_rec": "",
								"TsodyksMarkram_tau_facil": "",
								"AllToAll_allow_self_connections": false,
								"FixedProbability_p_connect": "",
								"FixedProbability_allow_self_connections": false,
								"FromFile_file": "",
								"FromFile_distributed": false,
								"FromFile_safe": false,
								"FromFile_callback": false,
								"FixedNumberPre_n": "",
								"FixedNumberPre_with_replacement": false,
								"FixedNumberPre_allow_self_connections": false,
								"FixedNumberPost_n": "",
								"FixedNumberPost_with_replacement": false,
								"FixedNumberPost_allow_self_connections": false,
								"FixedTotalNumber_n": "",
								"FixedTotalNumber_with_replacement": false,
								"FixedTotalNumber_allow_self_connections": false,
								"DistanceDependent_d_expression": "",
								"DistanceDependent_allow_self_connections": false,
							};
						}
						ModalService.showModal({
							templateUrl: "modal_pop_dialog_2.html",
							controller: "PopDialogController_spike",
							inputs: {
								title : "Projection Form Editor",
								name_value: cell.value,
								// level: json_data.level,
								synapse_type: json_data.synapse_type,
								receptor_type: json_data.receptor_type,
								connectors_type: json_data.connectors_type,
								synaptic_weight: json_data.synaptic_weight,
								synaptic_delay: json_data.synaptic_delay,
								TsodyksMarkram_U: json_data.TsodyksMarkram_U,
								TsodyksMarkram_tau_rec: json_data.TsodyksMarkram_tau_rec,
								TsodyksMarkram_tau_facil: json_data.TsodyksMarkram_tau_facil,
								AllToAll_allow_self_connections: json_data.AllToAll_allow_self_connections,
								FixedProbability_p_connect: json_data.FixedProbability_p_connect,
								FixedProbability_allow_self_connections: json_data.FixedProbability_allow_self_connections,
								FromFile_file: json_data.FromFile_file,
								FromFile_distributed: json_data.FromFile_distributed,
								FromFile_safe: json_data.FromFile_safe,
								FromFile_callback: json_data.FromFile_callback,
								FixedNumberPre_n: json_data.FixedNumberPre_n,
								FixedNumberPre_with_replacement: json_data.FixedNumberPre_with_replacement,
								FixedNumberPre_allow_self_connections: json_data.FixedNumberPre_allow_self_connections,
								FixedNumberPost_n: json_data.FixedNumberPost_n,
								FixedNumberPost_with_replacement: json_data.FixedNumberPost_with_replacement,
								FixedNumberPost_allow_self_connections: json_data.FixedNumberPost_allow_self_connections,
								FixedTotalNumber_n: json_data.FixedTotalNumber_n,
								FixedTotalNumber_with_replacement: json_data.FixedTotalNumber_with_replacement,
								FixedTotalNumber_allow_self_connections: json_data.FixedTotalNumber_allow_self_connections,
								DistanceDependent_d_expression: json_data.DistanceDependent_d_expression,
								DistanceDependent_allow_self_connections: json_data.DistanceDependent_allow_self_connections,
							}
						}).then(function(modal) {
							modal.element.modal();
							modal.close.then(function(result) {
								// state.cell.setValue(result.name_value);
								// cell.value = result.name_value + "|" + JSON.stringify(result);
								cell.value = result.name_value;
								cell.data_cell = JSON.stringify(result);
								cell.setValue(cell.value);
								cell.setData_cell(cell.data_cell);
								graph.refresh();
								var txtdisplay = $('text').text();
							});
						});
						mxEvent.consume(evt);
					}
				});
			} else if(graph.getSelectionCount() == 1 && graph.getModel().isVertex(cell)){
				menu.addItem('Create Self Projection', null, function(){
					graph.insertEdge(cell, null, '', cell, cell)
				});
				menu.addItem('Edit Population', null, function(){
					if((cell.data_cell != null) & (cell.data_cell != "")){
						var json_data = JSON.parse(cell.data_cell);
					} else {
						var json_data = {
							"name_value": "",
							// "level": "",
							"size": "",
							"celltype": "",
							"param_v_rest": -65,
							"param_cm": 1,
							"param_tau_m": 20,
							"param_tau_refrac": 0,
							"param_tau_syn_E": 5,
							"param_tau_syn_I": 5,
							"param_i_offset": 0,
							"param_v_reset": -65,
							"param_v_thresh": -50,
							"param_e_rev_E": "",
							"param_e_rev_I": "",
							"param_gbar_Na": "",
							"param_gbar_K": "",
							"param_g_leak": "",
							"param_v_offset": "",
							"param_e_rev_Na": "",
							"param_e_rev_K": "",
							"param_e_rev_leak": "",
							"param_tau_cm": "",
							"param_v_spike": "",
							"param_a": "",
							"param_b": "",
							"param_delta_T": "",
							"param_tau_w": "",
							"init_isyn_exc": 0,
							"init_isyn_inh": 0,
							"init_gsyn_exc": "",
							"init_gsyn_inh": "",
							"init_v": -65,
							"init_w": "",
							"Recording_spikes": "",
							"Recording_v": "",
							"Simulation_time": "",
							"Simulation_name": "",
							"param_rate": "",
							"param_start": "",
							"param_duration": "",
						};
					}
					ModalService.showModal({
						templateUrl: "modal_pop_dialog.html",
						controller: "PopDialogController",
						inputs: {
							title : "Population Form Editor",
							name_value: cell.value,
							// level: json_data.level,
							size: json_data.size,
							celltype: json_data.celltype,
							param_v_rest: json_data.param_v_rest,
							param_cm: json_data.param_cm,
							param_tau_m: json_data.param_tau_m,
							param_tau_refrac: json_data.param_tau_refrac,
							param_tau_syn_E: json_data.param_tau_syn_E,
							param_tau_syn_I: json_data.param_tau_syn_I,
							param_i_offset: json_data.param_i_offset,
							param_v_reset: json_data.param_v_reset,
							param_v_thresh: json_data.param_v_thresh,
							param_e_rev_E: json_data.param_e_rev_E,
							param_e_rev_I: json_data.param_e_rev_I,
							param_gbar_Na: json_data.param_gbar_Na,
							param_gbar_K: json_data.param_gbar_K,
							param_g_leak: json_data.param_g_leak,
							param_v_offset: json_data.param_v_offset,
							param_e_rev_Na: json_data.param_e_rev_Na,
							param_e_rev_K: json_data.param_e_rev_K,
							param_e_rev_leak: json_data.param_e_rev_leak,
							param_tau_cm: json_data.param_tau_cm,
							param_v_spike: json_data.param_v_spike,
							param_a: json_data.param_a,
							param_b: json_data.param_b,
							param_delta_T: json_data.param_delta_T,
							param_tau_w: json_data.param_tau_w,
							init_isyn_exc: json_data.init_isyn_exc,
							init_isyn_inh: json_data.init_isyn_inh,
							init_gsyn_exc: json_data.init_gsyn_exc,
							init_gsyn_inh: json_data.init_gsyn_inh,
							init_v: json_data.init_v,
							init_w: json_data.init_w,
							Recording_spikes: json_data.Recording_spikes,
							Recording_v: json_data.Recording_v,
							Simulation_time: json_data.Simulation_time,
							Simulation_name: json_data.Simulation_name,
							param_rate: json_data.param_rate,
							param_start: json_data.param_start,
							param_duration: json_data.param_duration,
						}
					}).then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {
							cell.value = result.name_value;
							cell.data_cell = JSON.stringify(result);
							cell.setValue(cell.value);
							cell.setData_cell(cell.data_cell);
							graph.refresh();
						});
					});
				});
				menu.addItem('Delete Population', null, function(){
					if (graph.isEnabled())
					{
						bootbox.confirm( "Do you really remove this cell ?",
							function(result){
								if(result == true){
									graph.removeCells([cell]);
								}
							});
						mxEvent.consume(evt);
					}
				});
				var submenu_color = menu.addItem('Choose color of Cell', null, null);
				menu.addItem('Default (Light Blue)', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=#774400;fillColor=#c3d9ff");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Red', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=white;fillColor=red");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Green', null, function(a, b, c, d)
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=white;fillColor=green");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Blue', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=white;fillColor=blue");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Yellow', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=black;fillColor=yellow");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Orange', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=black;fillColor=#ffb700");
					graph.refresh();
				}, submenu_color);
				menu.addItem('Violet', null, function()
				{
					graph.getModel().cells[cell.id].setStyle("fontColor=white;fillColor=#9900ff");
					graph.refresh();
				}, submenu_color);
			}
		};
	}
});

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
