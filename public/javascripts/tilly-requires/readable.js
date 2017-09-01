function convertUnits(v, u) {
  var sizes = ['KB', 'MB', 'GB', 'TB'];
  return v / Math.pow(1024, sizes.indexOf(u) + 1);
}

/* Function to determine units */
(function(exports) {
  exports.humanize = function(n) {
    var unit;
    n = parseInt(n);
    if (n > 10 * Math.pow(1024, 4)) unit = 'TB';
    else if (n > Math.pow(1024, 3)) unit = 'GB';
    else if (n > Math.pow(1024, 2)) unit = 'MB';
    else if (n > 1024) unit = 'KB';
    else return 'unknown';
    return Math.round(convertUnits(n, unit) * 100) / 100 + (unit);
  };
}(typeof exports === 'undefined' ? this.readable = {} : exports));
