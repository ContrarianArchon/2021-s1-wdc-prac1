
var vue = new Vue({
  el: "#app",
  data: {
    rooms: []
  }
});

function display_results(data){
  vue.rooms = data;
};

$(document).ready(function(){
    $("#text-submit").click(function(){
      $.post("/search/text",
      {
        searchstring: document.getElementById("searchtext").value
      },
      function(data, status){
        display_results(data);
      });
    });
    $("#date-submit").click(function(){
        $.post("/search/date",
        {
          start_date: document.getElementById("start_date").value,
          end_date: document.getElementById("end_date").value
        },
        function(data, status){
          display_results(data);
        });
      });

  });
