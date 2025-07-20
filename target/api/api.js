// 整个项目api的统一管理
import request from "./request";
export default {
    getTableData() {
        return request({
            url: '/home/getTableData',
            method: 'get',
            //如果配置了mock: true ，request.js 会识别到，把请求导向 mock.js 定义的假数据，而不是真的发往后端
        });
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            //如果配置了mock: true ，request.js 会识别到，把请求导向 mock.js 定义的假数据，而不是真的发往后端
        });
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get'
        });
    },
    getUserData(params) {
        return request({
            url: '/user/getUserData',
            method: 'get',
            data: params
        });
    },
    deleteUser(params) {
        return request({
            url: '/user/deleteUser',
            method: 'get',
            data: params
        });
    },
    addUser(params) {
        return request({
            url: '/user/addUser',
            method: 'post',
            data: params
        });
    },
    editUser(params) {
        return request({
            url: '/user/editUser',
            method: 'post',
            data: params
        });
    },
    // 商品相关API
    getProductData(params) {
        return request({
            url: '/product/getProductData',
            method: 'get',
            data: params
        });
    },
    deleteProduct(params) {
        return request({
            url: '/product/deleteProduct',
            method: 'get',
            data: params
        });
    },
    addProduct(params) {
        return request({
            url: '/product/addProduct',
            method: 'post',
            data: params
        });
    },
    editProduct(params) {
        return request({
            url: '/product/editProduct',
            method: 'post',
            data: params
        });
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params
        });
    }
};
//# sourceMappingURL=api.js.map