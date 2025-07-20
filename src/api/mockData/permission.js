import Mock from 'mockjs'
import { getMenuByRole } from '@/permiss'

export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    
    // 用户角色映射
    const userRoles = {
      'admin': 'admin',
      'xiaoxiao': 'xiaoxiao'
    }
    
    // 判断用户是否存在
    if (username === 'admin' && password === 'admin') {
      const role = userRoles[username]
      const menuList = getMenuByRole(role)
      
      return {
        code: 200,
        data: {
          menuList,
          token: Mock.Random.guid(),
          role,
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      const role = userRoles[username]
      const menuList = getMenuByRole(role)
      
      return {
        code: 200,
        data: {
          menuList,
          token: Mock.Random.guid(),
          role,
          message: '获取成功'
        }
      }
    } else {
      // 登录失败时返回错误状态码
      return {
        code: -999,
        data: {
          message: '账号或密码错误'
        }
      }
    }
  }
}