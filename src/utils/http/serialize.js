/**
 * Created by xinsw on 2016/10/10.
 * 自定义的序列化，按照后台需要的格式解析
 */

/**
 * The workhorse; converts an object to x-www-form-urlencoded serialization.
 * @param {Object} obj
 * @return {String}
 */
var param = function (obj) {
  var query = ''; var name; var value; var fullSubName; var subName; var subValue; var innerObj; var i

  for (name in obj) {
    value = obj[name]

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i]
        fullSubName = name + '[' + i + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += param(innerObj) + '&'
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName]
        fullSubName = name + '[' + subName + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += param(innerObj) + '&'
      }
    } else if (value !== undefined && value !== null) { query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&' }
  }
  return query.length ? query.substr(0, query.length - 1) : query
}

export default param
