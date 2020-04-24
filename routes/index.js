const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Geocoding with Javascript',
    description: 'Featuring Leafletjs and MapBox',
  });
});

module.exports = router;
