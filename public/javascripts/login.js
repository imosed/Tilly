$(document).ready(function(){
  $('.authbox').bind('keypress', function(e) {
    if ((e.keyCode || e.which) == 13) {
      $('#dologin').submit();
    }
  });
});
