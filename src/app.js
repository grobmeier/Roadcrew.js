
$(document).ready( function() {
   var roadcrew = new Roadcrew();
   
   roadcrew.intercept('#tablePage', function(dispatch) {
      alert("OK" + dispatch.target);
      dispatch();
   });
   
   var submit = $('#myform').find('[name="submit"]');
   submit.click(function(event) {
      event.preventDefault();
      roadcrew.goto("#tablePage");
   });

});