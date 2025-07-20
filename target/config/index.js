// 1. 确定当前环境
// import.meta.env.MODE 是 Vite 等构建工具提供的环境变量，会根据启动命令自动识别是开发/测试/生产环境
// 如果拿不到 MODE ，就默认是 "prod"（生产环境）
const env = import.meta.env.MODE || "prod";
// 2. 定义不同环境的配置对象
const EnvConfig = {
    // 开发环境配置
    development: {
        baseApi: "/api", // 开发时，接口基础地址（一般会配合 vite 的 proxy 代理到真实后端，或者本地 Mock ）
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api", // 开发环境用的 Mock 数据地址
    },
    // 测试环境配置
    test: {
        baseApi: "//test.future.com/api", // 测试环境的真实接口基础地址
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api", // 测试环境也能用的 Mock 地址（可选）
    },
    // 生产环境配置
    prod: {
        baseApi: "//future.com/api", // 生产环境的真实接口基础地址（上线后真正请求的后端地址）
        mockApi: "https://apifoxmock.com/m1/4068509-0-default/api", // 生产环境如果需要 Mock 也可以配（一般生产不用，这里可能是示例）
    },
};
// 3. 导出最终的配置
export default {
    env,
    // ... 展开运算符，把上面 EnvConfig 中对应环境（env）的配置拿出来
    ...EnvConfig[env],
    // 是否启用 Mock 数据，这里写死为 false ，可以根据需求改，比如开发环境设为 true
    mock: true,
};
//# sourceMappingURL=index.js.map