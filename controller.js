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

graphSchemaApp.controller('graphController', function($scope, $rootScope, $state) {
	// $state.reload();
	if (!mxClient.isBrowserSupported())
	{
		// Displays an error message if the browser is not supported.
		mxUtils.error('Browser is not supported!', 200, false);
	} else {
		// Enables guides
		mxGraphHandler.prototype.guidesEnabled = true;
		
		// Alt disables guides
		mxGuide.prototype.isEnabledForEvent = function(evt)
		{
			return !mxEvent.isAltDown(evt);
		};
		
		// Enables snapping waypoints to terminals
		mxEdgeHandler.prototype.snapToTerminals = true;
		
		var graphs = [];
		// Detect existings elements in the DOM
		// if(document.getElementById("div_toolbar") || document.getElementById("svg_container")){ var i = 1; } else { var i = 0; }
		// Creates the graph inside the given container
		// for (i; i < 1; i++)
		// {
			// Creates a DOM node that acts as the drag source
			var img = mxUtils.createImage('img/gear.png');
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

			//create left vertical toolbar
			var div_toolbar = document.createElement('div');
			div_toolbar.id = 'div_toolbar';
			div_toolbar.style.width = '48px';
			div_toolbar.style.float = 'left';
			// document.body.appendChild(div_toolbar);
			document.getElementById("id_graph_editor").appendChild(div_toolbar);
			div_toolbar.appendChild(img);
			div_toolbar.appendChild(img2);
			div_toolbar.appendChild(img3);
			div_toolbar.appendChild(button_zoom_in);
			div_toolbar.appendChild(button_zoom_out);

			var container = document.createElement('div');
			container.id = 'svg_container';
			container.style.overflow = 'scroll';
			container.style.position = 'relative';
			container.style.float = 'left';
			container.style.width = '521px';
			container.style.height = '291px';
			container.style.background = 'url(\'img/grid.gif\')';
			container.style.cursor = 'default';
			// document.body.appendChild(container);
			document.getElementById("id_graph_editor").appendChild(container);
			
			var graph = new mxGraph(container);
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

			// var read = function(graph, filename)
			// {
			// 	var req = mxUtils.load(filename);
			// 	var root = req.getDocumentElement();
			// 	var dec = new mxCodec(root.ownerDocument);
				
			// 	dec.decode(root, graph.getModel());
			// };

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
									graph.removeCells([state.cell]);
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
			try
			{
				// var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
				// var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
				// var e1 = graph.insertEdge(parent, null, '', v1, v2);
				// read(graph, 'file_graph.xml');
				var xml = mxUtils.load('file_graph.xml');
				//var xml = '';
				var doc = mxUtils.parseXml(xml.request.response);
			   	var codec = new mxCodec(doc);
			   	var elt = doc.documentElement.firstChild;
			   	var cells = [];
			   	while (elt != null){
					cells.push(codec.decodeCell(elt));
					graph.refresh();
					elt = elt.nextSibling;
			   	}
		   		graph.addCells(cells);
			}
			finally
			{
				// Updates the display
				graph.getModel().endUpdate();
			}
			
			graphs.push(graph);
		// }

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
	}
});