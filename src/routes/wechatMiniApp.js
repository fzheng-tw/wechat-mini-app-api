const express = require('express');
const router = express.Router();

const { getSession } = require('../services/wechatUsers');


router.get('/get-session',  function(req, res, next) {
  res.send({status: '1'});
});

module.exports = router;
