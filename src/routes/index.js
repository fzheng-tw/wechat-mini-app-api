const express = require('express');
const router = express.Router();
const wechatMiniApp = require('./wechatMiniApp');

router.use('/wechat-mini-app', wechatMiniApp);



module.exports = router;
