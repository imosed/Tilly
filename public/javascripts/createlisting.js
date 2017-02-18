function listfile(jsoninfo) {
  var r = jsoninfo;
  var filelist = $('.list-group');
  var listing = $('<li></li>');
  $(listing).addClass('list-group-item');
  $(listing).addClass('fileobj');
  if(r['obj_type'] == 'd') $(listing).addClass('dir');
  for (var i = 0; i < 5; i++) {
    var d = $('<span></span>');
    if(i == 0) {
      $(d).addClass('col-md-4');
      $(d).text(r['display_name']);
    } else {
      $(d).addClass('col-md-2');
      if(i == 1) $(d).text((preciseRound(r['size'] / 1024) + 'KB'));
      if(i == 2) $(d).text(r['owner']['username']);
      if(i == 3){
        var upldate = new Date(r['date_added']);
        var month = leadingZero(upldate.getMonth() + 1);
        var day = leadingZero(upldate.getDate());
        var year = leadingZero(upldate.getFullYear());
        $(d).text(month + '-' + day + '-' + year);
      }
      if(i == 4) $(d).text('false');
    }
    $(listing).append($(d));
  }
  filelist.append(listing);
}
