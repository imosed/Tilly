$(document).ready(function() {
  $('.authbox').bind('keypress', (e) => {
    if ((e.keyCode || e.which) == 13) {
      $('#dologin').submit();
    }
  });
});
