
// <!--**
// *
// *----------Created by dyj on 2020/02/018----------
// * 　　　┏┓　　　┏┓
// * 　　┏┛┻━━━┛┻┓
// * 　　┃　　　　　　　┃
// * 　　┃　　　━　　　┃
// * 　　┃　┳┛　┗┳　┃
// * 　　┃　　　　　　　┃
// * 　　┃　　　┻　　　┃
// * 　　┃　　　　　　　┃
// * 　　┗━┓　　　┏━┛
// * 　　　　┃　　　┃神兽保佑
// * 　　　　┃　　　┃代码无BUG！
// * 　　　　┃　　　┗━━━┓
// * 　　　　┃　　　　　　　┣┓
// * 　　　　┃　　　　　　　┏┛
// * 　　　　┗┓┓┏━┳┓┏┛
// * 　　　　　┃┫┫　┃┫┫
// * 　　　　　┗┻┛　┗┻┛
// * ━━━━━━神兽出没━━━━━━
// *-->






/***
   拦截器
**/
import { Notification } from "element-ui"
export function startInterceptor(axios){
	const errMassage = {
		 title:'错误',
		 type:'error',
	}
	//请求拦截
	axios.interceptors.request.use(
	  config => {
	    return config;
	  },
	  error => {
	    return Promise.error(error);
	  }
	)
	
	axios.interceptors.response.use(
	 response=>{
		    switch(response.status){
					case 202:
					case 200:
						if(response.config.responseType === 'blob'){
							try {
								const data = response.data ? response.data : {}
								if(Object.prototype.toString.call(data) === "[object Blob]"){
									 return response
								}else{
                    if(data.code === 0){     //后台返回的code码，不同的状态
                      return ressponse
										}else if(data.code ===401){
                       window.router.replace({
												 path:'/login'
											 })
										}else{
											Notification({
												...errMassage,
												message: data.message
											})
										}
								}
							} catch (error) {
								  return response
							}
						}else{
							const data = response.data ? response.data : {}
							if(data.code === "0000"){
								return response
							}else if(data.code === 401){
								Notification({
									...errMassage,
									message: '登录过期，请重新登录'
								})
								window.router.replace({
									path:'/login'
								})
							}else if(data.code === 403){
								Notification({
									...errMassage,
									message: '没有权限'
								})
							}else if(data.code === 405){
								Notification({
									...errMassage,
									message: data.msg
								})  
							}else if(data.code === "0007"){
								Notification({
									...errMassage,
									message: data.msg
								})  
							}else if(data.code === "0008"){
								Notification({
									...errMassage,
									message: data.msg
								})  
							}else{
								Notification({
									...errMassage,
									message: data.msg
								})
							}
						}
						break
						default: 
						Notification({
							...errMassage,
							message: "服务器响应失败..."
						})
						break
				}
				return response
	 },
	 error=>{
		 if(axios.isCancel(error)){
			 return Promise.reject(new Error("request cancel"))
		 }
		 const response = error.response
		 if(response.status){
			 switch(response.status){
			   case 0:
				 case 401:
					Notification({
						...errMassage,
						message: '登录过期，请重新登录'
					})
				 window.router.replace({
					 path:'/login'
				 })
					break
					case 404:
				 window.router.push({
					 path:'/404',
					 query:{
						 code:response.status
					 }
				 })
					break
					case 404:
						Notification({
							...errMassage,
							message: '没有足够的权限'
						})
					break
					case 500:
						Notification({
							...errMassage,
							message: '服务器异常，code:'+response.status
						})
					window.router.push({
						path:'/500',
						query:{
							code:response.status
						}
					})
					break
					default:
						Notification({
							...errMassage,
							message: '服务器响应失败...'
						})
						break
			 }
		 }
		 return Promise.reject({ code: response.status })
	 }
	)
}