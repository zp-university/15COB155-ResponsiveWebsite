/**
 * Created by zackp on 10/03/2016.
 */

function populateWeather(tag, location, header) {

    $.simpleWeather({
        location: location,
        unit: 'c',
        success: function (weather) {

            html = '<h3>' + header + '</h3>';
            html += '<div class="weather-text col-lg-6 col-md-6 col-sm-6 col-xs-6"> Temperature: ' + weather.temp + '&deg' + weather.units.temp + '</div>';
            html += '<div class="weather-text col-lg-6 col-md-6 col-sm-6 col-xs-6"> Humidity: ' + weather.humidity + '%</div>';
            html += '<img id="weather-image" src="' + weather.image + '" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';

            $(tag).html(html);
        },
        error: function (error) {

            $("#loughborough").html('<p>' + error + '</p>');
        }
    });
}

$(function(){

    populateWeather("#main-location", 'loughborough', "Loughborough");

    navigator.geolocation.getCurrentPosition(function(position){

        populateWeather("#user-location", position.coords.latitude+','+position.coords.longitude, "Your Location");
    });
});