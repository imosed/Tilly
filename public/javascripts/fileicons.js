function getFileIcon(ext) {
  switch (ext) {
    case ('.jpg'):
      return '/images/icons/file-picture.png';
    case ('.jpeg'):
      return '/images/icons/file-picture.png';
    case ('.png'):
      return '/images/icons/file-picture.png';
    case ('.gif'):
      return '/images/icons/file-picture.png';
    case ('.psd'):
      return '/images/icons/file-picture.png';
    case ('.xcf'):
      return '/images/icons/file-picture.png';
    case ('.mp3'):
      return '/images/icons/file-music.png';
    case ('.wma'):
      return '/images/icons/file-music.png';
    case ('.wav'):
      return '/images/icons/file-music.png';
    case ('.flac'):
      return '/images/icons/file-music.png';
    case ('.oga'):
      return '/images/icons/file-music.png';
    case ('.webm'):
      return '/images/icons/file-video.png';
    case ('.mp4'):
      return '/images/icons/file-video.png';
    case ('.ogv'):
      return '/images/icons/file-video.png';
    case ('.txt'):
      return '/images/icons/file-text2.png';
    case ('.pdf'):
      return '/images/icons/file-text2.png';
    case ('.doc'):
      return '/images/icons/file-text2.png';
    case ('.docx'):
      return '/images/icons/file-text2.png';
    case ('.html'):
      return '/images/icons/file-text2.png';
    case ('.zip'):
      return '/images/icons/file-zip.png';
    case ('.rar'):
      return '/images/icons/file-zip.png';
    case ('.7z'):
      return '/images/icons/file-zip.png';
    case ('.gz'):
      return '/images/icons/file-zip.png';
    case undefined:
      return '/images/icons/folder.png';
    default:
      return '';
  }
  // TODO: Add more extensions
}
