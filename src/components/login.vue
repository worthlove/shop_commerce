<template>
  <div class="loginApp">
    <div class="loginBox">
      <!-- 头像区域 -->
      <div class="loginAvatar">
        <img alt="头像" src="../assets/logo.png">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="loginForm" label-width="0px">
        <!-- 用户名： -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码： -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 登录/重置 -->
        <el-form-item class="loginBtn">
          <el-button type="info" @click="resetFn">重置</el-button>
          <el-button type="primary" @click="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data() {
    return {
      // 这是登录表单的用户数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是登录表单的验证规则对象
      loginFormRules: {
        /* 验证用户名是否合法 */
        username: [
          { required: true, message: '请输入登录用户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        /* 验证密码是否合法 */
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮,重置登录表单数据
    resetFn() {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录
    loginFn() {
      // 获取登录表单的引用对象,进行登录表单的预验证
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.resetFn()
          this.$message.error('请正确填写用户登录信息')
        } else {
          /**
           * @param 请求类型：.post
           * @param 请求接口：login
           * @param 入参：this.loginForm
           * */
          // 将请求回来的 promise 使用async await执行异步请求,并将返回数据进行解构赋值
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log(res.meta.status)
          // 判断 res.meta.status 的状态值是否为200,是：登录成功！否：登录失败
          if (res.meta.status !== 200) {
            this.$message.error('登录失败！')
          } else {
            this.$message.success('登录成功！')
            /**
             * @param 身份验证令牌：token
             * */
            console.log(res.data.token)
            // 将从接口中获取的 token令牌 存储到 sessionStorage 中
            window.sessionStorage.setItem('token', res.data.token)
            // 通过编程式导航,跳转后台主页,路由地址: /home
            await this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginApp {
  background-color: #2B4B6B;
  height: 100%
}

.loginBox {
  width: 450px;
  height: 300px;
  background-color: #FFF;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .loginAvatar {
    height: 130px;
    width: 130px;
    border: 1px solid #EEE;
    border-radius: 50%;
    padding: 10px;
    box-shadow: #DDD;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #AAAAAA;
    }
  }
}

.loginForm {
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
}

.loginBtn {
  display: flex;
  justify-content: center;
}
</style>
