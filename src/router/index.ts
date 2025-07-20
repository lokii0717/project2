import { createRouter, createWebHashHistory } from "vue-router";
import { hasPermission } from "@/permiss";

const routes=[
  {
    path:'/',
    name:'main',
    redirect: '/home',
    component:()=>import('@/views/Main.vue'),
    children:[
      {
        path:'/home',
        name:'home',
        component:()=>import('@/views/Home.vue')
      },
      {
        path:'/user',
        name:'user',
        component:()=>import('@/views/User.vue')
      },
      {
        path:'/mall',
        name:'mall',
        component:()=>import('@/views/Mall.vue')
      },
      {
        path:'/page1',
        name:'page1',
        component:()=>import('@/views/Page1.vue')
      },
      {
        path:'/page2',
        name:'page2',
        component:()=>import('@/views/Page2.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫:', { to: to.path, from: from.path })
  
  // 如果访问的是根路径，重定向到首页
  if (to.path === '/') {
    console.log('访问根路径，重定向到首页')
    next('/home')
    return
  }
  
  // 检查登录状态
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')
  
  console.log('当前状态:', { token: !!token, userRole, path: to.path })
  
  // 访问登录页
  if (to.path === '/login') {
    console.log('访问登录页')
    // 如果已登录，跳转到首页
    if (token) {
      console.log('已登录，跳转到首页')
      next('/home')
    } else {
      // 未登录，允许访问登录页
      console.log('未登录，允许访问登录页')
      next()
    }
    return
  }
  
  // 访问注册页
  if (to.path === '/register') {
    console.log('访问注册页')
    // 如果已登录，跳转到首页
    if (token) {
      console.log('已登录，跳转到首页')
      next('/home')
    } else {
      // 未登录，允许访问注册页
      console.log('未登录，允许访问注册页')
      next()
    }
    return
  }
  
  // 访问403页面，直接通过
  if (to.path === '/403') {
    console.log('访问403页面，直接通过')
    next()
    return
  }
  
  // 访问404页面，直接通过
  if (to.path === '/404') {
    console.log('访问404页面，直接通过')
    next()
    return
  }
  
  // 未登录，跳转到登录页
  if (!token) {
    console.log('未登录，跳转到登录页')
    next('/login')
    return
  }
  
  // 已登录，检查权限
  console.log('已登录，检查权限:', { userRole, path: to.path })
  if (hasPermission(userRole, to.path)) {
    console.log('权限检查通过')
    next()
  } else {
    // 没有权限，跳转到403页面
    console.log('权限不足，跳转到403页面')
    next('/403')
  }
})

export default router