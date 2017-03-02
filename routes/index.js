const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const passport = require('passport');
const User = require('../models/user');
const Group = require('../models/group');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Tilly: Home'
  });
});

router.get('/setup/:step*?', function(req, res, next) {
  let step = (req.params.step || '1');
  switch (step) {
    case ('1'):
      res.render('setup/first', {
        title: 'Tilly: Global Setup'
      });
      break;
    case ('2'):
      res.render('setup/second', {
        title: 'Tilly: Admin Setup'
      });
      break;
    default:
      res.send('This page does not exist!');
  }
});

router.post('/procsetup/:step*?', function(req, res, next) {
  let step = (req.params.step || '1');
  switch (step) {
    case ('1'):
      let adm_group_name = 'admin';
      let adm_group_number = '1';

      let def_group_name = 'default';
      let def_group_number = '2';

      let AdmGroup = new Group({
        name: adm_group_name,
        level: adm_group_number
      });

      let DefGroup = new Group({
        name: def_group_name,
        level: def_group_number
      });

      Group.createGroup(AdmGroup, function(admge) {
        if (admge) res.send(admge);
        Group.createGroup(DefGroup, function(defge) {
          if (defge) res.send(defge);
          fs.open(path.resolve('global.json'), 'w', (err, fd) => {
            if (err) res.send('Could not create global config file!');
            fs.write(fd, '{"openreg": "' + req.body.openreg + '", "maxspace": "' + req.body.maxspace + '"}', (e) => {
              if (e) res.send('Could not write to global config file!');
              res.redirect('/setup/2');
            });
          });
        });
      });
      break;
    case ('2'):
      Group.getObjByName('admin', (err, grp) => {
        if (err) res.send(err);
        let username = 'admin';
        let password = req.body.admpass;
        let email = req.body.admemail;
        let group = grp._id;
        let storage_limit = req.body.admstlim;
        let join_date = new Date();

        let Admin = new User({
          username: username,
          password: password,
          email: email,
          group: group,
          storage_limit: storage_limit,
          join_date: join_date
        });

        fs.mkdir(path.resolve('storage/', (Admin._id).toString()), (error) => {
          if (error) res.send(error);
          User.registerUser(Admin, function(err, user) {
            if (err) res.send(err);
            res.redirect('/');
          });
        });
      });
      break;
  }
});

module.exports = router;
