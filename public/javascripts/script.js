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

function getFileIcon(ext) {
    switch (ext) {
        case ('.jpg'):
            return '/images/icons/file-picture.png';
        case ('.png'):
            return '/images/icons/file-picture.png';
        case ('.mp3'):
            return '/images/icons/file-music.png';
        case ('.wav'):
            return '/images/icons/file-music.png';
        case ('.pdf'):
            return '/images/icons/file-text2.png';
        case ('.doc'):
            return '/images/icons/file-text2.png';
        case undefined:
            return '/images/icons/folder.png';
    }
    // TODO: Add more extensions
}

function leadingZero(n) {
    n += '';
    if (n.length == 1) return '0' + n;
    else return n;
}

function getFileName(ele) {
    return $($($(ele).children()[0]).children()[1]).text();
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

    $('.fileobj').click(function() {
        var propertiesFilename = getFileName(this);
        $('#fileprop').css('display', 'block');
        $('#forfile').text(propertiesFilename);
        var target = document.getElementById('load-ind');
        var spinner = new Spinner(opts).spin(target);
        $.ajax({
            url: 'filestats/' + encodeURIComponent($('#currdir').val()) + '/' + propertiesFilename,
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
            $('#fpprev').attr('src', ('/user_content/' + r.display_name.toString()));
        })
    });

    $('.dir').click(function() {
        window.location = '/files/' + getFileName(this);
    });

    $('#toparent').click(function() {
        var currentPath = '';
        var pathLength = (window.location.href).split('/').length;
        if (pathLength > 4) {
            currentPath = decodeURIComponent(currentPath[currentPath.length - 1]);
            currentPath = currentPath.split('/');
            currentPath[currentPath.length - 1] = '';
            window.location.href = '/files/' + encodeURIComponent(currentPath.join('/'));
        }
    });

    $('.fpclose').click(function() {
        $('#fileprop').css('display', 'none');
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
                var fo = $('.fileobj').first().clone();
                $($(fo).children()[0]).text('');
                $($(fo).children()[0]).append($(iconimg));
                $($(fo).children()[0]).append($(fname));
                $($(fo).children()[1]).text(preciseRound(r.size / 1024) + 'KB');
                $($(fo).children()[2]).text(r.owner.username);
                $($(fo).children()[3]).text(moment(r.date_added).format('MM-DD-YYYY'));
                $($(fo).children()[4]).text(r.shared);
                $('.filelist').append($(fo));
            }
        });
        $('#uplcont').css('display', 'none');
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
});
