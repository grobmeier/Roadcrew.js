
$(document).ready( function() {
   var roadcrew = new Roadcrew();
   
   roadcrew.intercept('#tablePage', function(dispatch) {
      roadcrew.flip('#loadingPage');
      setTimeout(dispatch,1500);
   });
   
   var submit = $('#myform').find('[name="submit"]');
   submit.click(function(event) {
      event.preventDefault();
      roadcrew.goto("#tablePage");
   });

  roadcrew.intercept('#interceptingPage', function(dispatch) {
      console.log("Intercepting");
      dispatch();
  });

  roadcrew.intercept('#troublePage', function(dispatch) {
      throw new RoadcrewError("I made trouble");
  }, function(error) {
      $('#errorPage').find('.error').html(error.message);
      roadcrew.flip('#errorPage');
  });

});