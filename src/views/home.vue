<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <!-- 头像 -->
      <div>
        <img alt="头像" src="../assets/logo.png" />
      </div>
      <!-- 标题 -->
      <div>
        <span>电商后台管理系统</span>
      </div>
      <!-- 退出按钮 -->
      <div>
        <el-button type="info" @click="exitFn">退出</el-button>
      </div>
    </el-header>
    <!-- 主体区域  -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggleBtn" @click="toggleBtn">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          :router="true"
          :unique-opened="true"
          active-text-color="#409eff"
          background-color="#545c64"
          text-color="#fff"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
              @click="saveNavStatusFn('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠侧边栏
      isCollapse: false,
      // 被激活的router链接地址
      activePath: '',
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.getMenuList()
    // 获取sessionStorage中activePath的属性值,赋值给this.activePath
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出登录功能
    exitFn() {
      // 清空 sessionStorage 中的数据（token）
      window.sessionStorage.clear()
      // 重定向跳转到登录页
      this.$router.push('/login')
      this.$message.info('退出登录成功！')
    },
    // 获取左侧菜单列表
    /* 由于反参是promise,所以使用async/await 进行简化 */
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        // 将获取的数据赋值给menuList
        this.menuList = res.data
      }
    },
    // 点击按钮,实现导航菜单的展开与折叠
    toggleBtn() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavStatusFn(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 55px;
  font-size: 30px;
  font-weight: bold;

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    > img {
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: #ddd;
    }

    > span {
      // 渐变色字体
      background-image: linear-gradient(to bottom right, #2de2ff, #8b67fb);
      -webkit-background-clip: text;
      color: transparent;
      letter-spacing: 0.4em;
    }
  }

  > span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #333744;

  .toggleBtn {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  width: 100%;
  height: 100%;
  //background-color: #EAEDF1;
  background-image: url('../assets/16.jpg');
  background-size: 100% 100%;
}

.el-card__body,
.el-main {
  padding: 0;
}

.iconfont {
  margin-right: 10px;
  font-size: 20px;
}
</style>
