angular.module('gspreadsheet-report.controllers', [])
    .controller('DashboardsCtrl', ['$scope', function ($scope) {
        $scope.dashboards = [];

        function load_dashboards(){
            var total = localStorage["totalDashboards"];
            for(var i=1; i<=total; i++){
                $scope.dashboards.push({
                    key: localStorage["Dashboard" + i + ".key"],
                    title: localStorage["Dashboard" + i + ".title" ],
                    index: i
                })
            }
            return true
        }

        load_dashboards();
    }])

    .controller('MainCtrl', ['$scope', '$routeParams', '$timeout', function ($scope, $routeParams, $timeout) {

    	moment.lang('ru')

		$scope.time = {}
        $scope.time.day = moment().format('dddd');
        $scope.time.date = moment().format("MMM Do YYYY");
        $scope.time.time = moment().format("hh:mm");


        function load_spreadsheet_data(key){
            var url = "https://spreadsheets.google.com/pub?key=" + key + "&hl=en&output=html";

            var googleSpreadsheet = new GoogleSpreadsheet();
            googleSpreadsheet.url(url);

            googleSpreadsheet.load(function(result) {
                data = JSON.stringify(result).replace(/,/g,",\n");

                var boards = [];
                $scope.boards = [];
                try{
                    boards = JSON.parse(data).data;
            	}catch(e){
            		alert("Проблема с обработкой данных. Проверьте источник! Запятых быть не должно!");
            	}
                angular.forEach(boards, function(board, index){
                	// собираем борды и меняем ; на , - иначе JSON выше падает
                    try{
                        if(board!=""){
                            eval("$scope.boards[index]={"+ board.split(";").join(",") + "}")
                            $scope.boards[index].status = "success";
                            if(!$scope.boards[index].size){
                                $scope.boards[index].size="1x1";
                            }
                            $scope.boards[index].id = "board" + index;
                        }
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

        function load_dashboard() {
            var key, dashboard_id;
            if($routeParams.id){
                // по индексу
                var dashboard_id = "Dashboard" + $routeParams.id;
                var key = localStorage[dashboard_id + ".key"];
                $scope.dashboard_id = dashboard_id;
                $scope.dashboard_title = localStorage[dashboard_id + ".title"]
            }else if($routeParams.key){
                // по ключу таблицы
                key = $routeParams.key;
            }
            
            if(key){
                $scope.spreadsheet_key = key;
                load_spreadsheet_data(key);
            }
        }

        load_dashboard();

        function load_boards_styles(){
            angular.forEach(document.getElementsByTagName("article"), function(board, index){
                var style = localStorage[$scope.dashboard_id + "." + board.getAttribute("id") + ".style"]
                if(style){
                    board.setAttribute("style", style);
                }
            })
        }

        function save_boards_styles(){
            if ($scope.dashboard_id != "Dashboard" + $routeParams.id){
                return;
            }

            angular.forEach(document.getElementsByTagName("article"), function(board, index){
                localStorage[ $scope.dashboard_id + "." + board.getAttribute("id") + ".style"] = board.getAttribute("style");
            })
            $timeout(save_boards_styles, 2000);
        }

    }])

    .controller('AddDashboardCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.key = null;
        $scope.title = null;

        $scope.add = function(){
            if (this.key) {
                var total = localStorage["totalDashboards"];
                if(total){
                    total = parseInt(total)+1;
                }else{
                    total = 1;
                }
                localStorage["totalDashboards"] = total;
                localStorage["Dashboard" + total + ".key"] = this.key;
                localStorage["Dashboard" + total + ".title" ] = this.title;

                $location.path('dashboard/' + total);
            }
        }
    }]);
