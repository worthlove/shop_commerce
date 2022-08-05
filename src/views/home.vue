<template>
  <div>
    <el-button type="info" @click="exitFn">退出</el-button>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  data() {
    return {}
  },
  methods: {
    // 退出登录功能
    exitFn() {
      // 清空 sessionStorage 中的数据（token）
      window.sessionStorage.clear()
      // 重定向跳转到登录页
      this.$router.push('/login')
      this.$message.info('退出登录成功！')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
