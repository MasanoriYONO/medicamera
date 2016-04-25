// This is a JavaScript file

var markerObjs = new Array();
var map = null;
var mapCurrent = null;

var directionsService=new google.maps.DirectionsService();
var directionsDisplay;
var distance;
var distanceText;
var durationText;
    
function map_view(){
    myNavigator.pushPage('page_map.html');
}

$(document).on('pageinit', '#page_map', function(event) {
    console.log("page_map is pageinit.");
        
});