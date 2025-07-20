// 权限配置文件
export const menuList = [
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
]

// 角色权限配置
export const rolePermissions = {
  admin: {
    // 管理员可以访问所有页面
    routes: ['/home', '/user', '/mall', '/page1', '/page2'],
    menuList: menuList
  },
  xiaoxiao: {
    // xiaoxiao只能访问首页和用户管理
    routes: ['/home', '/user'],
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
      }
    ]
  }
}

// 检查用户是否有访问某个路由的权限
export function hasPermission(userRole, routePath) {
  const permissions = rolePermissions[userRole]
  if (!permissions) return false
  return permissions.routes.includes(routePath)
}

// 根据角色获取菜单列表
export function getMenuByRole(role) {
  return rolePermissions[role]?.menuList || []
} 