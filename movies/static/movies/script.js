$( document ).ready(function() {
    initiatePage();
    //eyða út?
    //haka við öll bíó
    //geyma fyrra val?
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
    
    console.log("Adding movie to watchman!");
    xurl = "/wm/add/" + $(location)[0].search + "&movie=" + movieID;
    console.log("xurl:", xurl);
    $.ajax({
        url: xurl,
        type: "get",
        success: function(data) {
            alert(data);
        },
        failure: function(data) { 
            alert('Got an error dude');
        }
    });
});

//move movie back to "all movies"
$( document ).on("click", "#toSee .movie .moveMovie", function() {
    var element = $(this).closest('.movie').detach();
    var movieID = element[0].id;
    
    $(this).text("Bæta við mínar myndir");
    $("#movies").append(element);
    
    console.log("Removing movie from watchman!");
    xurl = "/wm/remove/" + $(location)[0].search + "&movie=" + movieID;
    console.log("xurl:", xurl);
    $.ajax({
        url: xurl,
        type: "get",
        success: function(data) {
            alert(data);
        },
        failure: function(data) { 
            alert('Got an error dude');
        }
    });
    
    myMoviesEmpty();
});

//hide "my movies" if there are no chosen movies
function myMoviesEmpty() {
    if(isEmpty($("#toSeeTitle #toSee"))) {
        $("#toSeeTitle").addClass("hidden");
    }
};

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
        //~ Er buggy, virkar ekki hjá Bjarna
        //~ $(movie).hide();
    });
    jQuery.each( theaters, function(i, theater) {
        console.log(i+theater);
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
