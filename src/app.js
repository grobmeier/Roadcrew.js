
$(document).ready( function() {
   var roadcrew = new Roadcrew();
   
   roadcrew.intercept('#tablePage', function(dispatch) {
      roadcrew.flip('#loadingPage');
      console.log("Heading to: " + dispatch.target);
      setTimeout(dispatch,3000);
   });
   
   var submit = $('#myform').find('[name="submit"]');
   submit.click(function(event) {
      event.preventDefault();
      roadcrew.goto("#tablePage");
   });
});