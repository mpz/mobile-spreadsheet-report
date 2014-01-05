angular.module('gspreadsheet-report.directives', [])

  .directive('boards', [function() {
	var directive = { restrict: 'E', replace: true };

	directive.template = "<p>test</p>";
	
	return directive;
  }]);