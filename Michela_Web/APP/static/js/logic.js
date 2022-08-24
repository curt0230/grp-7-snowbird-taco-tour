/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }




$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


// call Flask API endpoint
function makePredictions() {
    var BusinessAcceptsCreditCards = $("#BusinessAcceptsCreditCards").val();
    var GoodForKids = $("#GoodForKids").val();
    var WheelchairAccessible = $("#WheelchairAccessible").val();
    var AlcoholId = $("#AlcoholId").val();
    var BusinessParkingTypeId = $("#BusinessParkingTypeId").val();
    var RestaurantsTypeId = $("#RestaurantsTypeId").val();
    var GoodForMealTypeId = $("#GoodForMealTypeId").val();
    var latitude = $("#latitude").val();
    var longitude = $("#longitude").val();

    // check if inputs are valid

    // create the payload
    var payload = {
        "BusinessAcceptsCreditCards": BusinessAcceptsCreditCards,
        "GoodForKids": GoodForKids,
        "WheelchairAccessible": WheelchairAccessible,
        "AlcoholId": AlcoholId,
        "BusinessParkingTypeId": BusinessParkingTypeId,
        "RestaurantsTypeId": RestaurantsTypeId,
        "GoodForMealTypeId": GoodForMealTypeId,
        "latitude": latitude,
        "longitude": longitude
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            console.log(Object.values(returnedData))
        var test = Object.entries(returnedData[0]['result'])
        var result = []


        Object.entries(returnedData[0]).forEach(([key, value]) => {result.push(value)});
        $("#output").text(`We're ${result[0]}% sure your restaurant would get a ${result[1]}-star rating on Yelp!`); 

         

        
    

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
