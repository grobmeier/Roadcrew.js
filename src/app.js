
$(document).ready( function() {
   var roadcrew = new Roadcrew();
   
   var submit = $('#myform').find('[name="submit"]');
   submit.click(function(event) {
      event.preventDefault();
      roadcrew.goto("#tablePage");
   });

});