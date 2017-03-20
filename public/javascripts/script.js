var propertiesFilename;

function preciseRound(n) {
  var f = 0;
  if (n < 10) f = 1000;
  else if (n < 100) f = 100;
  else f = 10;
  n *= f;
  n = Math.round(n);
  n /= f;
  return n.toString();
}

function existsIn(val, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (val == arr[i])
      return true;
  }
  return false;
}

function leadingZero(n) {
  n += '';
  if (n.length == 1) return '0' + n;
  else return n;
}

function getFileName(ele) {
  var targetDirectory = '';
  var targetElement = $(ele);
  if ($(targetElement).hasClass('filename')) targetDirectory = $(targetElement).text();
  else if ($(targetElement).find('.filename').length) targetDirectory = $(targetElement).find('.filename').text();
  else targetDirectory = $(targetElement).parent().find('.filename').text();
  return targetDirectory;
}

function replacePreview(withEle, fileName, attrib) {
  attrib = (attrib || 'src');
  $('#fpprev').replaceWith(withEle);
  $('#fpprev').attr(attrib, ('/user_content/' + fileName.toString()));
}

var opts = {
  lines: 9,
  length: 0,
  width: 16,
  radius: 20,
  scale: 1,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute'
}

$(document).ready(function() {
  setTimeout(function() {
    $('#flashmessage').animate({
      'opacity': '0'
    }, 1500, () => {
      $('#flashmessage').css('display', 'none').css('opacity', '1');
    });
  }, 4000);

  $(document).on('click', '.fileobj', (e) => {
    var propertiesFilename = getFileName(e.target);
    $('#fileprop').css('display', 'block');
    $('.forfile').text(propertiesFilename);
    $('#cfn').val(propertiesFilename);
    var target = document.getElementById('load-ind');
    var spinner = new Spinner(opts).spin(target);
    $.ajax({
      url: '/filestats/' + encodeURIComponent($('#currdir').val()) + '/' + propertiesFilename,
      context: document.body
    }).done(function(data) {
      spinner.stop();
      $('#fpdownload').click(function() {
        window.location.href = '/servedownload/' + r.display_name.toString();
      });
      var r = data;
      var ot = (r.obj_type == 'f' ? 'File' : 'Directory')
      $('#ftype').text(ot);
      $('#fowner').text(r.owner.username);
      $('#fsize').text(preciseRound(r.size / 1024) + 'KB');
      $('#fext').text(r.extension);
      $('#fpath').text(r.path);
      $('#fdate').text(r.date_added);
      $('#fshared').text(r.shared);
      if (existsIn(r.extension, ['.jpg', '.jpeg', '.png', '.gif'])) {
        replacePreview('<img src="" id="fpprev" />', r.display_name);
      } else if (existsIn(r.extension, ['.mp3', '.wma', '.wav', '.flac', '.oga'])) {
        replacePreview('<audio src="" id="fpprev" controls>Your browser does not support the audio tag.</audio>', r.display_name);
      } else if (existsIn(r.extension, ['.webm', '.mp4', '.ogv'])) {
        replacePreview('<video src="" id="fpprev" controls>Your browser does not support the video tag.</video>', r.display_name);
      } else if (existsIn(r.extension, ['.pdf', '.html'])) {
        replacePreview('<iframe src="" id="fpprev"></iframe>', r.display_name);
      } else {
        $('#fpprev').text('Preview not available.');
      }
    })
  });

  $(document).on('click', '.dir', (e) => {
    var targetDirectory = getFileName(e.target);
    var currentSubDir = $('#currdir').val().split('/');
    currentSubDir.splice(0, 3);
    currentSubDir = currentSubDir.join('/');
    window.location = '/files/' + encodeURIComponent(currentSubDir + targetDirectory + '/');
  });

  $('#toparent').click(function() {
    var qPath = '';
    var currentPath = (window.location.href).split('/');
    var pathLength = currentPath.length;
    if (pathLength > 4) {
      currentPath = decodeURIComponent(currentPath[currentPath.length - 1]);
      currentPath = currentPath.split('/');
      currentPath.splice(-2, 2);
      if (currentPath.length == 0) qPath = encodeURIComponent(currentPath.join('/'));
      else qPath = encodeURIComponent(currentPath.join('/') + '/');
      window.location.href = '/files/' + qPath;
    }
  });

  $('.fpclose').click(function() {
    $($(this).parent().parent()).css('display', 'none');
    $('#fpprev').replaceWith('<div id="fpprev"> </div>');
  });

  $('#uplbtn').click(function() {
    $('#uplcont').css('display', 'block');
    $('#uplbox').val('');
  });

  $('#uplform').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
      success: function(response) {
        var r = JSON.parse(response);
        var iconimg = $('<img>').attr('src', getFileIcon(r.extension)).attr('width', '16').attr('height', '16');
        var fname = $('<span>').addClass('filename');
        $(fname).text(r.display_name);
        var fo = $('.fileobj').first().clone().css('display', 'block');
        $($(fo).children()[0]).text('');
        $($(fo).children()[0]).append($(iconimg));
        $($(fo).children()[0]).append($(fname));
        $($(fo).children()[1]).text(preciseRound(r.size / 1024) + 'KB');
        $($(fo).children()[2]).text(r.owner);
        $($(fo).children()[3]).text(moment(r.date_added).format('MM-DD-YYYY'));
        $($(fo).children()[4]).text(r.shared);
        $('.filelist').append($(fo));
      }
    });
    $('#uplcont').css('display', 'none');
    return false;
  });

  $('#commform').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
      success: function(response) {
        var r = JSON.parse(response);
        var co = $('.commarea').first().clone().css('display', 'block');
        $($(co).children()[0]).text(r.author);
        $($(co).children()[1]).text(r.comm_body);
        $('.commlist').append($(co));
      }
    });
    return false;
  });

  $('#newdirectory').click(function() {
    $('#newdir').css('display', 'block');
  });

  $('#dirform').submit(function() {
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
      success: function(response) {
        status(response);
      }
    })
    $('#newdir').css('display', 'none');
    return false;
  });

  $('#fpcomment').click(function() {
    $('#fileprop').css('display', 'none');
    $('#filecomm').css('display', 'block');
    $('#cfp').val($('#directory').val());
    $.ajax({
      url: '/getcomments/' + encodeURIComponent($('#directory').val()) + '/' + $('#cfn').val(),
      context: document.body
    }).done(function(data) {
      if (data.length > 0) {
        $('#nocomm').remove();
      }
      for (var i = 0; i < data.length; i++) {
        data = data[i]
        var nc = $('.commarea').first().clone().css('display', 'block');
        $($(nc).children()[0]).text(data.author.username);
        $($(nc).children()[1]).text(data.comm_body);
        $('.commlist').append(nc);
      }
    });
  });
});
