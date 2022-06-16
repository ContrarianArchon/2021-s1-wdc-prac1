$(document).ready(function(){
    $("#text-submit").click(function(){
      $.post("/search/text",
      {
        searchstring: document.getElementById("searchtext").value
      },
      function(data, status){
        alert(data);
      });
    });
    $("#date-submit").click(function(){
        $.post("/search/date",
        {
          start_date: document.getElementById("start_date").value,
          end_date: document.getElementById("end_date").value
        },
        function(data, status){
          alert(data);
        });
      });

  });
