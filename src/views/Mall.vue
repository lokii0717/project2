<template>
  <div class="mall-header">
    <el-button type="primary" @click="handleAdd">+新增商品</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入商品名称或品牌" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  
  <div class="table">
    <el-table :data="tableData" v-loading="loading">
      <el-table-column label="商品图片" width="80">
        <template #default="scope">
          <el-image 
            :src="getImageUrl(scope.row.image)" 
            :preview-src-list="[getImageUrl(scope.row.image)]"
            fit="cover"
            style="width: 50px; height: 50px; border-radius: 6px;"
          />
        </template>
      </el-table-column>
      
      <el-table-column 
        v-for="item in tableLabel"
        :key="item.prop"  
        :label="item.label"
        :prop="item.prop"
        :width="item.width?item.width:100"
      />
      
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" size="small">
            {{ scope.row.status === 1 ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      size="small"
      background
      layout="prev,pager,next"
      :total="config.total"
      :current-page="config.page"
      @current-change="handleChange"
      class="pager"
    ></el-pagination>
  </div>
  
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增商品' : '编辑商品'"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="formProduct" :rules="rules" ref="productForm" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="formProduct.name" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brand">
            <el-select v-model="formProduct.brand" placeholder="请选择品牌" style="width: 100%">
              <el-option label="苹果" value="苹果" />
              <el-option label="三星" value="三星" />
              <el-option label="小米" value="小米" />
              <el-option label="OPPO" value="OPPO" />
              <el-option label="vivo" value="vivo" />
              <el-option label="iQOO" value="iQOO" />
              <el-option label="魅族" value="魅族" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input-number 
              v-model="formProduct.price" 
              :min="0" 
              :max="99999"
              placeholder="请输入价格"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            <el-input-number 
              v-model="formProduct.stock" 
              :min="0" 
              :max="9999"
              placeholder="请输入库存"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="销量" prop="sales">
            <el-input-number 
              v-model="formProduct.sales" 
              :min="0" 
              :max="9999"
              placeholder="请输入销量"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="formProduct.status" placeholder="请选择状态" style="width: 100%">
              <el-option label="上架" :value="1" />
              <el-option label="下架" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-input v-model="formProduct.category" placeholder="请输入分类" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品图片" prop="image">
            <el-select v-model="formProduct.image" placeholder="请选择图片" style="width: 100%">
              <el-option label="苹果" value="苹果.png" />
              <el-option label="三星" value="三星 .png" />
              <el-option label="小米" value="小米.png" />
              <el-option label="OPPO" value="oppo.png" />
              <el-option label="vivo" value="vivo.png" />
              <el-option label="iQOO" value="iqoo.png" />
              <el-option label="魅族" value="魅族.png" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
        <el-form-item label="商品描述" prop="description">
          <el-input 
            v-model="formProduct.description" 
            type="textarea" 
            :rows="3"
            placeholder="请输入商品描述" 
          />
        </el-form-item>
      </el-row>
      
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue'

const { proxy } = getCurrentInstance()
const loading = ref(false)

const tableData = ref([])
const config = reactive({
  total: 0,
  page: 1,
  name: ''
})

const tableLabel = reactive([
  {
    prop: 'name',
    label: '商品名称',
    width: 150
  },
  {
    prop: 'brand',
    label: '品牌',
    width: 80
  },
  {
    prop: 'price',
    label: '价格(元)',
    width: 100
  },
  {
    prop: 'stock',
    label: '库存',
    width: 80
  },
  {
    prop: 'sales',
    label: '销量',
    width: 80
  },
  {
    prop: 'category',
    label: '分类',
    width: 80
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 150
  }
])

const formInline = reactive({
  keyWord: ''
})

// 控制对话框是否显示
const dialogVisible = ref(false)

// 新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add")

const formProduct = reactive({
  name: '',
  brand: '',
  price: 0,
  stock: 0,
  sales: 0,
  image: '',
  description: '',
  category: '手机',
  status: 1
})

// 表单校验规则
const rules = reactive({
  name: [{ required: true, message: "商品名称是必填项", trigger: "blur" }],
  brand: [{ required: true, message: "品牌是必选项", trigger: "change" }],
  price: [{ required: true, message: "价格是必填项", trigger: "blur" }],
  stock: [{ required: true, message: "库存是必填项", trigger: "blur" }],
  sales: [{ required: true, message: "销量是必填项", trigger: "blur" }],
  image: [{ required: true, message: "商品图片是必选项", trigger: "change" }],
  description: [{ required: true, message: "商品描述是必填项", trigger: "blur" }],
  category: [{ required: true, message: "分类是必填项", trigger: "blur" }],
  status: [{ required: true, message: "状态是必选项", trigger: "change" }]
})

// 获取图片URL
const getImageUrl = (imageName) => {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

// 获取商品数据
const getProductData = async () => {
  loading.value = true
  try {
    // 构建查询参数
    const params = {
      page: config.page,
      limit: 10,
      name: config.name
    }
    console.log('发送请求参数:', params)
    let data = await proxy.$api.getProductData(params)
    tableData.value = data.list
    config.total = data.count
    console.log('商品数据:', data)
    console.log('当前页码:', config.page, '总数:', config.total, '列表长度:', tableData.value.length)
  } catch (error) {
    console.error('获取商品数据失败:', error)
    ElMessage.error('获取商品数据失败')
  } finally {
    loading.value = false
  }
}

// 删除商品
const handleDelete = (val) => {
  ElMessageBox.confirm("你确定要删除这个商品吗？").then(async () => {
    try {
      await proxy.$api.deleteProduct({ id: val.id })
      ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success'
      })
      getProductData()
    } catch (error) {
      console.error('删除商品失败:', error)
      ElMessage.error('删除商品失败')
    }
  })
}

// 分页变化
const handleChange = (page) => {
  config.page = page
  getProductData()
}

// 搜索
const handleSearch = () => {
  config.name = formInline.keyWord
  config.page = 1 // 重置到第一页
  getProductData()
}

// 新增商品
const handleAdd = () => {
  action.value = "add"
  dialogVisible.value = true
}

// 对话框右上角的关闭事件
const handleClose = () => {
  proxy.$refs["productForm"].resetFields()
  dialogVisible.value = false
}

// 对话框右下角的取消事件
const handleCancel = () => {
  proxy.$refs["productForm"].resetFields()
  dialogVisible.value = false
}

// 提交表单
const onSubmit = () => {
  proxy.$refs["productForm"].validate(async (valid) => {
    if (valid) {
      let res = null
      
      if (action.value == "add") {
        res = await proxy.$api.addProduct(formProduct)
      } else if (action.value == "edit") {
        res = await proxy.$api.editProduct(formProduct)
      }
      
      if (res) {
        dialogVisible.value = false
        proxy.$refs["productForm"].resetFields()
        getProductData()
        ElMessage.success(action.value === 'add' ? '添加成功' : '编辑成功')
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      })
    }
  })
}

