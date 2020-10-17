$(function() {
    $(".change-devoured").on("click", function(event) {
        const id = $(this).data("id");
        const newDevoured = $(this).data("newdevoured");
        const newDevouredState = {devoured: newDevoured};

        $.ajax('/api/burgers/' + id,{
            type: "PUT",
            data: newDevouredState
        }).then(function(){
            console.log("Changed devoured to: ", newDevoured)
            location.reload();
        });
        
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("Clicked2")
        var newBurger = {
          burger_name: $("#ca").val().trim(),
          devoured: 0
        };

        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("Created new burger");
            location.reload();
        })
    });

    $(".delete-burger").on("click", function(event){
        const id = $(this).data("id");
        $.ajax("api/burgers/"+ id, {
            type: "DELETE"
        }).then( function(){
            console.log("Deleted burger");
            location.reload();
        })
    })
})