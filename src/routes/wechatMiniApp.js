import  express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import {appId, appSecret} from '../config';
import {User} from '../models/user'



const router = express.Router();

const generateTokenByOpenId = (openId) => {
  return jwt.sign({openId: openId}, 'secret', { expiresIn: '30 days'});
}

router.post('/get-session',  function(req, res, next) {
  const userCodeOfMiniApp = req.body.code;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${userCodeOfMiniApp}&grant_type=authorization_code`
  axios.get(url).then(response => {

    const {openid, session_key} = response.data;

    const tmpId= 'oWxc65JUTJvv_hQeyer8jjXtDdLQ';

    User.findOne({openId: tmpId}).then((user) => {
      if(user) {
        res.send({token: generateTokenByOpenId(user.openId)});
      } else {
        User.create({ openId: tmpId }).then((user) => {
          res.send({token: generateTokenByOpenId(user.openId)});
        }).catch((error) => {
          console.log('error', error);
          res.status(500).send('Something broke!')
        });
      }
    }).catch((error) => {
      console.log('error', error);
      res.status(500).send('Something broke!')
    });

  }).catch(error => {
    console.log('error', error);
    res.status(500).send('Something broke!')
  })

});


module.exports = router;
