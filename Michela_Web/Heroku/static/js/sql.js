$(document).ready(function() {
  
  console.log("Page Loaded");
  getCities();
  getStates();
  $("#showSQL").hide();
  $("#filter").click(function() {
      // alert("button clicked!");
      showDiv();
      getSQL();

  });
  
});
/*Show the SQL on button click*/
function showDiv() {
  document.getElementById('showSQL').style.display = "block";
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
  document.getElementById("main").style.marginLeft = "350px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
var expanded = false;



function getCities() {
  $.ajax({
    type: "GET",
    url: "/getcities",
    contentType: 'application/json;charset=UTF-8',
    success: function(returnedData) {
        // print it
        console.log(returnedData);
        returnedData.cities.forEach(function(city){
          let html = `<option value='"${city}"'>${city}</option>`;
          $("#city").append(html);
        });
        $("#city").select2();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
    }
  }) 
}

function getStates() {
  $.ajax({
    type: "GET",
    url: "/getstates",
    contentType: 'application/json;charset=UTF-8',
    success: function(returnedData) {
        // print it
        console.log(returnedData);
        returnedData.states.forEach(function(state){
          let html = `<option value='"${state}"'>${state}</option>`;
          $("#state").append(html);
        });
        $("#state").select2();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus);
        alert("Error: " + errorThrown);
    }
  }) 
}

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
        makeGraph(returnedData);

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

function makeGraph(inp_data) {
  
  var trace1 = {
      x: inp_data.filter(x => x.name).map(x => x.name),
      y: inp_data.filter(x => x.name).map(x => x.stars),

      mode: 'markers',
      type: 'bubble',
      marker: {
          "symbol": 'star',
          "color": "#E9C46A",
          "size": (inp_data.filter(x => x.city).map(x => x.stars*5)),
        
      },
      
  };
  var data = [trace1];
  var layout = {
    title: "Average Restaurant Ratings",
    autosize: false,
    width: 1000,
    height: 500,
    margin: {
      l: 50,
      r: 0,
      b: 100,
      t: 100,
      pad: 4
    },
    font: {
      "family":  'barrio',
      "size": 20,
      "color": '#F4A261',
    },
      xaxis: {
        
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
      },
      yaxis: { "title": "AVG Ratings" },
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
  };
  
  Plotly.newPlot('bubble', data, layout);
}
