const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Tilly: Home'
  });
});

router.get('/setup/:step*?', function(req, res, next) {
  var step = (req.params.step || '1');
  switch (step) {
    case ('1'):
      res.render('setup/first', {
        title: 'Tilly: Admin Setup'
      });
      break;
    case ('2'):
      res.render('setup/second', {
        title: 'Tilly: Global Setup'
      });
      break;
    default:
      res.send('This page does not exist!');
  }
});

module.exports = router;
