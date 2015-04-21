var the_url;
var api_key = "KIMONOLABS_API_KEY";

function parse_url(callback) {
  chrome.tabs.query({'active':true}, function(tabs) {
    var url = tabs[0].url;
    var subdominio = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    var dominio = subdominio.split(".")
    if (dominio.length === 3) {
    	the_url = dominio[1] + "." + dominio[2];
    } else {
    	the_url = subdominio;
    };
    console.log(the_url);
    callback(the_url)
  });
}
  
angular.module('bug', []) 

.controller('BugControl', ['$scope','$http', function($scope, $http) {
	parse_url(function(t_url) {
		$scope.domain = t_url;
		console.log($scope.domain);
		var url = 'https://www.kimonolabs.com/api/ondemand/cfie1m3k?apikey='+ api_key +'&kimpath2=' + $scope.domain
		$http.get(url).success(function(data){
			console.log(url)
			$scope.datos = data;
		});
	});
}]);