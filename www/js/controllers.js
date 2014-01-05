angular.module('gspreadsheet-report.controllers', [])
    .controller('MainCtrl', ['$scope', function ($scope) {

    	moment.lang('ru')

		$scope.time = {}
        $scope.time.day = moment().format('dddd');
        $scope.time.date = moment().format("MMM Do YYYY");
        $scope.time.time = moment().format("hh:mm");


        function load_spreadsheet_data(){
            localStorage.clear();
            var url = "https://spreadsheets.google.com/pub?key=0AoharBNk0-AHdG5PUHpzN0NIZGFTaFhkWmt1aTl0N0E&hl=en&output=html";

            var googleSpreadsheet = new GoogleSpreadsheet();
            googleSpreadsheet.url(url);

            googleSpreadsheet.load(function(result) {
                data = JSON.stringify(result).replace(/,/g,",\n");

                try{
                	$scope.boards = JSON.parse(data).data;
            	}catch(e){
            		alert("Проблема с обработкой данных. Проверьте источник!");
            	}
                angular.forEach($scope.boards, function(board, index){
                	// собираем борды и меняем ; на , - иначе JSON выше падает
                	eval("$scope.boards[index]={"+ board.split(";").join(",") + "}")
                	if(!$scope.boards[index].size){
                		$scope.boards[index].size="1x1";
                	}
                })
                $scope.$apply();
            });
        }
  		      
        load_spreadsheet_data();

    }])
    .controller('ViewCtrl', ['$scope', function ($scope) {
        $scope.status = "Also totally works!";
    }]);
