angular.module('gspreadsheet-report.controllers', [])
    .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    	moment.lang('ru')

		$scope.time = {}
        $scope.time.day = moment().format('dddd');
        $scope.time.date = moment().format("MMM Do YYYY");
        $scope.time.time = moment().format("hh:mm");


        function load_spreadsheet_data(){
            var url = "https://spreadsheets.google.com/pub?key=0AoharBNk0-AHdG5PUHpzN0NIZGFTaFhkWmt1aTl0N0E&hl=en&output=html";

            var googleSpreadsheet = new GoogleSpreadsheet();
            googleSpreadsheet.url(url);

            function generate_id_from_text(text){
                var i = text.length;
                var code = 100;
                while (i--) {
                  code+=text[i].charCodeAt()*5
                }
                return code;
            }

            googleSpreadsheet.load(function(result) {
                data = JSON.stringify(result).replace(/,/g,",\n");

                try{
                	$scope.boards = JSON.parse(data).data;
            	}catch(e){
            		alert("Проблема с обработкой данных. Проверьте источник! Запятых быть не должно!");
            	}
                angular.forEach($scope.boards, function(board, index){
                	// собираем борды и меняем ; на , - иначе JSON выше падает
                    try{
                	    eval("$scope.boards[index]={"+ board.split(";").join(",") + "}")
                        $scope.boards[index].status = "success";
                        if(!$scope.boards[index].size){
                            $scope.boards[index].size="1x1";
                        }
                        $scope.boards[index].id = "board" + generate_id_from_text(board);
                    }catch(e){
                        var msg = e.message + " for text: " + board
                        $scope.boards[index]={error_text:msg}
                        $scope.boards[index].status = "error";
                    }
                })
                $scope.$apply();
                refresh_drag_events();

                load_boards_styles();
                save_boards_styles();
            });
        }

        load_spreadsheet_data();

        function load_boards_styles(){
            angular.forEach(document.getElementsByTagName("article"), function(board, index){
                var style = localStorage[board.getAttribute("id") + ".style"]
                if(style){
                    board.setAttribute("style", style);
                }
            })
        }

        function save_boards_styles(){
            angular.forEach(document.getElementsByTagName("article"), function(board, index){
                localStorage[board.getAttribute("id") + ".style"] = board.getAttribute("style");
            })
            $timeout(save_boards_styles, 2000);
        }

    }])

    .controller('ViewCtrl', ['$scope', function ($scope) {
        $scope.status = "Also totally works!";
    }]);
