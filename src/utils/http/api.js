
import axios from 'axios'
import { isObject } from 'lodash'
import { startInterceptor } from './interceptor'
import Serialize from './serialize'
import Cookies from 'js-cookie'
import { API_ROOT } from '@config'
startInterceptor(axios)

//get
export async function get (path, params, config = {}, suppressRedBox) {
  let serParams = ''
  let finalPath = path
  if (isObject(params)) {
    serParams = Serialize(params)
    if (path.indexOf('?') > -1) {
      finalPath = path + '&' + serParams
    } else {
      finalPath = path + '?' + serParams
    }
  }
return bodyOf(request('get', finalPath, null, config, suppressRedBox))
}

export async function post(path, body, config = {}, suppressRedBox){
  return bodyOf(request('post',path,body,config,suppressRedBox))
}

export async function put(){
  return bodyOf(request('post',path,body,config,suppressRedBox))
}

export async function del(){
  return bodyOf(request('post',path,body,config,suppressRedBox))
}

export async function upload(){
  return bodyOf(request('post',path,body,config,suppressRedBox))
}


/**
 * 相对路径补上全路径，实际axios已经提供该方法
 */
export function url (path) {
  if (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) {
    return path
  } else {
    return path.startsWith('/')
      ? API_ROOT + path
      : API_ROOT + '/' + path
  }
}

/**
 * 根据API获取请求
 * @param {String} method  
 * @param {String} path 
 * @param {Object} body 
 * @param config {Object}  
 * @param {Boolean} suppressRedBox 如果为真，则对失败的请求不显示警告
 */
export async function request(method,path,body,config,suppressRedBox){
  try{
    //发出请求
    const response = await sendRequest(method,path,body,config,suppressRedBox)
    //接受响应
    return handleResponse(path,response,config)

  }catch(error){
    const errorStr = error.toString()
    const response = error && error.response
    if (errorStr.indexOf('timeout') > -1) {
      setTimeout(() => { // 网络
        request(method, path, body, config, suppressRedBox)
      }, 30000)
    }
    if (errorStr.indexOf('cancelled') > -1) {
      return Promise.reject('request cancelled')
    }
    // typeof (error.errorCode)!=='undefined' 服务器返回的业务上逻辑的错误
    if (!suppressRedBox && response && typeof (response.errorCode) === 'undefined') {
      logError(error, path, method)
    }
    if (response) {
      throw response
    } else {
      throw error
    }
  }
}

/***
 * 发出http请求
 */
 async function sendRequest(method,path,body,config){
  try {
    const fullpath = url(path)
    let options = null
    const token = Cookies.get('token') || null
    if(body && body.formType === 'file' && body.formData){ //让它看成是上传（鸭子类型）
       const headers = getRequestHeaders(1,token)
       config.timeout = 0 //上传不需要超时
       options={method,headers,data:body.formData}//方式，请求头，数据
    }else{
      const headers = getRequestHeaders(0, token)
      options = isObject(body)
        ? { method, headers, data: Serialize(body) } 
        : { method, headers }
    }
    const timeout = Number.isInteger(config.timeout) ? config.timeout : 30000
    delete config.timeout
    return axios({
      url: fullpath,
      ...config,
      timeout,
      ...options
    })
  } catch (error) {
    throw new Error(error)
  }
}

/***
 * 接收http响应
 */
 async function handleResponse(path, response, config = {}){
  try {
    const status = response.status
    const localToken = Cookies.get('token') || null
    const token = response.headers && response.headers['x-auth-token']
    try {
      if (token !== localToken) {
        Cookies.set('token', token, { expires: 30, path: '/' })
      }
    } catch (e) {
    }

    if (config.responseType === 'blob') {
      let responseBody = await response.data
      return {
        status: response.status,
        headers: response.headers,
        body: responseBody
      }
    } else {
      const responseBody = await response.data
      return {
        status: response.status,
        headers: response.headers,
        body: responseBody || null
      }
    }

  } catch (error) {
    throw e
  }
}

async function bodyOf (requestPromise) {
  try {
    const response = await requestPromise
    console.log(requestPromise,response)
    return response.body
  } catch (e) {
    throw e
  }
}


// 设置请求头部
function getRequestHeaders (type, token) {
  let headers = {}
  switch (type) {
    case 0:
      headers = { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
      break
    case 1:
      headers = { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' }
      break
    default:
      headers = { 'Accept': 'application/json' }
      break
  }
  // if (token) {
  //   return {
  //     ...headers, 'X-auth-token': token
  //   }
  // }
  return headers
}

//错误日志
function logError (error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`)
  } else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`)
  }
}