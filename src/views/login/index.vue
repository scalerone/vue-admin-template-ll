<template>
	<div class="login">
		<vue-particles
			color="#dedede"
			:particle-opacity="0.7"
			:particles-number="80"
			shape-type="circle"
			:particle-size="4"
			lines-color="#dedede"
			:lines-width="1"
			:line-linked="true"
			:line-opacity="0.4"
			:lines-distance="150"
			:move-speed="3"
			:hover-effect="true"
			hover-mode="grab"
			:click-effect="true"
			click-mode="push"
		>
		</vue-particles>
		<div class="login-form-box">
			<div class="img-box">
				<img src="../../assets/pageBg/login-yun.png" width="680" />
			</div>
			<div class="form-data-box">
				<div class="form-header">
					<img src="../../assets/pageBg/login-logo.png" alt="" />
					<p>数据管理中心</p>
				</div>
				<div class="form-data">
					<el-form ref="loginForm" :model="loginForm" :rules="loginRules">
						<div class="login-user">
							<el-form-item prop="username">
								<el-input
									v-model.trim="loginForm.username"
									autocomplete="off"
									placeholder="请输入账号"
									prefix-icon="el-icon-user"
									clearable
									@input="initErrMsg"
									@keydown.enter.native="loginYz('loginForm')"
								>
								</el-input>
							</el-form-item>
						</div>

						<div class="login-pwd">
							<el-form-item prop="password">
								<el-input
									v-model.trim="loginForm.password"
									autocomplete="off"
									placeholder="请输入密码"
									prefix-icon="el-icon-lock"
									show-password
									clearable
									@input="initErrMsg"
									@keydown.enter.native="loginYz('loginForm')"
								>
								</el-input>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<div class="form-footer">
					<el-button
						class="login-btn"
						type="primary"
						:loading="loading"
						@click="loginYz('loginForm')"
						>登&nbsp;录</el-button
					>
					<div class="error-tip login-tip">
						<p v-show="hasError" class="tip-desc">
							<i class="el-icon-warning"></i>
							{{ errMsg }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="login-footer-box">
			<p class="footer-desc">xx技术有限公司</p>
		</div>
	</div>
</template>

<script>
import { encodePwd } from '@/utils/util.js';

export default {
	data() {
		return {
			loginForm: {
				username: '',
				password: ''
			},
			loginRules: {
				username: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					} /*, {
            min: 6, max: 20, message: '字符长度必须为6-20位', trigger: 'blur',
          }, {
            pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/, message: '账号格式不正确', trigger: 'blur',
          }*/
				],

				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					} /*, {
            min: 6, max: 20, message: '字符长度必须为6-20位', trigger: 'blur',
          }, {
            pattern: /^[0-9a-zA-Z]+$/, message: '密码格式不正确', trigger: 'blur',
          }*/
				]
			},
			hasError: false,
			errMsg: '',
			loading: false
		};
	},

	methods: {
		loginYz(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					this._login();
				} else {
					return;
				}
			});
		},
		async _login() {
			let postData = {
				username: this.loginForm.username,
				password: this.loginForm.password
			};
			let res = await this.$store.dispatch('user/_login', postData);
			if (res) {
				this.$router.replace(this.$route.query.redirect ? this.$route.query.redirect : '/');
			}
		},
		initErrMsg() {
			this.hasError = false;
			this.errMsg = '';
		}
	}
};
</script>
<style scoped lang="scss">
.login {
	height: 100%;
	width: 100%;
	background: url('../../assets/pageBg/loginBg.png') no-repeat center center;
	background-size: 100% 100%;
	overflow: hidden;
	.login-form-box {
		width: 1050px;
		height: 564px;
		position: absolute;
		top: 45%;
		right: 12%;
		margin-top: -287px;
		display: flex;
		justify-content: center;
		align-items: center;
		.form-data-box,
		.forget-pwd-box {
			width: 400px;
			height: 396px;
			box-shadow: 0px 0px 6px 0px rgba(150, 150, 150, 0.4);
			border-radius: 4px;
			background-color: #fff;
		}

		.form-header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 48px;

			& > img {
				width: 80px;
				display: block;
				padding-bottom: 24px;
			}

			& > p {
				color: #7b3689;
				font-size: 16px;
				font-weight: 400;
			}
		}

		.form-data {
			width: 280px;
			margin: 0 auto;

			.login-user {
				margin-top: 27px;
			}

			.login-pwd {
				margin-top: 23px;
			}
		}

		.form-footer {
			margin-top: 36px;

			.login-btn {
				width: 280px;
				height: 40px;
				font-size: 16px;
				margin-left: 48px;
			}

			.el-button--primary:active {
				width: 280px;
				height: 40px;
				font-size: 16px;
				background-color: #0f91f7;
			}

			.login-tip {
				display: flex;
				position: relative;

				a.forget {
					display: inline-block;
					position: absolute;
					right: 48px;
					top: 0;
					color: #969696;
					cursor: pointer;
				}

				a.forget:hover {
					color: #0f91f7;
				}
			}

			.error-tip {
				font-size: 12px;
				margin-top: 12px;
				color: red;
				line-height: 20px;

				.tip-desc {
					margin-left: 48px;
				}
			}
		}
	}

	.login-footer-box {
		width: 100%;
		text-align: center;
		position: fixed;
		height: 157px;
		bottom: 0;
		background: url('../../assets/pageBg/login-footer.png') no-repeat center center;
		background-size: 100% 100%;
		.footer-desc {
			font-size: 12px;
			color: #ffffff;
			margin-bottom: 10px;
		}
	}
}
</style>
