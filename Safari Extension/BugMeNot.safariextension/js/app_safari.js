var the_url;
var api_key = "PuGa0q6lJ63a4MP02z6e1LKzamGQCJ6d";

function parse_url(callback) {
    console.log(safari.extension.globalPage.contentWindow.current_URL());
    var url = safari.extension.globalPage.contentWindow.current_URL();
    console.log(url);
    var subdominio = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    var dominio = subdominio.split(".");
    //no funciona para dominios .co.uk, por ejemplo, dos .
    if (dominio.length == 3){
        the_url = dominio[1] + "." + dominio[2];
    } else {
        the_url = subdominio;
    };
    console.log(the_url);
    callback(the_url);

}
  
angular.module('bug', []) 

.controller('BugControl', ['$scope','$http', function($scope, $http) {

    $scope.getColor = function(rate) {
      var percent_array = rate.split("%");
      var percent = percent_array[0];
      if(percent > 90) {
        return 90;
      } else if (percent > 80) {
        return 80;
      } else if (percent > 70) {
        return 70;
      } else if (percent > 60) {
        return 60;
      } else if (percent > 50) {
        return 50;
      } else if (percent > 40) {
        return 40;
      } else if (percent > 30) {
        return 30;
      } else if (percent > 20) {
        return 20;
      } else if (percent > 10) {
        return 10;
      } else if (percent > 0) {
        return 0;
      }
    }

    parse_url(function(t_url) {

        // $scope.domain = "Cargando ...";
        $scope.domain = t_url;
        console.log($scope.domain);
        var url = 'https://www.kimonolabs.com/api/ondemand/cfie1m3k?apikey='+ api_key +'&kimpath2=' + t_url

        $http.get(url).success(function(data){
            console.log(url)
            $scope.datos = data;
            console.log(data)
            // $scope.domain = t_url;
        });

    });
}]);