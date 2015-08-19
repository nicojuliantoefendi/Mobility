angular.module('starter.controllers', [])

.controller('EnergyUsageCtrl', function($scope) {
	
	var tips =[
		{pic: 'nighttime.jpg', header:'Night-time rate', tip:'You are using a lot of power in the daytime. Try washing your laundry at night.'},
		{pic: 'switchoff.PNG', header:'Switching off your appliances', tip:'Switching off your appliances can help to get your consumption lowered down.'},
		{pic: 'energy.png', header:'Energy efficiency bulbs', tip:'When you swap your old bulbs for new energy-efficient ones, you will help all of us to safe this planet!.'}];
		
	var achievements =[
		{pic: 'litlamp.PNG'},
		{pic: 'burntcoal.PNG'},
		{pic: 'generatecarbon.PNG'},
		{pic: 'usagecycling.PNG'}];
		
	//init
	$scope.tip = tips[0];
	$scope.achievement = achievements[0];
	
	google.load("visualization", "1", {packages:["corechart"], callback: drawChart});
    google.setOnLoadCallback(drawChart);
	
	function drawChart() {
		var data = google.visualization.arrayToDataTable([
		  ['Task', 'Hours per Day'],
		  ['Used',       25],
		  ['Remaining',  75]
		]);

		var options = {
		  fontSize: 0,
		  pieHole: 0.8,
		  legend: {position: 'none'},
		  colors: ['#4D4C8B', '#e5e5e5']
		};
		
		function resizeChart () {
			chart.draw(data, options);
		}
		
		if (document.addEventListener) {
			window.addEventListener('resize', resizeChart);
		}
		else if (document.attachEvent) {
			window.attachEvent('onresize', resizeChart);
		}
		else {
			window.resize = resizeChart;
		}

		var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
		chart.draw(data, options);
	}

    function drawVisualization() {
        // Some raw data (not necessarily accurate)
        var data2 = google.visualization.arrayToDataTable([
         ['Days', 'Day Usage', 'Night Usage', 'Temperature'],
         ['1'	   ,  		  11,             5,            31],
		 ['2'	   ,  		  10,             6,            32],
		 ['3'	   ,  		  12,             7,            31],
		 ['4'	   ,  		  12,             9,            32],
		 ['5'	   ,  		   9,             8,            33],
		 ['6'	   ,  		   8,             8,            33],
		 ['7'	   ,  		  10,             8,            33],
		 ['8'	   ,  		  12,             1,            34],
		 ['9'	   ,  		  12,             2,            34],
		 ['10'	   ,  		  11,             1,            33],
		 ['11'	   ,  		  12,             7,            32],
		 ['12'	   ,  		  11,             7,            32],
		 ['13'	   ,  		  12,             7,            32],
		 ['14'	   ,  		  14,             7,            31],
		 ['15'	   ,  		  15,             6,            30],
		 ['16'	   ,  		  17,             8,            30],
		 ['17'	   ,  		  15,             9,            31],
		 ['18'	   ,  		  13,            10,            31],
		 ['19'	   ,  		  10,            11,            31],
		 ['20'	   ,  		   7,             7,            32],
		 ['21'	   ,  		  11,             7,            32],
		 ['22'	   ,  		  11,             7,            31],
		 ['23'	   ,  		  12,             7,            31],
		 ['24'	   ,  		  12,             1,            32],
		 ['25'	   ,  		  12,             1,            32],
		 ['26'	   ,  		  13,             2,            31],
		 ['27'	   ,  		   9,             8,            31],
		 ['28'	   ,  		   8,             8,            31],
		 ['29'	   ,  		  12,             7,            30],
		 ['30'	   ,  		  12,             6,            30],
		 ['31'	   ,  		  12,             6,            30]
      ]);

		var options2 = {
		  vAxis: {title: 'Usage (kWh'},
		  hAxis: {title: 'January'},
		  seriesType: 'bars',
		  series: {2: {type: 'line'}},
		  legend: {position: 'bottom'},
		};
		
		function resizeChart () {
			chart2.draw(data2, options2);
		}
		
		if (document.addEventListener) {
			window.addEventListener('resize', resizeChart);
		}
		else if (document.attachEvent) {
			window.attachEvent('onresize', resizeChart);
		}
		else {
			window.resize = resizeChart;
		}

		var chart2 = new google.visualization.ComboChart(document.getElementById('chart_div'));
		chart2.draw(data2, options2);
	}
	
	angular.element(document).ready(function() {
		angular.element('.energy-usage-tabs .energy-usage-tab-links a').on('click', function(e)  {
			var currentAttrValue = angular.element(this).attr('href');
	 
			// Show/Hide Tabs
			angular.element('.energy-usage-tabs ' + currentAttrValue).show().siblings().hide();
	 
			// Change/remove current tab to active
			angular.element(this).parent('li').addClass('active').siblings().removeClass('active');
	 
			e.preventDefault();
		});
		
		angular.element('.energy-usage-achievement').on('click', function(e)  {
	 
			// Change/remove current tab to active
			angular.element(this).addClass('active').siblings().removeClass('active');
	 
			e.preventDefault();
		});
	});
	
	$scope.reloadChart = function(tabId){
		switch(tabId) {
		case 1:
			drawChart();
			$scope.tip = tips[0];
			break;
		case 2:
			drawVisualization();
			$scope.tip = tips[1];
			break;
		case 3:
			$scope.tip = tips[2];
			break;
		default:
			drawChart();
		}
	}
	
	$scope.reloadAchievement = function(achievementId){
		switch(achievementId) {
		case 1:
			$scope.achievement = achievements[0];
			break;
		case 2:
			$scope.achievement = achievements[1];
			break;
		case 3:
			$scope.achievement = achievements[2];
			break;
		case 4:
			$scope.achievement = achievements[3];
			break;
		default:
			drawChart();
		}
	}
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  $scope.changeChat = function(chatId){
	  Chats.change(chatId);
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
