import  express from 'express';
import axios from 'axios';

import {appId, appSecret} from '../config';

const router = express.Router();

router.get('/get-session',  function(req, res, next) {
  const userCodeOfMiniApp = req.query.code;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${userCodeOfMiniApp}&grant_type=authorization_code`
  axios.get(url).then(response => {
    console.log(response.data);
    return reponse;
  }).catch(error => {
    return error;
  })
  res.send({status: '1'});
});



module.exports = router;
