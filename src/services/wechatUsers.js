const getSession = (req, res) => {
  const code = req.query.code;
  console.log(req);
  console.log(code);
  res.json({
    userId: 1
  });
  // const url = `${wxUrl}?appid=${config.APPID}&secret=${config.APPSECRET}&js_code=${code}&grant_type=authorization_code`;
  // http.get(url).then((response) => {
  //   const openid = response.data.openid;
  //   return Buyer.findOneAndUpdate({openId: openid}, {openId: openid}, {
  //     upsert: true,
  //     runValidators: false,
  //     new: true
  //   }).then(() => {
  //     logger.info(url, JSON.stringify(response.data));
  //     res.json(response.data);
  //   });
  // }).catch((error) => {
  //   res.status(500).json({error});
  // });
};


module.exports = {
  getSession
}
