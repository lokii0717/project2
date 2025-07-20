<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 定义左侧组件 -->
      <common-aside>
      </common-aside>
       <!-- 右侧 -->
      <el-container>
        <el-header class="el-header">
          <common-header></common-header>
        </el-header>

        <common-tab></common-tab>

        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAllDataState } from '@/stores'
// @ts-ignore
import CommonAside from '@/components/CommonAside.vue'
// @ts-ignore
import CommonHeader from '@/components/CommonHeader.vue'
// @ts-ignore
import CommonTab from '@/components/CommonTab.vue'

const router = useRouter()

onMounted(() => {
  // 页面加载时，如果当前路径不是首页，则跳转到首页
  if (router.currentRoute.value.path !== '/home') {
    router.push('/home')
  }
  
  // 检查是否有token，如果有但没有菜单数据，则重新获取菜单
  const store = useAllDataState()
  if (store.state.token && store.state.menuList.length === 0) {
    // 这里可以调用获取菜单的接口
    // 或者从localStorage恢复菜单数据
    console.log('检测到token但菜单为空，需要重新获取菜单')
  }
})
</script>

<style scoped lang="less">
  .common-layout,.lay-container{
    height: 100%;
  }
  
  .el-header{
    background-color: #333;
  }
</style>
