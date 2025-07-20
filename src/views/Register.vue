<template>
  <div class="register-page">
    <div class="register-content">
      <!-- 左侧图片区域 -->
      <div class="register-image">
        <img src="@/assets/images/04.png" alt="注册图片" class="register-img" />
      </div>
      
      <!-- 右侧注册表单区域 -->
      <div class="register-form-container">
        <div class="register-container">
          <div class="register-header">
            <div class="logo">
              <el-icon size="40" color="#409eff">
                <Setting />
              </el-icon>
            </div>
            <h1 class="title">用户注册</h1>
            <p class="subtitle">创建您的账户，开始使用系统</p>
          </div>
          
          <el-form :model="registerForm" :rules="rules" class="register-form" ref="registerFormRef" @keyup.enter="register">
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                size="large"
                :prefix-icon="User"
                clearable
                autocomplete="off"
              />
            </el-form-item>
            
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                clearable
                autocomplete="new-password"
              />
            </el-form-item>
            
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请确认密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                clearable
                autocomplete="new-password"
              />
            </el-form-item>
            
            <el-form-item prop="role">
              <el-select 
                v-model="registerForm.role" 
                placeholder="请选择角色" 
                size="large"
                style="width: 100%"
                :prefix-icon="UserFilled"
              >
                <el-option label="管理员" value="admin" />
                <el-option label="普通用户" value="user" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="register"
                :loading="loading"
                class="register-btn"
              >
                <el-icon v-if="!loading"><Right /></el-icon>
                {{ loading ? '注册中...' : '注册' }}
              </el-button>
            </el-form-item>
          </el-form>
          
          <div class="register-footer">
            <p class="login-link">
              已有账户？
              <el-link type="primary" @click="goToLogin">立即登录</el-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Setting, User, Lock, Right, UserFilled } from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(false)
const registerFormRef = ref()

// 定义注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: ''
})

// 表单校验规则
const rules = reactive({
  username: [
    { required: true, message: "用户名是必填项", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码是必填项", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, message: "确认密码是必填项", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: "blur"
    }
  ],
  role: [
    { required: true, message: "请选择角色", trigger: "change" }
  ]
})

// 确保表单数据清空
const resetForm = () => {
  registerForm.username = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerForm.role = ''
}

// 组件挂载时清空表单
import { onMounted } from 'vue'
onMounted(() => {
  resetForm()
})

// 注册方法
const register = async () => {
  if (!registerFormRef.value) return
  
  try {
    const valid = await registerFormRef.value.validate()
    if (!valid) return
    
    loading.value = true
    
    // 调用注册API
    const res = await registerUser(registerForm)
    
    if (res && res.success) {
      ElMessage.success('注册成功，请登录')
      router.push('/login')
    } else {
      ElMessage.error(res?.message || '注册失败')
    }
  } catch (error) {
    console.error('注册错误:', error)
    ElMessage.error('注册失败，请重试')
  } finally {
    loading.value = false
  }
}

// 注册用户API
const registerUser = async (userData) => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 检查用户名是否已存在
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = existingUsers.find(user => user.username === userData.username)
      
      if (existingUser) {
        resolve({
          success: false,
          message: '用户名已存在'
        })
        return
      }
      
      // 创建新用户
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        password: userData.password, // 实际项目中应该加密
        role: userData.role,
        createTime: new Date().toISOString()
      }
      
      // 保存到localStorage
      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))
      
      resolve({
        success: true,
        message: '注册成功'
      })
    }, 1000)
  })
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/微软风背景.jpg.png') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

.register-content {
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

.register-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .register-img {
    max-width: 100%;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.register-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.register-container {
  width: 100%;
  max-width: 350px;
}

.register-header {
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

.register-form {
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
  
  .register-btn {
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

.register-footer {
  margin-top: 30px;
  text-align: center;
  
  .login-link {
    color: #666;
    font-size: 14px;
    margin: 0;
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
  .register-content {
    flex-direction: column;
    max-width: 400px;
  }
  
  .register-image {
    height: 200px;
    
    .register-img {
      height: 100%;
      object-fit: cover;
    }
  }
  
  .register-form-container {
    padding: 30px 20px;
  }
  
  .register-header .title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .register-content {
    max-width: 350px;
  }
  
  .register-form-container {
    padding: 20px;
  }
}
</style> 