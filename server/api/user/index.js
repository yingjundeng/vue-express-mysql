
const sqlMap = require('../../sqlMap');
const codeMa = require('../../codeMa')
const { pool } = require('../index.js')

const userInfo = {

	getUserList(req, res, next) {
		var param =req.query || req.params
	  var id = param.id;
	  var curpage =parseInt(param.curpage) 
	  var pageSize =parseInt(param.pageSize) 
	  var start = (curpage-1)*pageSize
	  var total;
	  pool.getConnection((err, connection) => {
	    var sql = sqlMap.user.getValue;
	    connection.query("SELECT count(id) FROM stus",(err, result) => {
				      	if(err){
				      		res.send({code:codeMa.code2,msg:err.sqlMessage});
				      	}else{
				      		  total = result[0]["count(id)"]
				      	}
				      })
	    connection.query(sql,[start,pageSize],(err, result) => {
	    	if(err){
	    		res.send({code:codeMa.code2,msg:err.sqlMessage});
	    	}else{
	    		res.send({
	    			code:codeMa.code1,
	    			data:result,
	    			total:total,
	    			curpage:curpage,
	    			pageSize:pageSize,
	    			msg:codeMa.msg1,
	    		});
	    	}
	        connection.release();
	    })
	  })
	},
	//新增用户
	/**
	 * @param name
	 * @param age
	 **@param sex
	 * @param phone
	 **@param address
	 * @param createTime
	 * @returns {Promise<void>}
	 */
	addUser(req, res, next) {
		const param =req.query || req.params
	  const name = param.name;
	  const age = param.age;
	  const sex = param.sex;
	  const phone = param.phone;
	  const address = param.address;
	  const createTime =param.createTime;
	  
	  var table =[name,age,sex,phone,address,createTime]
	  pool.getConnection((err, connection) => {
	    var sql = sqlMap.user.addUser;
	    connection.query(sql, table, (err, result) => {
	    	if(err){
	    		res.send({code:codeMa.code2,msg:err.sqlMessage});
	    	}else{
	    		res.send({code:codeMa.code1,msg:codeMa.msg1});
	    	}
	        connection.release();
	    })
	  })
	},
	//删除用户
	deleUser(req, res, next) {
		const param =req.query || req.params
	  const id = param.id;
	  pool.getConnection((err, connection) => {
	    var sql = sqlMap.user.deleUser;
	    connection.query(sql, id, (err, result) => {
	    	if(err){
	    		res.send({code:codeMa.code2,msg:err.sqlMessage});
	    	}else{
	    		res.send({code:codeMa.code1,msg:codeMa.msg1});
	    	}
	        connection.release();
	    })
	  })
	},
	//修改用户
	changeUserList(req, res, next) {
		const param =req.query || req.params
		const id = param.id;
	  const name = param.name;
	  const age = param.age;
	  const sex = param.sex;
	  const phone = param.phone;
	  const address = param.address;
	  var table =[name,age,sex,phone,address,id]
	  pool.getConnection((err, connection) => {
	    var sql = sqlMap.user.setValue;
	    connection.query(sql, table, (err, result) => {
	    	if(err){
	    		res.send({code:codeMa.code2,msg:err.sqlMessage});
	    	}else{
	    		res.send({code:codeMa.code1,msg:codeMa.msg1});
	    	}
	        connection.release();
	    })
	  })
	}
}

//用户
//const userInfo = require('./user/index')

module.exports = userInfo