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
    var locations = {"North Pole": [90.00, -135.00, "https://images.newscientist.com/wp-content/uploads/2016/04/gettyimages-sb10067261c-001.jpg?crop=4:3,smart&width=1200&height=900&upscale=true"],
    "South Pole": [-90.00, 45.00,"https://images.theconversation.com/files/344471/original/file-20200629-155334-1k3ni1c.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop"],
     "Mariana Trench":[11.3493, 142.1996,"https://oceanexplorer.noaa.gov/okeanos/explorations/ex1605/logs/may11/media/1605jellyfish-hires.jpg"],
    "Bermuda Triangle":[25.0000, -71.0000, "https://rccl-h.assetsadobe.com/is/image/content/dam/royal/special-mkgt/miscellaneous/bermuda-triangle-shipwreck-plane-scuba.jpg?$1440x600$"],
     "Dead Sea": [31.5590, 35.4732, "https://cdn.britannica.com/70/58670-050-82229E20/Columns-salt-waters-Dead-Sea-environment-life-forms.jpg"],
      "Grand Canyon":[36.0544, -112.1401, "https://media.cntraveler.com/photos/5c744bbbff54753046216f13/16:9/w_4000,h_2250,c_limit/Grand-Canyon-National-Park_GettyImages-152836923.jpg"],
    "Great Barrier Reef": [-18.2871, 147.6992, "https://gdb.voanews.com/49167D11-1D23-40E8-9159-5BCEBB8BE843_cx0_cy4_cw0_w1200_r1.jpg"],
     "Great Wall of China": [40.4319, 116.5704, "https://www.worldatlas.com/r/w1200/upload/be/cb/99/great-wall-of-china.jpg"],
      "Eiffel Tower": [48.8584, 2.2945, "https://www.hoteldesgrandshommes.com/uploads/images/monuments/xhc-a-eu-france-paris-eiffel-tower.jpg.pagespeed.ic.yhN88MFsAe.jpg"],
    "The Great Pyramid of Giza":[29.9792, 31.1342, "https://cdn.mos.cms.futurecdn.net/YMa7Wx2FyjQFUjEeqa72Rm-1200-80.jpg"],
     "Mount Everest": [27.9881, 86.9250, "https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg"]}
        
        for (var key in locations) {
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
    var locimg = myArray[2]
    console.log(lat)
    console.log(long)
    console.log(locimg)

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
        
        var result = [];
        Object.entries(returnedData[0]).forEach(([key, value]) => {result.push(value)});
        $("#output").text(`We're ${result[0]}% sure your restaurant would get a ${result[1]}-star rating on Yelp!`); 
        document.getElementById("output").style.backgroundImage = `url('${locimg}')`;
        document.getElementById("output").style.backgroundRepeat = "no-repeat";
        document.getElementById("output").style.backgroundSize = "cover";
        
         
        

        },
    
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

