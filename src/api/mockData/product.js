import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 50

// 手机品牌和型号数据
const phoneBrands = [
  { brand: '苹果', models: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13'] },
  { brand: '三星', models: ['Galaxy S24', 'Galaxy S23', 'Galaxy A55', 'Galaxy A35', 'Galaxy Z Fold5'] },
  { brand: '小米', models: ['小米14 Ultra', '小米14 Pro', '小米14', 'Redmi K70', 'Redmi Note 13'] },
  { brand: 'OPPO', models: ['Find X7 Ultra', 'Find X7', 'Reno 11 Pro', 'Reno 11', 'A2 Pro'] },
  { brand: 'vivo', models: ['X100 Pro', 'X100', 'V29', 'Y100', 'iQOO 12'] },
  { brand: 'iQOO', models: ['iQOO 12 Pro', 'iQOO 12', 'iQOO 11', 'iQOO Neo9', 'iQOO Z8'] },
  { brand: '魅族', models: ['魅族21', '魅族20', '魅族18s', '魅族18', '魅族17'] }
]

// 图片映射
const imageMap = {
  '苹果': '苹果.png',
  '三星': '三星 .png',
  '小米': '小米.png',
  'OPPO': 'oppo.png',
  'vivo': 'vivo.png',
  'iQOO': 'iqoo.png',
  '魅族': '魅族.png'
}

// 模拟商品数据
for (let i = 0; i < count; i++) {
  const brandIndex = Mock.Random.integer(0, phoneBrands.length - 1)
  const brand = phoneBrands[brandIndex]
  const modelIndex = Mock.Random.integer(0, brand.models.length - 1)
  const model = brand.models[modelIndex]
  
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: model,
      brand: brand.brand,
      price: Mock.Random.integer(999, 9999),
      stock: Mock.Random.integer(10, 500),
      sales: Mock.Random.integer(0, 1000),
      image: imageMap[brand.brand],
      description: Mock.Random.cparagraph(1, 3),
      category: '手机',
      status: Mock.Random.integer(0, 1), // 0: 下架, 1: 上架
      createTime: Mock.Random.datetime()
    })
  )
}

export default {
  /**
   * 获取商品列表
   * 要带参数 name, page, limit; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getProductList: config => {
    const { name, page = 1, limit = 10 } = param2Obj(config.url)
    console.log('Mock接收到的参数:', { name, page, limit })
    console.log('Mock URL:', config.url)
   
    const mockList = List.filter(product => {
      // 如果name存在，根据name或brand筛选数据
      if (name && product.name.indexOf(name) === -1 && product.brand.indexOf(name) === -1) return false
      return true
    })
    
    // 分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    console.log('Mock分页结果:', { 
      total: mockList.length, 
      pageSize: limit, 
      currentPage: page, 
      resultCount: pageList.length 
    })
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length, // 数据总条数需要返回
      }
    }
  },

  /**
   * 删除商品
   * @param id
   * @return {*}
   */
  deleteProduct: config => {
    const { id } = param2Obj(config.url)

    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(p => p.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  /**
   * 增加商品
   * @param name, brand, price, stock, sales, image, description, category, status
   * @return {{code: number, data: {message: string}}}
   */
  createProduct: config => {
    const { name, brand, price, stock, sales, image, description, category, status } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      brand: brand,
      price: price,
      stock: stock,
      sales: sales,
      image: image,
      description: description,
      category: category,
      status: status,
      createTime: Mock.Random.datetime()
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },

  /**
   * 修改商品
   * @param id, name, brand, price, stock, sales, image, description, category, status
   * @return {{code: number, data: {message: string}}}
   */
  updateProduct: config => {
    const { id, name, brand, price, stock, sales, image, description, category, status } = JSON.parse(config.body)
    List.some(p => {
      if (p.id === id) {
        p.name = name
        p.brand = brand
        p.price = price
        p.stock = stock
        p.sales = sales
        p.image = image
        p.description = description
        p.category = category
        p.status = status
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
} 