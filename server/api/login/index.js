const sqlMap = require('../../sqlMap');
const codeMa = require('../../codeMa')
const MD5 = require('MD5')
const { pool } = require('../index.js')

const login = {
	getUserInfo(req, res, next) {
		
		const param =req.body
	  const id = param.id;
		const username =param.username
		const password = MD5(param.password)
	  pool.getConnection((err, connection) => {
			const sql = sqlMap.login.getValue;
			console.log("SELECT user.username FROM user WHERE username="+username+"") //报错
	    connection.query("SELECT username,password FROM user WHERE user.username='" + username + "'",(err, result) => {  //这里要用引号隔开，上面的会报错
						if(err){
							res.send({code:codeMa.code2,msg:err.sqlMessage});
						}else{
							console.log(password)
							if(result.length>0){
								const user = result[0]
								req.session.user = user
								if(result[0].password ===password){
                  res.send({
									code:codeMa.code1,
									data:result,
									msg:codeMa.msg1,
							  	})
								}else{
									res.send({
									code:codeMa.code8,
									msg:codeMa.msg8,
								  })
								}
							}else{
								res.send({
									code:codeMa.code7,
									msg:codeMa.msg7,
								});
							}
								
						}
						connection.release();
					})
	    })
	},

	createRegister(req, res, next){
      
	}
}

module.exports = login