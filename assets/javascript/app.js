		//initial movie array//
var movies = ["Super Troopers", "Star Wars", "Guardians of the Galaxy", "Thor Ragnarock", "Forrest Gump"];

		//displayMovieFunction renders HTML to display content//
      function displayMovieInfo() {
          var movie = $(this).attr("data-name");
          $("#movies-view").empty();
          //api key and call. limit=10 rating = G//
          var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XHFmZZSANTVZTtZqyez6DaSbp1Zs66eM&q=" +
              movie + "&limit=10&offset=0&rating=G&lang=en";
              //ajax call for specific movie button being clicked//
          $.ajax({
              url: queryURL,
              method: "GET"
          })
          	//.done 'promise'//
          .done(function(response) {
              var results = response.data;
              //loop through array//
              for (var i = 0; i < results.length; i++) {
              	//addl vars for loop//
                  var gifDiv = $("<div class='item'>");
                  var rating = results[i].rating;
                  //create <p> w/ jquery, set text to rating//
                  var p = $("<p>").text("Rating: " + rating);
                  //setting animated variable to results//
                  var animated = results[i].images.fixed_height.url;
                  //setting still variable to results//
                  var still = results[i].images.fixed_height_still.url;
                  //creating variable for gifs, linking/ creating jquery image//
                  var gifImage = $("<img>");
                  //adding attributes to gifs//
                  gifImage.attr("src", still);
                  gifImage.attr("data-still", still);
                  gifImage.attr("data-state", "still");
                  gifImage.attr("data-animate", animated);
                  gifImage.addClass("gifImage");
                  	//prepending rating(p) and image to front of gifDiv//
                  gifDiv.prepend(p);
                  gifDiv.prepend(gifImage);
                  	//prepend gifdiv to movies-view//
                  $("#movies-view").prepend(gifDiv);
              }

          });
      }
      	//function displays movie data//
      function renderButtons() {
      		//deletes prior movie in buttons-view, so we can add new//
          $("#buttons-view").empty();
          //loop through array of movies//
          for (var i = 0; i < movies.length; i++) {
          		//creates var a, creates a button w/ jquery//
              var a = $("<button>");
              	//adding a class to a//
              a.addClass("movie");
              	//adding data attribute, set/get//
              a.attr("data-name", movies[i]);
              	//provides text for movie selected//
              a.text(movies[i]);
              	//adds button to end of div (append)//
              $("#buttons-view").append(a);
          }
      }
      	//button handles events when movie button clicked//
      $("#add-movie").on("click", function(event) {
          event.preventDefault();
          	//grabs input from textbox. trim takes off spaces//
          var movie = $("#movie-input").val().trim();
          console.log(movie);
          //if movie blank nothing happens, else push//
          //do this so blank buttons are not created if submit pushed by mistake//
        if (movie != ""){
          	//adds movie from textbox to array//
          movies.push(movie);
        }
        	//call renderButtons which handles processing of movie array//
          renderButtons();
      });
      	//on click function targeting movie class, and info//
      $(document).on("click", ".movie", displayMovieInfo);
      	//render buttons//
      renderButtons();

      $(document).on("click", ".gifImage", function() {
         var state = $(this).attr("data-state");
          console.log(state);
          console.log(this);
          	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
     		// Then, set the image's data-state to animate
     		// Else set src to the data-still value
          if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
          } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
          }
      });




