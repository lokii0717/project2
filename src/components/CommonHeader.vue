<template>
  <div class="header">
    <!-- 左边内容 -->
    <div class="l-content">
      <!-- 按钮 -->
      <el-button size="small" @click="handleCollapse">
        <component class="icons" :is="'menu'"></component>
      </el-button>
      <!-- 首页面包屑 -->
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右边内容 -->
    <div class="r-content">
      <!-- 头像下拉框 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {ref,computed} from 'vue'
import { useAllDataState } from '@/stores'
import { useRouter } from 'vue-router'

// 显式导出组件
defineOptions({
  name: 'CommonHeader'
})
const getImageUrl=(user)=>{
  return new URL(`../assets/images/${user}.png`,import.meta.url).href
}

const store=useAllDataState()
const router = useRouter()

const handleCollapse = ()=>{
  store.state.isCollapse=!store.state.isCollapse
}

const handleLogout = () => {
  // 清除所有存储的数据
  localStorage.removeItem('token')
  localStorage.removeItem('menuList')
  localStorage.removeItem('userRole')
  
  // 重置store状态
  store.state.token = ''
  store.state.menuList = []
  store.state.userRole = ''
  store.state.tags = [
    {
      path: '/home',
      name: 'home',
      label: '首页',
      icon: 'home'
    }
  ]
  
  // 跳转到登录页
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons{
  width: 20px;
  height: 20px;
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
/* 用 :deep 穿透，修改子组件里 .bread 类下的 span 标签 */
// :deep 的作用是 将选择器转换为全局选择器，让样式作用于所有匹配的元素，无论它们是否在当前组件的作用域内
:deep(.bread span){
  color:#fff !important;
  cursor:pointer !important
}
</style>