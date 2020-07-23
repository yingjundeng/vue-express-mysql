const express = require('express');
var loginRouter = express.Router();
const api = require("../api/login/index")
//登录
loginRouter.post('/login',function(req,res,next){
  api.getUserInfo(req, res, next);   
})

module.exports = loginRouter;