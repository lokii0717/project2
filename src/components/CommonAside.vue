<template>
  <!-- 使用 el-aside（侧边栏）包裹 el-menu（菜单组件） -->
  <el-aside :width="width">
    <el-menu 
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      >
      <h3 v-show="!isCollapse">通用后台管理</h3>
      <h3 v-show="isCollapse">后台</h3>
      <!-- 无子菜单项 遍历noChildren数组 -->
        <el-menu-item 
          v-for="item in noChildren"
          :index="item.path"
          :key="item.path"
          @click="navigate(item.path)"
        >
        <!-- 动态加载图标组件 组件用法-->
        <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <!-- 有子菜单项 遍历hasChildren数组 -->
         <!-- 通过 el-sub-menu 组件嵌套 el-menu-item -->
        <el-sub-menu 
          v-for="item in hasChildren"
          :index="item.path"
          :key="item.path"

        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item 
              v-for="subItem in item.children"
              :index="subItem.path"
              :key="subItem.path"
              @click="navigate(subItem.path)"
            >{{subItem.label}}</el-menu-item>
          </el-menu-item-group>
    
        </el-sub-menu>

      </el-menu>
  </el-aside>
</template>
<script lang="ts" setup>
import {computed} from 'vue'
import { useAllDataState } from '@/stores'
import { useRouter } from 'vue-router'

interface MenuItem {
  path: string;
  name: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}

// 显式导出组件
defineOptions({
  name: 'CommonAside'
})
const router = useRouter()
// const list=ref([
//       	{
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house',
//           url: 'Home'
//       	},
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'Goods',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '用户管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'More',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
const list = computed<MenuItem[]>(() => store.state.menuList)
const noChildren=computed(()=>list.value.filter(item=>!item.children))
const hasChildren=computed(()=>list.value.filter(item=>item.children))

const store=useAllDataState()
const isCollapse=computed(()=>store.state.isCollapse)
const width=computed(()=>store.state.isCollapse?'64px':'180px')
const navigate = (path) => {
      router.push(path)
      // 找到对应的菜单项并添加到tags
      const menuItem = list.value.find(item => item.path === path) || 
                      list.value.flatMap(item => item.children || []).find(subItem => subItem.path === path)
      if (menuItem) {
        store.selectMenu(menuItem)
      }
    }
// 移除未使用的函数
</script>

<style lang="less" scoped>
.icons{
   width: 18px;
   height: 18px;
   margin-right: 5px;
}
.el-menu{
  border-right: none;
  h3{
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside{
  height: 100%;
  background-color: #545c64;
}
</style>