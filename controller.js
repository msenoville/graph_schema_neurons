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

graphSchemaApp.controller('graphController', function($scope, $rootScope, $state, FileSaver, $sce, ModalService) {	
	// $state.reload();
	if (!mxClient.isBrowserSupported())
	{
		// Displays an error message if the browser is not supported.
		mxUtils.error('Browser is not supported!', 200, false);
	} else {
		// Enables guides
		mxGraphHandler.prototype.guidesEnabled = true;

		// Disables built-in context menu
		mxEvent.disableContextMenu(document.body);

		// Alt disables guides
		mxGuide.prototype.isEnabledForEvent = function(evt)
		{
			return !mxEvent.isAltDown(evt);
		};
		
		// Enables snapping waypoints to terminals
		mxEdgeHandler.prototype.snapToTerminals = true;
		
		var graphs = [];
		// Detect existings elements in the DOM
		// Creates a DOM node that acts as the drag source
		var img = mxUtils.createImage('img/gear.png');
		img.class = 'img_utils';
		img.style.width = '48px';
		img.style.height = '48px';
		var img2 = mxUtils.createImage('img/gearRed.png');
		img2.style.width = '48px';
		img2.style.height = '48px';
		var img3 = mxUtils.createImage('img/gearGreen.png');
		img3.style.width = '48px';
		img3.style.height = '48px';

		var button_zoom_in = mxUtils.button('', function()
		{
			graph.zoomIn();
		});
		button_zoom_in.style.width = '48px';
		button_zoom_in.style.height = '48px';
		button_zoom_in.style.border = 'none';
		button_zoom_in.style.background = 'url(\'img/zoom-in.png\') no-repeat';
		button_zoom_in.style.backgroundSize = '100%';
		
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
				console.log((nodeText));
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
						console.log(e.target.result);
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


		//create left vertical toolbar
		var div_toolbar = document.createElement('div');
		div_toolbar.id = 'div_toolbar';
		div_toolbar.style.width = '100%';
		div_toolbar.style.float = 'left';
		// document.body.appendChild(div_toolbar);
		document.getElementById("id_graph_editor").appendChild(div_toolbar);
		div_toolbar.appendChild(img);
		div_toolbar.appendChild(img2);
		div_toolbar.appendChild(img3);
		div_toolbar.appendChild(button_zoom_in);
		div_toolbar.appendChild(button_zoom_out);
		div_toolbar.appendChild(button_save);
		div_toolbar.appendChild(button_load);
		div_toolbar.appendChild(button_clear);
		
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

		// Specifies the URL and size of the new control
		var deleteImage = new mxImage('img/overlays/forbidden.png', 16, 16);
		var editImage = new mxImage('img/edit.png', 16, 16);

		// Overridden to add an additional control to the state at creation time
		if ($rootScope.ctrlAllreadyOverwritten == null){ $rootScope.ctrlAllreadyOverwritten = false; }
		console.log("$rootScope.ctrlAllreadyOverwritten : " + $rootScope.ctrlAllreadyOverwritten);
		if (!$rootScope.ctrlAllreadyOverwritten) {
			mxCellRendererCreateControl = mxCellRenderer.prototype.createControl;
			mxCellRenderer.prototype.createControl = function(state)
			{
				mxCellRendererCreateControl.apply(this, arguments);
				$rootScope.ctrlAllreadyOverwritten = true;
				var graph = state.view.graph;
				if (graph.getModel().isVertex(state.cell))
				{
					if (state.deleteControl == null)
					{
						var b = new mxRectangle(0, 0, deleteImage.width, deleteImage.height);
						state.deleteControl = new mxImageShape(b, deleteImage.src);
						state.deleteControl.dialect = graph.dialect;
						state.deleteControl.preserveImageAspect = false;

						this.initControl(state, state.deleteControl, false, function (evt)
						{
							if (graph.isEnabled())
							{
								console.log("state 1 : " + state);
								bootbox.confirm( "Do you really remove this cell ?",
									function(result){
										if(result == true){
											graph.removeCells([state.cell]);
										}
									});
								mxEvent.consume(evt);
							}
						});
					}
					if (state.editControl == null){
						var c = new mxRectangle(0, 0, editImage.width, editImage.height);
						state.editControl = new mxImageShape(b, editImage.src);
						state.editControl.dialect = graph.dialect;
						state.editControl.preserveImageAspect = false;

						this.initControl(state, state.editControl, false, function (evt)
						{
							if (graph.isEnabled())
							{
								//modal.modal("show");
								console.log("state 2 : " + state.cell.value);
								var json_data_array = state.cell.value.split("|");
								
								if(json_data_array.length >= 2){
									var json_data = JSON.parse(json_data_array[1]);
								} else {
									var json_data = {
										"name_value": "",
										"level": "",
										"size": "",
										"celltype": "",
										"param_v_rest": "",
										"param_cm": "",
										"param_tau_m": "",
										"init_v_rest": "",
										"init_cm": "",
										"init_tau_m": "",
									};
								}
								ModalService.showModal({
									templateUrl: "modal_pop_dialog.html",
    								controller: "PopDialogController",
									inputs: {
										title : "Population Form Editor",
										name_value: json_data_array[0],
										level: json_data.level,
										size: json_data.size,
										celltype: json_data.celltype,
										param_v_rest: json_data.param_v_rest,
										param_cm: json_data.param_cm,
										param_tau_m: json_data.param_tau_m,
										init_v_rest: json_data.init_v_rest,
										init_cm: json_data.init_cm,
										init_tau_m: json_data.init_tau_m,
									}
								}).then(function(modal) {
									modal.element.modal();
									modal.close.then(function(result) {
										// state.cell.setValue(result.name_value);
										console.log("get value : " + state.cell.getValue());
										state.cell.value = result.name_value + "|" + JSON.stringify(result);
										state.cell.setValue(state.cell.value);
										graph.refresh();
										console.log("get after set value : " + state.cell.getValue());
									});
								});
								mxEvent.consume(evt);
							}
						});
					}
				}
				else if (state.deleteControl != null)
				{
					state.deleteControl.destroy();
					state.deleteControl = null;
				}
			};

			// Helper function to compute the bounds of the control
			var getDeleteControlBounds = function(state)
			{
				if (state.deleteControl != null)
				{
					var oldScale = state.deleteControl.scale;
					var w = state.deleteControl.bounds.width / oldScale;
					var h = state.deleteControl.bounds.height / oldScale;
					var s = state.view.scale;			

					return (state.view.graph.getModel().isEdge(state.cell)) ? 
						new mxRectangle(state.x + state.width / 2 - w / 2 * s,
							state.y + state.height / 2 - h / 2 * s, w * s, h * s)
						: new mxRectangle(state.x + state.width - w * s,
							state.y, w * s, h * s);
				}
				return null;
			};

			var getEditControlBounds = function(state)
			{
				if (state.editControl != null)
				{
					var oldScale = state.editControl.scale;
					var w = state.editControl.bounds.width / oldScale;
					var h = state.editControl.bounds.height / oldScale;
					var s = state.view.scale;			

					return (state.view.graph.getModel().isEdge(state.cell)) ? 
						new mxRectangle((state.x - 64) + state.width / 2 - w / 2 * s,
							state.y + state.height / 2 - h / 2 * s, w * s, h * s)
						: new mxRectangle((state.x - 64) + state.width - w * s,
							state.y, w * s, h * s);
				}
				return null;
			}

			// Overridden to update the scale and bounds of the control
			mxCellRendererRedrawControl = mxCellRenderer.prototype.redrawControl;
			mxCellRenderer.prototype.redrawControl = function(state)
			{
				mxCellRendererRedrawControl.apply(this, arguments);
				
				if (state.deleteControl != null)
				{
					var bounds = getDeleteControlBounds(state);
					var s = state.view.scale;
					
					if (state.deleteControl.scale != s || !state.deleteControl.bounds.equals(bounds))
					{
						state.deleteControl.bounds = bounds;
						state.deleteControl.scale = s;
						state.deleteControl.redraw();
					}
				}
				if (state.editControl != null)
				{
					var bounds = getEditControlBounds(state);
					var s = state.view.scale;
					
					if (state.editControl.scale != s || !state.editControl.bounds.equals(bounds))
					{
						state.editControl.bounds = bounds;
						state.editControl.scale = s;
						state.editControl.redraw();
					}
				}
			};
			
			// Overridden to remove the control if the state is destroyed
			mxCellRendererDestroy = mxCellRenderer.prototype.destroy;
			mxCellRenderer.prototype.destroy = function(state)
			{
				mxCellRendererDestroy.apply(this, arguments);
				if (state.deleteControl != null)
				{
					state.deleteControl.destroy();
					state.deleteControl = null;
				}
				if (state.editControl != null)
				{
					state.editControl.destroy();
					state.editControl = null;
				}
			};
		}
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
			var cell = new mxCell('Test1', new mxGeometry(0, 0, 80, 30));
			cell.vertex = true;
			var cells = graph.importCells([cell], x, y, target);

			if (cells != null && cells.length > 0)
			{
				graph.scrollCellToVisible(cells[0]);
				graph.setSelectionCells(cells);
			}
		};
		var funct2 = function(graph, evt, target, x, y)
		{
			var cell = new mxCell('Test2', new mxGeometry(0, 0, 80, 30),'fontColor=white;fillColor=red');
			cell.vertex = true;
			var cells = graph.importCells([cell], x, y, target);

			if (cells != null && cells.length > 0)
			{
				graph.scrollCellToVisible(cells[0]);
				graph.setSelectionCells(cells);
			}
		};
		var funct3 = function(graph, evt, target, x, y)
		{
			var cell = new mxCell('Test3', new mxGeometry(0, 0, 80, 30), 'fontColor=white;fillColor=green');
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
		var ds = mxUtils.makeDraggable(img2, graphF, funct2, dragElt, null, null, graph.autoscroll, true);
		var ds = mxUtils.makeDraggable(img3, graphF, funct3, dragElt, null, null, graph.autoscroll, true);
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
				menu.addItem('Delete link', null, function()
				{
					bootbox.confirm( "Do you really remove this link ?",
					function(result){
						if(result == true){
							graph.removeCells([cell]);
						}
					});
					mxEvent.consume(evt);
				});
				menu.addItem('Configure link', null, function()
				{
					console.log('Configure link' + 'selection count : ' + graph.getSelectionCount());
					console.log("state 2 : " + cell.value);
					if (graph.isEnabled()){
						if((cell.value === undefined) | (cell.value === null)){
							cell.value = "";
							json_data_array = "";
						} else {
							var json_data_array = cell.value.split("|");
						}
								
						if(json_data_array.length >= 2){
							var json_data = JSON.parse(json_data_array[1]);
						} else {
							var json_data = {
								"name_value": "",
								"level": "",
								"size": "",
								"celltype": "",
								"param_v_rest": "",
								"param_cm": "",
								"param_tau_m": "",
								"init_v_rest": "",
								"init_cm": "",
								"init_tau_m": "",
							};
						}
						ModalService.showModal({
							templateUrl: "modal_pop_dialog.html",
							controller: "PopDialogController",
							inputs: {
								title : "Population Form Editor",
								name_value: json_data_array[0],
								level: json_data.level,
								size: json_data.size,
								celltype: json_data.celltype,
								param_v_rest: json_data.param_v_rest,
								param_cm: json_data.param_cm,
								param_tau_m: json_data.param_tau_m,
								init_v_rest: json_data.init_v_rest,
								init_cm: json_data.init_cm,
								init_tau_m: json_data.init_tau_m,
							}
						}).then(function(modal) {
							modal.element.modal();
							modal.close.then(function(result) {
								// state.cell.setValue(result.name_value);
								console.log("get value : " + cell.getValue());
								cell.value = result.name_value + "|" + JSON.stringify(result);
								cell.setValue(cell.value);
								graph.refresh();
								console.log("get after set value : " + cell.getValue());
								var txtdisplay = $('text').text();
								console.log("txtdisplay : " + txtdisplay);
							});
						});
						mxEvent.consume(evt);
					}
				});
			}	
		};
	}
});


