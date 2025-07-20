<template>
  <div class="login-page">
    <div class="login-content">
      <!-- 左侧图片区域 -->
      <div class="login-image">
        <img src="@/assets/images/04.png" alt="登录图片" class="login-img" />
      </div>
      
      <!-- 右侧登录表单区域 -->
      <div class="login-form-container">
        <div class="login-container">
          <div class="login-header">
            <div class="logo">
              <el-icon size="40" color="#409eff">
                <Setting />
              </el-icon>
            </div>
            <h1 class="title">后台管理系统</h1>
            <p class="subtitle">欢迎回来，请登录您的账户</p>
          </div>
          
          <el-form :model="loginForm" class="login-form" @keyup.enter="login">
            <el-form-item>
              <el-input
                v-model="loginForm.username"
                placeholder="请输入账号"
                size="large"
                :prefix-icon="User"
                clearable
                autocomplete="off"
                :show-password="false"
              />
            </el-form-item>
            
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                clearable
                autocomplete="new-password"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="login"
                :loading="loading"
                class="login-btn"
              >
                <el-icon v-if="!loading"><Right /></el-icon>
                {{ loading ? '登录中...' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>
          <div class="login-footer">
            <p class="demo-info">
              <el-icon><InfoFilled /></el-icon>
              演示账号：admin / xiaoxiao
            </p>
            <p class="register-link">
              还没有账户？
              <el-link type="primary" @click="goToRegister">立即注册</el-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, ref, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useAllDataState } from '@/stores'
import { ElMessage } from 'element-plus'
import { Setting, User, Lock, Right, InfoFilled } from '@element-plus/icons-vue'

const store = useAllDataState()
const { proxy } = getCurrentInstance()
const router = useRouter()
const loading = ref(false)

// 定义表单数据
const loginForm = reactive({
  username: '',
  password: '',
})

// 确保表单数据清空
const resetForm = () => {
  loginForm.username = ''
  loginForm.password = ''
}

// 组件挂载时清空表单
onMounted(() => {
  resetForm()
  // 强制清空输入框
  setTimeout(() => {
    resetForm()
  }, 100)
  
  // 监听页面可见性变化
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      resetForm()
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // 清理事件监听器
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
})

// 页面激活时清空表单
onActivated(() => {
  resetForm()
})

// 登录方法
const login = async () => {
  // 检查输入是否为空
  if (!loginForm.username || !loginForm.password) {
    ElMessage.error('请输入账号和密码')
    return
  }
  
  loading.value = true
  
  try {
    // 先检查是否是注册用户
    const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]')
    console.log('注册用户列表:', registeredUsers)
    const registeredUser = registeredUsers.find(user => 
      user.username === loginForm.username && user.password === loginForm.password
    )
    
    if (registeredUser) {
      console.log('找到注册用户:', registeredUser)
      // 注册用户登录
      const mockMenuData = getMenuByRole(registeredUser.role)
      store.updateMenuList(mockMenuData.menuList)
      store.updateToken(mockMenuData.token)
      store.updateUserRole(registeredUser.role)
      
      ElMessage.success('登录成功')
      router.push('/home')
    } else {
      console.log('未找到注册用户，尝试演示账号登录')
      // 尝试原有登录逻辑（演示账号）
      const res = await proxy.$api.getMenu(loginForm)
      console.log('登录响应:', res)
      
      if (res && res.menuList) {
        store.updateMenuList(res.menuList)
        store.updateToken(res.token)
        store.updateUserRole(res.role)
        
        ElMessage.success('登录成功')
        router.push('/home')
      } else {
        ElMessage.error('账号或密码错误')
      }
    }
  } catch (error) {
    console.error('登录错误:', error)
    ElMessage.error('账号或密码错误')
  } finally {
    loading.value = false
  }
}

// 根据角色获取菜单数据
const getMenuByRole = (role) => {
  const menuData = {
    admin: {
      menuList: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'Goods'
        },
        {
          path: 'other',
          label: '其他',
          icon: 'More',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting'
            }
          ]
        }
      ],
      token: 'admin-token-' + Date.now(),
      role: 'admin'
    },
    user: {
      menuList: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'Goods'
        }
      ],
      token: 'user-token-' + Date.now(),
      role: 'user'
    }
  }
  
  return menuData[role] || menuData.user
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/register')
}
</script>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/微软风背景.jpg.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

.login-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  animation: slideUp 0.8s ease-out;
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .login-img {
    max-width: 100%;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.login-container {
  width: 100%;
  max-width: 350px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  
  .logo {
    margin-bottom: 20px;
    animation: pulse 2s infinite;
  }
  
  .title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px 0;
  }
  
  .subtitle {
    color: #666;
    font-size: 14px;
    margin: 0;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
  
  .el-input {
    :deep(.el-input__wrapper) {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      &.is-focus {
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
      }
    }
  }
  
  .login-btn {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    background: linear-gradient(135deg, #409eff 0%, #36a3f7 100%);
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(64, 158, 255, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

.login-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  
  .demo-info {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .el-icon {
      margin-right: 5px;
      color: #409eff;
    }
  }
  
  .register-link {
    font-size: 14px;
    color: #409eff;
    
    .el-link {
      font-weight: 500;
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-content {
    flex-direction: column;
    max-width: 400px;
  }
  
  .login-image {
    height: 200px;
    
    .login-img {
      height: 100%;
      object-fit: cover;
    }
  }
  
  .login-form-container {
    padding: 30px 20px;
  }
  
  .login-header .title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .login-content {
    max-width: 350px;
  }
  
  .login-form-container {
    padding: 20px;
  }
}
</style>