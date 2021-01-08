function reload(onstart){
    $('#facts').load( "modul/dashboard/call/getFacts.php", function(){
        if(onstart){
            $('#facts').slideDown('slow');
        }
    });
    $('#entries').load( "modul/dashboard/call/getEntries.php", function(){
        if(onstart){
            $('#entries').slideDown('slow');
        }
    });
}

function delEntry(entryID){

    $.ajax({
        type: "POST",
        data: {entryID:entryID},
        url: "modul/dashboard/call/removeWeight.php",
        success: function(data){
            if(data){
                $('#errorText').html(data);
                $('#errorAlert').fadeIn('fast');
            } else {
                $('#successText').html("Successfully Removed.");
                $('#successAlert').fadeIn('fast').delay(2000).fadeOut('fast');
                reload();
            }
        }
    });

}

function timeStamp() {

    var now = new Date();

    var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }

    return date.join("-") + " " + time.join(":");

}

function setTimestamp() {
    setInterval(function () {
        var currentStamp = timeStamp();
        $('#inputDate').val(currentStamp);
        $('#inputCalDate').val(currentStamp);
    }, 300000);
}

function dataCheck(){
    $('#errorText').html("<b>Welcome! Seems like you are missing some values here. Be sure to complete your <a class='dynLink' href='modul/settings/settings.php'>Settings</a> first!</b>");
    $('#errorAlert').fadeIn('slow');
    makeDynamic('.dynLink');
}

$(document).ready(function(){

    $('#searchCal').click(function(){
        $('.objectContents').empty().load('modul/dashboard/call/getCalObjects.php');
    });

    function addCalEntry(){

        $('#errorAlert').fadeOut('fast');
        $('#addCalButton').prop('disabled', true);

        var title = $('#inputCalTitle').val();
        var date = $('#inputCalDate').val();
        var amount = $('#inputCalAmount').val();
        var calories = $('#inputCal').val();
        var error = "";

        if(date < 8){
            error += "<li>Please enter a Date</li>";
        }

        if(amount < 0){
            error += "<li>Please enter a correct Amount</li>";
        }

        if(calories < 1){
            error += "<li>Please enter Calories</li>";
        }

        if(error != ""){

            $('#errorText').html(error);
            $('#errorAlert').fadeIn('fast');
            $('#addCalButton').prop('disabled', false);

        } else {

            $.ajax({
                type: "POST",
                data: {date:date, amount:amount, title:title, calories:calories},
                url: "modul/dashboard/call/addCalories.php",
                success: function(data){
                    if(data){
                        $('#errorText').html(data);
                        $('#errorAlert').fadeIn('fast');
                        $('#addCalButton').prop('disabled', false);
                    } else {
                        $('#successText').html("Successfully Added.");
                        $('#successAlert').fadeIn('fast').delay(2000).fadeOut('fast');

                        reload();

                        $('#inputCalTitle').val("");
                        $('#inputCalAmount').val("");
                        $('#inputCal').val("");
                        $('#addCalButton').prop('disabled', false);

                    }
                }
            });

        }

    }

    function addEntry(){

        $('#errorAlert').fadeOut('fast');
        $('#addEntryButton').prop('disabled', true);

        var date = $('#inputDate').val();
        var weight = $('#inputWeight').val();
        var error = "";

        if(date < 2){
            error += "<li>Please enter a correct Date</li>";
        }

        if(weight < 8){
            error += "<li>Please enter a weight</li>";
        }

        if(error != ""){

            $('#errorText').html(error);
            $('#errorAlert').fadeIn('fast');
            $('#addEntryButton').prop('disabled', false);

        } else {

            $.ajax({
                type: "POST",
                data: {date:date, weight:weight},
                url: "modul/dashboard/call/addWeight.php",
                success: function(data){
                    if(data){
                        $('#errorText').html(data);
                        $('#errorAlert').fadeIn('fast');
                        $('#addEntryButton').prop('disabled', false);
                    } else {
                        $('#successText').html("Successfully Added.");
                        $('#successAlert').fadeIn('fast').delay(2000).fadeOut('fast');

                        reload();

                        $('#inputWeight').val("");
                        $('#inputDate').val()
                        $('#addEntryButton').prop('disabled', false);

                    }
                }
            });

        }


    }

    reload(1);
    $('#addEntryBox').slideDown('fast');

    setTimestamp();

    /*$(document).keypress(function(e) {  ---> To be fixed
        if(e.which == 13) {
            addEntry();
        }
    });*/

    $('#addEntryButton').click(function(event){
        event.preventDefault();
        addEntry();
    });

    $('#addCalButton').click(function(event){
        event.preventDefault();
        addCalEntry();
    });

});
