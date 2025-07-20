import Mock from 'mockjs';
import homeApi from './mockData/home';
import userApi from './mockData/user';
import permissionApi from './mockData/permission';
import productApi from './mockData/product';
//Mock.mock(请求地址, 请求方法, 假数据)语法，拦截特定请求，返回假数据
//当有请求访问这个地址时，Mock.js 会直接返回这个假数据，冒充后端接口响应
Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);
Mock.mock(/api\/user\/getUserData/, "get", userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/, "get", userApi.deleteUser);
Mock.mock(/user\/addUser/, "post", userApi.createUser);
Mock.mock(/user\/editUser/, "post", userApi.updateUser);
Mock.mock(/api\/product\/getProductData/, "get", productApi.getProductList);
Mock.mock(/api\/product\/deleteProduct/, "get", productApi.deleteProduct);
Mock.mock(/product\/addProduct/, "post", productApi.createProduct);
Mock.mock(/product\/editProduct/, "post", productApi.updateProduct);
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
//# sourceMappingURL=mock.js.map