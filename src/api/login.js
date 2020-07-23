import * as API from '../utils/http/api'
/*
* 
* @returns {Promise<*>}
*/
export async function Login (params) {
 try {
   return await API.post('/login', {
     ...params,
   })
 } catch (error) {
   return error
 }
}