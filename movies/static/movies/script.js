$( document ).ready(function() {
    initiatePage();
});

function initiatePage() {
    updateMovies();
    myMoviesEmpty();
}

//dropdown for theaters
$("#chooseTheater").on("click", function() {
    $( "#theaterList" ).toggleClass( "hidden" );
});

//move movie to "my movies"
$( document ).on("click", "#movies .movie .moveMovie", function() {
    var element = $(this).closest(".movie").detach();
    var movieID = element[0].id;
    
    $(this).text("Taka úr mínum myndum");
    $("#toSee").append(element);
    $("#toSeeTitle").removeClass("hidden");
    
    xurl = "/wm/add/" + $(location)[0].search + "&movie=" + movieID;
    $.ajax({
        url: xurl,
        type: "get",
        success: function(data) {
            console.log(data);
        },
        failure: function(data) { 
            console.log('Error', data);
        }
    });
});

//move movie back to "all movies"
$( document ).on("click", "#toSee .movie .moveMovie", function() {
    var element = $(this).closest('.movie').detach();
    var movieID = element[0].id;
    
    $(this).text("Bæta við mínar myndir");
    $("#movies").append(element);
    
    xurl = "/wm/remove/" + $(location)[0].search + "&movie=" + movieID;
    $.ajax({
        url: xurl,
        type: "get",
        success: function(data) {
            console.log(data);
        },
        failure: function(data) { 
            console.log('Error', data);
        }
    });
    
    myMoviesEmpty();
});

//hide "my movies" if there are no chosen movies
function myMoviesEmpty() {
    if (isEmpty($("#toSeeTitle #toSee"))) {
        $("#toSeeTitle").addClass("hidden");
    } else {
        $("#toSeeTitle").removeClass("hidden");
    }
};

//check if element is empty
function isEmpty( el ){
    return !$.trim(el.html());
} 

//Returns the user preferred theaters
function getSelectedTheaters (x,y) {
    var checkedValues = $(".theater:checked").map(function() {
        return this.value;
    }).get();
    return checkedValues;
};

//shows movies based on user's choice of theaters
function updateMovies() {
    var theaters = getSelectedTheaters();
    $(".movie").each( function(j, movie){
        $(movie).hide();
    });
    jQuery.each( theaters, function(i, theater) {
        $(".movie").each( function(j, movie){
            if($(movie).hasClass(theater)){
                $(movie).show();
            }
        });
    });
};

//listens to changes in user theater choice
$( "input:checkbox" ).change(function() {
    updateMovies();
});



$(".figureAndShowtimes").mouseover(function(e) {
    $(this).find("img").stop(true,true).fadeTo( "normal", 0.10 );
    $(this).find(".showtimes").addClass("atFrontTemp");
});

$(".figureAndShowtimes").mouseout(function(e) {
    if (!$(this).find(".showtimes").hasClass("atFront")) {
        $(this).find("img").stop(true,true).fadeTo( "normal", 1.0 );
    }
    $(this).find(".showtimes").removeClass("atFrontTemp");
});

$(".figureAndShowtimes").click(function(e) {
    if($(this).find(".showtimes").hasClass("atFront")) {
        var trans = 1.0;
    }
    else {
        var trans = 0.1;
    }
    $(this).find("img").stop(true,true).fadeTo( "normal", trans);
    $(this).find(".showtimes").toggleClass("atFront");
});

/*
$( document ).on("click", ".movie .figureAndShowtimes", function() {
    var showtimesParent = $(this).parent();
    var showtimes = showtimesParent.find(".showtimes");

    showtimes.toggleClass("visible");
    console.log("Hæ!");
}); */