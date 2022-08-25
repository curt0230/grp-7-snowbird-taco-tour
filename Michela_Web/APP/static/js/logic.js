/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
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
    let locations = {"North Pole": [90.00, -135.00], "South Pole": [-90.00, 45.00], "Mariana Trench":[11.3493, 142.1996],
    "Bermuda Triangle":[25.0000, -71.0000], "Dead Sea": [31.5590, 35.4732], "Grand Canyon":[36.0544, -112.1401],
    "Great Barrier Reef": [-18.2871, 147.6992], "Great Wall of China": [40.4319, 116.5704], "Eiffel Tower": [48.8584, 2.2945],
    "The Great Pyramid of Giza":[29.9792, 31.1342]}
        
        for (let key in locations) {
        var lat = locations[key][0]
        $('#select').append('<option value=' + locations[key] + '>' + key + '</option>');
        
        }
         
        

});



// call Flask API endpoint
function makePredictions() {
    var location = $("#select").val();
    const myArray = location.split(",");
    const lat = parseFloat(myArray[0]);
    const long = parseFloat(myArray[1]);
    console.log(lat)
    console.log(long)

    var BusinessAcceptsCreditCards = $("#BusinessAcceptsCreditCards").val();
    var GoodForKids = $("#GoodForKids").val();
    var WheelchairAccessible = $("#WheelchairAccessible").val();
    var AlcoholId = $("#AlcoholId").val();
    var BusinessParkingTypeId = $("#BusinessParkingTypeId").val();
    var RestaurantsTypeId = $("#RestaurantsTypeId").val();
    var GoodForMealTypeId = $("#GoodForMealTypeId").val();
    var latitude = lat;
    var longitude = long;
    
    // var latitude = $("#latitude").val();
    // var longitude = $("#longitude").val();

    // check if inputs are valid
    //
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
