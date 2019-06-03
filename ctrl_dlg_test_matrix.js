var graphSchemaApp = angular.module('graphSchemaApp');

graphSchemaApp.controller('Dlg_test_matrix', ['$scope', '$element', 'title', 'close',
	function($scope, $element, title, close){
		$scope.title = title;

		$scope.beforeClose = function(){
			$scope.close();
		};
		$scope.close = function() {
			close({
			}, 100);
			$('.modal-backdrop').remove();
		};
		$scope.cancel = function() {
			close({
			}, 100);
			$('.modal-backdrop').remove();
		};
	}
]);
