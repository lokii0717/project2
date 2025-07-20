//封装axios，统一处理请求前、请求后的逻辑
// 1. 引入需要的工具和配置
import axios from "axios"; // 引入 axios ，它是用来发 HTTP 请求的“工具”
import { ElMessage } from "element-plus"; // 引入 Element Plus 的提示组件，用来弹错误提示
import config from "@/config"; // 引入项目的配置文件（里面有接口地址等信息）
// 2. 创建一个 axios 实例（可以理解为定制化的请求工具）
const service = axios.create({
    baseURL: config.baseApi // 给所有请求加一个“基础地址”，以后发请求就不用每次都写完整地址啦
});
const NETWORK_ERROR = "网络错误..."; // 定义一个通用的网络错误提示文字
// 3. 请求拦截器 —— 请求发出去之前，先经过这里
service.interceptors.request.use(function (config) {
    // config 里存着请求的详细信息（比如 url、参数、请求头等等）
    // 这里可以做一些“请求前的准备”，比如给请求头加 token、统一加参数
    // 现在暂时没做额外操作，直接把 config 放过去，让请求继续发
    return config;
}, function (error) {
    // 如果请求还没发出去就报错了（比如网络断了、参数格式错到发不出去），就走到这里
    // 把错误“扔出去”，让后面用 catch 能抓到
    return Promise.reject(error);
});
// 4. 响应拦截器 —— 后端返回结果后，先经过这里
service.interceptors.response.use((res) => {
    // res 是后端返回的结果，先把里面的关键信息拆出来
    const { code, data, msg } = res.data;
    if (code === 200) {
        // 如果状态码是 200 ，说明接口成功啦！
        // 只返回真正需要的数据（res.data.data），把没用的外层去掉，方便后面用
        return data;
    }
    else {
        // 状态码不是 200 ，说明接口有问题（比如参数错、没权限）
        // 不在这里显示错误信息，让调用方处理
        return Promise.reject({ code, message: msg || NETWORK_ERROR }); // 把错误“扔出去”，让后面用 catch 能抓到
    }
}, (error) => {
    // 处理网络错误或其他错误
    ElMessage.error(error.message || NETWORK_ERROR);
    return Promise.reject(error);
});
// 5. 封装一个通用的 request 函数，以后发请求就用它
function request(options) {
    // 如果调用 request 时没传 method ，默认用 get 方法
    options.method = options.method || "get";
    // 处理请求参数：如果是 get 请求，参数放 params 里；其他请求（比如 post ），参数放 data 里
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }
    // 6. 处理 mock 逻辑（是否用假数据）
    let isMock = config.mock; // 先从配置里拿默认的 mock 开关
    // 如果发请求时，自己传了 mock 参数，就用传的这个值覆盖
    if (typeof options.mock !== "undefined") {
        isMock = options.mock;
    }
    // 7. 根据环境和 mock 开关，切换 baseURL（请求的基础地址）
    if (config.env === "prod") {
        // 生产环境，不用 mock ，直接用真实的 baseApi
        service.defaults.baseURL = config.baseApi;
    }
    else {
        // 开发/测试环境，根据 isMock 决定用 mock 地址还是真实地址
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    // 8. 用 service（定制化的 axios 实例）发请求，返回 Promise ，方便后面用 .then .catch
    return service(options);
}
// 9. 把这个 request 函数导出去，其他文件就能用啦！
export default request;
//# sourceMappingURL=request.js.map