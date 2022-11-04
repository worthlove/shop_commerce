<template>
  <div style="width: 100%; height: 92%; padding-top: 20px">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索框 -->
          <el-input
            v-model="queryInfo.query"
            clearable
            placeholder="请输入搜索内容"
            @clear="getUserListFn"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryFn"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addShowDialog = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChangeEvent(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              :enterable="false"
              content="修改"
              effect="dark"
              placement="top"
            >
              <el-button
                icon="el-icon-edit"
                size="mini"
                type="primary"
                @click="editFn(scope.row.id)"
                >修改</el-button
              >
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              :enterable="false"
              content="删除"
              effect="dark"
              placement="top"
            >
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="deleteFn(scope.row.id)"
                >删除</el-button
              >
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip
              :enterable="false"
              content="分配角色"
              effect="dark"
              placement="top"
            >
              <el-button icon="el-icon-setting" size="mini" type="warning"
                >分配角色</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页展示 -->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="addShowDialog"
      title="添加用户"
      width="50%"
      @close="addHiddenDialog"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="ruleFormRef"
        :model="addFromData"
        :rules="addFromRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFromData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFromData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFromData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addFromData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户的弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="editShowDialog"
      title="编辑用户"
      width="50%"
      @close="editHiddenDialog"
    >
      <!-- 内容主体区域 -->
      <el-form
        ref="editFormRef"
        :model="editFromData"
        :rules="editFromRules"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editFromData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFromData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editFromData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validateEMail, validatePhone } from '@/utils/checkReg.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  data() {
    return {
      // 获取用户信息列表的入参
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前页面显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制添加用户的弹框显示/阴藏
      addShowDialog: false,
      // 添加用户的表单数据
      addFromData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, validator: validateEMail, trigger: 'blur' }],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      },
      // 控制编辑用户的弹框的显示与隐藏
      editShowDialog: false,
      // 用户查询的表单数据
      editFromData: {},
      editFromRules: {
        email: [{ required: true, validator: validateEMail, trigger: 'blur' }],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserListFn()
  },
  methods: {
    // 点击搜索按钮
    queryFn() {
      this.getUserListFn()
    },
    // 获取用户信息列表
    async getUserListFn() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.userList = res.data.users
        this.total = res.data.total
        this.$message.success(res.meta.msg)
      }
    },
    // 监听pageSize改变的事件
    handleSizeChangeFn(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserListFn()
    },
    // 监听Current改变的事件
    handleCurrentChangeFn(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserListFn()
    },
    // 监听Switch开关状态的改变
    async userStateChangeEvent(userInfo) {
      console.log(userInfo)
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.state = !userInfo.state
        this.$message.error(res.meta.msg)
      } else {
        this.$message.success(res.meta.msg)
      }
    },
    // 监听添加用户对话框的关闭事件.
    addHiddenDialog() {
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击确认按钮,添加用户
    confirmFn() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('添加用户的表单校验失败!')
        } else {
          const { data: res } = await this.$http.post('users', this.addFromData)
          if (res.meta.status !== 201) {
            this.$message.error(res.meta.msg)
          } else {
            this.$message.success(res.meta.msg)
            // 隐藏添加用户的弹框
            this.addShowDialog = false
            // 重新获取用户列表
            this.getUserListFn()
          }
        }
      })
    },
    // 展示编辑用户的对话框
    async editFn(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        this.$message.error('res.meta.msg')
      } else {
        this.editFromData = res.data
      }
      this.editShowDialog = true
    },
    editHiddenDialog() {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑用户信息并提交
    editConfirmFn() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) {
          this.$message.error('编辑用户的表单校验失败!')
        } else {
          // 发起编辑用户信息列表的数据请求
          const { data: res } = await this.$http.put(
            'users/' + this.editFromData.id,
            {
              email: this.editFromData.email,
              mobile: this.editFromData.mobile
            }
          )
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
          } else {
            this.editShowDialog = false
            await this.getUserListFn()
            this.$message.success(res.meta.msg)
          }
        }
      })
    },
    // 删除用户信息
    async deleteFn(id) {
      // 弹框提示用户是否删除数据
      this.$confirm('此操作将永久删除该用户数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        await this.getUserListFn()
        this.$message.success(res.meta.msg)
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>