// 编辑商品
const handleEdit = (val) => {
  action.value = "edit"
  dialogVisible.value = true
  
  nextTick(() => {
    Object.assign(formProduct, { ...val })
  })
}

onMounted(() => {
  getProductData()
})
</script>

<style lang="less" scoped>
.mall-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table {
  position: relative;
  height: 520px;
  overflow: hidden; // 防止内容溢出
  
  .pager {
    position: absolute;
    bottom: 30px;
    right: 10px;
    z-index: 1000; // 提高层级
    background: white;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
  }
  
  .el-table {
    width: 100%;
    height: 500px;
    overflow: auto; // 表格内容可滚动
  }
}

:deep(.el-table) {
  .el-table__cell {
    padding: 8px 0; // 减少单元格padding
  }
  
  // 确保表格不会溢出容器
  .el-table__body-wrapper {
    overflow-x: auto;
  }
}

:deep(.el-dialog) {
  .el-form-item {
    margin-bottom: 20px;
  }
}

// 确保分页器样式
:deep(.el-pagination) {
  .el-pagination__total,
  .el-pagination__jump {
    margin: 0 8px;
  }
  
  .btn-prev,
  .btn-next {
    margin: 0 4px;
  }
  
  .el-pager li {
    margin: 0 2px;
  }
}
</style>