$(document).ready(function() {
  $('.gran').keydown(function(e) {
    if (e.which == 16) {
      $(this).attr('step', '10');
    }
    if (e.which == 17) {
      $(this).attr('step', '1000');
    }
  });
  $('.gran').keyup(function(e) {
    if (e.which == 16 || e.which == 17) {
      $(this).attr('step', '1');
    }
  });
});
