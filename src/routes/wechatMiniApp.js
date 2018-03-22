import  express from 'express';
import axios from 'axios';


import {appId, appSecret} from '../config';
import {User} from '../models/user'
import {generateTokenByOpenId, verifyToken} from '../util/authenticate';


const router = express.Router();

router.post('/verify-session', function(req, res, next) {
  const tokenOfUser = req.body.token;
  if(verifyToken(tokenOfUser)) {
    res.send({status: 'ok'});
  } else {
    res.status(404).send({status: 'not ok'})
  }
});

router.post('/get-session',  function(req, res, next) {
  const userCodeOfMiniApp = req.body.code;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${userCodeOfMiniApp}&grant_type=authorization_code`
  axios.get(url).then(response => {

    const {openid, session_key} = response.data;

    User.findOne({openId: openid}).then((user) => {
      if(user) {
        res.send({token: generateTokenByOpenId(user.openId)});
      } else {
        User.create({ openId: openid }).then((user) => {
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
