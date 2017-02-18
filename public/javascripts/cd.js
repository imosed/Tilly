var curr_dir = '/';

function stringFromIndex(string, ind) {
  var aos = [];
  for (var i = 0; i < string.length; i++) {
    aos[i] = string[i];
  }
  aos.splice(0, ind);
  return aos.join('');
}

function fetchListings(fordir) {
  if(fordir == '/') fordir = '/-.';
  $('.fileobj').remove();
  $.ajax({
    url: '/listdir' + fordir,
    context: document.body
  }).done(function(data){
    for (var i = 0; i < data.length; i++) {
      listfile(data[i]);
    }
  })
}

function moveDirectory(current_path, to_path) {
  if (current_path[current_path.length - 1] == '/' && to_path[0] == '/') current_path += stringFromIndex(to_path, 1);
  else current_path += to_path;
  return current_path;
}

function parentDirectory(current_path) {
  current_path = current_path.split('/');
  if (current_path.length > 2) current_path.splice(-1, 1);
  else current_path[1] = '';
  return current_path.join('/');
}

$(document).ready(function(){
  $('#toparent').click(function(){
    if (curr_dir != '/') curr_dir = parentDirectory(curr_dir);
    $('#currdir').val(curr_dir);
    fetchListings(curr_dir);
  });
  $('.dir').click(function(){
    curr_dir = moveDirectory(curr_dir, 'hello'); //TODO: change parameter
    $('#currdir').val(curr_dir);
    fetchListings(curr_dir);
  })
});
