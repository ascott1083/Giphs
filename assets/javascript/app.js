$(document).ready(function(){


    const topics = ["cookie", "cupcake", "banana", "cheese", "macaroni and cheese", "watermelon", "kiwi", "pizza", "tofu", "pie", "lettuce", "ice cream", "apple", "strawberry", "potato chips", "burrito", "taco", "chocolate", "mashed potatoes", "pasta"];
  
    function createButtons() {
  

        $("#gif-buttons").empty();
  

        for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.addClass("buttons btn btn-default");
        newButton.attr("data-topic", topics[i]);
        newButton.attr("id", topics[i]);
        $("#gif-buttons").append(newButton);
      }
    }
  

    $(document.body).on("click", ".buttons", function() {
    


      let baseURL = "https://api.giphy.com/v1/gifs/search?q=";
      let apiKey = "api_key=2Djlw2Z3UfS0QNM9FkTSOO3bh0o3KOoc";
      let searchTerm = $(this).text();
      let limit = 10;
      let rating;
  

      let queryURL = baseURL + searchTerm + "&" + "limit="+ limit + "&" + apiKey;
  

      $("#gif-container").empty();
  
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
  
        var results = response.data;
  

        for (var i = 0; i < results.length; i++) {
  

            var foodDiv = $("<div>").attr("id", "food-div");
  

            var ratingText = $("<p>").text("Rating: " + results[i].rating);
          ratingText.addClass("rating");
  

          var foodImage = $("<img>");
          foodImage.addClass("img-fluid pic rounded");
  

          foodImage.attr("data-still", results[i].images.fixed_height_still.url);
          foodImage.attr("src", results[i].images.fixed_height_still.url);
          foodImage.attr("data-animated", results[i].images.fixed_height.url);
          foodImage.attr("data-state", "still");
  

          foodDiv.append(ratingText);
          foodDiv.append(foodImage);
  

          $("#gif-container").prepend(foodDiv);
        }
      });
    });
  

    $(document.body).on("click", ".pic", function() {
  

        var state = $(this).attr("data-state");
  
      

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-food").on("click", function(event) {

        event.preventDefault();
  

        var food = $("#food-input").val().trim();
  

        if (food.length > 0) {
        topics.push(food);
      }
  

      createButtons();
  

      $("#food-input").val("");
    });
  

    createButtons();
  
  });