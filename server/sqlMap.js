
// sql语句
var user = {
    getValue: 'SELECT * FROM stus LIMIT ?,?',
    addUser:   'INSERT INTO stus (id,name, age,sex,phone,address,createTime) VALUES  (0,?,?,?,?,?,?)',
    deleUser:  'DELETE FROM stus WHERE id=?',
    setValue: 'UPDATE stus SET  name =?,age=?,sex=?,phone=?,address=? WHERE id=?',
  }
  
  var login = {
      getValue: 'SELECT * FROM stus LIMIT ?,?',
      addUser:   'INSERT INTO stus (id,name, age,sex,phone,address,createTime) VALUES  (0,?,?,?,?,?,?)',
      deleUser:  'DELETE FROM stus WHERE id=?',
      setValue: 'UPDATE stus SET  name =?,age=?,sex=?,phone=?,address=? WHERE id=?',
  }
  
  var exports = {
	  user,
	  login,
  }
  module.exports= exports;