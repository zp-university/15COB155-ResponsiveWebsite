/**
 * Created by zackp on 11/03/2016.
 */

function setMessages(messages) {

    localStorage.setItem("messages", JSON.stringify(messages));
}

function displayMessage(message) {

    var html = "<div id='message-container'>";
    html += "<div id='message'>";
    html += "<div id='message-title'>" + message['name'] + " (" + message['age'] + message['gender'] + ") - Location: " + message['location'] + "</div>";
    html += "<div class='row' id='message-content'>";
    html += "<div class='col-lg-1 col-md-1 col-sm-1 col-xs-2' id='profile-picture-container'>";
    html += "<img id='profile-picture' src=" + message['picture_base64'] + ">";
    html += "</div>";
    html += "<div id='message-text' class='col-lg-11 col-md-11 col-sm-11 col-xs-10'>" + message['message'] + "</div>";
    html += "</div>";
    html += "<div id='message-geo'>" + message['geo_location'] + "</div>";
    html += "</div></div>";

    $("#messages").append(html);
}

function loadMessages() {

    $("#messages").html("");
    $.each(JSON.parse(localStorage.getItem("messages")), function(k, v) {

        displayMessage(v);
    });
}

function getProfilePicture() {

    return $("#profile-picture-preview").attr("src");
}

function addGeoLocation() {

    navigator.geolocation.getCurrentPosition(function(position){

        $("#geo-display").html(position.coords.latitude+','+position.coords.longitude);
    });
}

function addNewMessage(){

    var message = {
        "name": $("#name-input").val(),
        "picture_base64": getProfilePicture(),
        "geo_location": $("#geo-display").html(),
        "age": $("#age-selector").val(),
        "gender": $("#gender-selector").val(),
        "message": $("#message-input").val(),
        "location": $("#location-input").val()
    };

    var messages = JSON.parse(localStorage.getItem("messages"));
    messages.push(message);
    setMessages(messages);

    displayMessage(message);
}

function previewFile() {

    var preview = document.getElementById('profile-picture-preview');
    var file = document.getElementById('profile-picture-chooser').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

$(function(){

    for(var i = 1; i <= 120; ++i) {

        $("#age-selector").append('<option value="' + i + '">' + i + '</option>')
    }

    if (localStorage.getItem("messages_loaded") != "true") {

        $.getJSON("./resources/json/default_messages.json", function (data) {

            setMessages(data);
        });

        localStorage.setItem("messages_loaded", "true");
    }

    loadMessages(JSON.parse(localStorage.getItem("messages")));

    var timeout = 0;
    window.addEventListener("devicemotion", function(event) {

        if (timeout <= 0) {

            var ralpha = event.rotationRate.alpha;

            if (ralpha > 6) {

                addNewMessage();
                timeout = 150;
            }
        } else {

            timeout--;
        }
    });
});