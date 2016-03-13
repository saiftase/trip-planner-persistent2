$(function() {
    var fn = function(map, marker){
 			new Tripplanner(days, map, marker, attractions);
    }

    initialize_gmaps(fn);
});
