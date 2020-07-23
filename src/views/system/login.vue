<style lang="less" scoped>
	.login-wrap{
		height: 100%;
		background-color: rgba(38, 40, 41, 0.5);
		.ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: rgb(255, 255, 255,0.9);
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        text-align: center;
        font-size:12px;
        line-height:30px;
        color:rgb(255,255,255,0.5);
    }

    }
    
</style>

<template>
<div style="height:100%">
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">梦回远古后台管理系统</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" placeholder="用户名" @keyup.enter.native="Login()">
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="Login()">
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="Login()">登录</el-button>
				</div>
				<p class="login-tips">Tips : 梦回远古版权所有</p>
			</el-form>
		</div>
	</div>
	</div>
</template>

<script>
	import md5 from "MD5"
	import { API_ROOT } from '@config'
	import { Login } from '@api/login'
	import { SERVER_SUCCESS_CODE } from '@config'
  import debounce from 'lodash/debounce'
	export default {
		data() {
			return {
				API_ROOT,
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				pager:{
						curpage:1,
						pageSize:10
				}
			}
		},
		created() {
		},
		methods: {
			async Login(){
				this.ruleForm.password = md5(this.ruleForm.password)
				const resData = await Login(this.ruleForm)
				if(resData.code === SERVER_SUCCESS_CODE){
            this.$router.push('/about')
				}
			}

		}
	}
</script>