graphSchemaApp.controller('PopDialogController', ['$scope', '$element', 'title', 'close', 'name_value', 'level', 'size', 'celltype', 'param_v_rest', 'param_cm', 'param_tau_m', 'init_v_rest', 'init_cm', 'init_tau_m',
	function($scope, $element, title, close, name_value, level, size, celltype, param_v_rest, param_cm, param_tau_m, init_v_rest, init_cm, init_tau_m) {
		$scope.title = title;
		$scope.name_value = name_value;
		$scope.level = level;
		$scope.size = size;
		$scope.celltype = celltype;
		$scope.param_v_rest = param_v_rest;
		$scope.param_cm = param_cm;
		$scope.param_tau_m = param_tau_m;
		$scope.init_v_rest = init_v_rest;
		$scope.init_cm = init_cm;
		$scope.init_tau_m = init_tau_m;

		$scope.close = function() {
			close({
				name_value: $scope.name_value,
				level: $scope.level,
				size: $scope.size,
				celltype: $scope.celltype,
				param_v_rest: $scope.param_v_rest,
				param_cm: $scope.param_cm,
				param_tau_m: $scope.param_tau_m,
				init_v_rest: $scope.init_v_rest,
				init_cm: $scope.init_cm,
				init_tau_m: $scope.init_tau_m,
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
				level: level,
				size: size,
				celltype: celltype,
				param_v_rest: param_v_rest,
				param_cm: param_cm,
				param_tau_m: param_tau_m,
				init_v_rest: init_v_rest,
				init_cm: init_cm,
				init_tau_m: init_tau_m,
			}, 100); // close, but give 100ms for bootstrap to animate
			$('.modal-backdrop').remove();
		};
	}
]);