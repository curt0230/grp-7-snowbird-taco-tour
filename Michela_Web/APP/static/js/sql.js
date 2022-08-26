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
      getSQL();
      // renderTable();
  });
});


// call Flask API endpoint
function getSQL() {
  var city = $("#city").val();
  var state = $("#state").val();
  var DietaryRestrictionsType = $("#DietaryRestrictionsType").val();
  var GoodForMealType = $("#GoodForMealType").val();
  var is_mexican_restaurant = $("#is_mexican_restaurant").val();
  var RestaurantsType = $("#RestaurantsType").val();


  // check if inputs are valid

  // create the payload
  var payload = {
      "city": city,
      "state": state,
      "DietaryRestrictionsType": DietaryRestrictionsType,
      "GoodForMealType": GoodForMealType,
      "is_mexican_restaurant": is_mexican_restaurant,
      "RestaurantsType": RestaurantsType

  }

  // Perform a POST request to the query URL
  $.ajax({
    type: "POST",
    url: "/getSQL",
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify({ "data": payload }),
    success: function(returnedData) {
        // print it
        console.log(returnedData);
        renderTable(returnedData);

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
    }
});

}


function renderTable(inp_data) {
  // init html string
  let html = "";

  // destroy datatable
  $('#sql_table').DataTable().clear().destroy();
 
  // loop through all rows
  inp_data.forEach(function(row) {
      html += "<tr>";

      // loop through each cell (order matters)
      html += `<td>${row.name}</td>`;
      html += `<td>${row.address}</td>`;
      html += `<td>${row.city}</td>`;
      html += `<td>${row.state}</td>`;
      html += `<td>${row.postal_code}</td>`;
      html += `<td>${row.review_count}</td>`;
      html += `<td>${row.stars}</td>`;
      // close the row
      html += "</tr>";
  });

  // shove the html in our elements
  console.log(html);
  $("#sql_table tbody").html("");
  $("#sql_table tbody").append(html);

  // remake data table
  $('#sql_table').DataTable();
}



