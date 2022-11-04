<template>
  <div style="width: 100%; height: 92%; padding-top: 20px">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border sprite>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scoped">
            <el-row
              v-for="(itemOne, iOne) in scoped.row.children"
              :key="itemOne.id"
              :class="['dbBottom', iOne === 0 ? 'dbTop' : '', 'vCenter']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scoped.row, itemOne.id)"
                >
                  {{ itemOne.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(itemTwo, iTwo) in itemOne.children"
                  :key="itemTwo.id"
                  :class="[iTwo === 0 ? '' : 'dbTop', 'vCenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRightById(scoped.row, itemTwo.id)"
                      >>{{ itemTwo.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="itemThree in itemTwo.children"
                      :key="itemThree.id"
                      closable
                      type="warning"
                      @close="removeRightById(scoped.row, itemThree.id)"
                    >
                      {{ itemThree.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scoped">
            <el-button icon="el-icon-edit" size="mini" type="primary"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" size="mini" type="danger"
              >删除</el-button
            >
            <el-button
              icon="el-icon-setting"
              size="mini"
              type="warning"
              @click="showSettingsDialog(scoped.row)"
              >权限分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分配权限的对话框-->
    <el-dialog
      :visible.sync="rightDialog"
      title="分配权限"
      width="50%"
      @close="rightDialogClose"
    >
      <!-- 树型控件 -->
      <el-tree
        ref="treeRef"
        :data="rightsList"
        :default-checked-keys="defKey"
        :props="TreeProps"
        default-expand-all
        node-key="id"
        show-checkbox
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialog = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'roles',
  data() {
    return {
      // 所有角色列表的数据
      rolesList: [],
      // 控制分配权限的对话框的显示与隐藏
      rightDialog: false,
      // 所有权限的数据
      rightsList: [],
      // 树型控件的属性绑定对象
      TreeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选择的节点Id值
      defKey: [],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取角色所有的信息列表
    async getRolesList() {
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status !== 200) {
        this.$message.error('获取角色信息列表数据失败！')
      } else {
        this.rolesList = res.data
        this.$message.success('获取角色信息列表数据成功！')
      }
    },
    // 根据对应的id删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框提示用户是否删除对应权限
      const comFirmResult = await this.$confirm(
        '此操作将永久删除该用户的权限,是否继续',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (comFirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      } else {
        const { data: res } = await this.$http.delete(
          `roles/${role.id}/rights/${rightId}`
        )
        if (res.meta.status !== 200) {
          this.$message.error('权限删除失败!')
        } else {
          this.$message.success('权限删除成功！')
        }
        role.children = res.data
      }
    },
    // 展示分配权限的对话框
    async showSettingsDialog(role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        this.$message.error('获取权限数据失败！')
      } else {
        // 将获取的所有权限数据保存再 rightsList
        this.rightsList = res.data
        console.log(this.rightsList)
        this.$message.success('获取权限数据成功！')
        // 递归获取三级节点的ID
        this.getLeafKeys(role, this.defKey)
        this.rightDialog = true
      }
    },
    // 通过递归的形式,获取角色的所有三级权限的id，并保存到defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前的node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach((item) => {
          this.getLeafKeys(item, arr)
        })
      }
    },
    // 监听分配权限的对话框关闭事件
    rightDialogClose() {
      this.defKey = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        this.$message.error('分配角色权限失败')
      } else {
        this.$message.success('分配角色权限成功！')
        await this.getRolesList()
        this.rightDialog = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
.el-tag {
  margin: 7px;
}

.dbBottom {
  border-bottom: 1px solid #eee;
}

.dbTop {
  border-top: 1px solid #eee;
}

.vCenter {
  display: flex;
  align-items: center;
}
</style>
