const express = require('express');
var userRouter = express.Router();
const api = require("../api/user/index")

userRouter.get('/getUserList', function(req, res, next) {
  api.getUserList(req, res, next);
});
// 新增用户
userRouter.post('/addUserList', function(req, res, next) {
  api.addUser(req, res, next);
});
// 删除用户
userRouter.get('/deleUser', function(req, res, next) {
  api.deleUser(req, res, next);
});
// 修改用户
userRouter.get('/changeUserList', function(req, res, next) {
  api.changeUserList(req, res, next);
});


module.exports = userRouter;