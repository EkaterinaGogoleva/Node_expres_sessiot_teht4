/* eslint-disable new-cap */
/*
http://localhost:3000/users/ ei ole tässä sovelluksessa käytössä
*/
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
