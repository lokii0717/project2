import { onMounted, ref, getCurrentInstance, reactive } from 'vue';
import * as echarts from 'echarts';
const { proxy } = getCurrentInstance();
// 创建一个 ResizeObserver 实例（用于监听 DOM 尺寸变化）
const observer = ref(null);
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
const tableData = ref([]);
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
});
const countData = ref([]);
const chartData = ref([]);
//请求左下数据
const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData;
};
//请求右上数据
const getCountData = async () => {
    const data = await proxy.$api.getCountData();
    countData.value = data;
};
//请求图表数据并渲染
const getChartData = async () => {
    const { orderData, userData, videoData } = await proxy.$api.getChartData();
    //1.处理第一个图表(折线图)
    xOptions.xAxis.data = orderData.date;
    xOptions.series = Object.keys(orderData.data[0]).map(val => {
        return {
            name: val, //系列名称（如小米，苹果）
            data: orderData.data.map(item => item[val]), //系列数据，一个数组（苹果的一组数据）
            type: "line",
        };
        // 在 map 的回调函数中，返回对象字面量时，必须显式用 return { ... }，否则会被解析成普通代码块（而非对象）
    });
    //初始化第一个echarts实例（对应dom中的ref="echart"）
    const oneEcharts = echarts.init(proxy.$refs['oneEcharts']);
    oneEcharts.setOption(xOptions); //应用配置到图表
    //2.处理第二个图表（柱状图）
    //重新设置x轴为用户日期
    xOptions.xAxis.data = userData.map(item => item.date);
    xOptions.series = [
        {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: "bar", //图表类型为柱状图
        },
        {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: "bar"
        }
    ];
    //初始化第二个echarts实例（对应dom中的ref="userEchart"）
    const TwoEcharts = echarts.init(proxy.$refs["TwoEcharts"]);
    TwoEcharts.setOption(xOptions);
    //3.处理第三个图表（饼图）
    pieOptions.series = [
        {
            data: videoData, //直接使用数据，格式为[{name:'',value: },]
            type: "pie", //饼图
        }
    ];
    //初始化第三个echarts实例（对应dom中ref="videoEchart"）
    const ThreeEcharts = echarts.init(proxy.$refs["ThreeEcharts"]);
    ThreeEcharts.setOption(pieOptions);
    //4.创建监听容器尺寸变化
    observer.value = new ResizeObserver(() => {
        oneEcharts.resize();
        TwoEcharts.resize();
        ThreeEcharts.resize();
    });
    //如果容器存在 开始监听第一个图表的容器尺寸变化
    if (proxy.$refs["oneEcharts"]) {
        observer.value.observe(proxy.$refs["oneEcharts"]);
    }
};
//这个是折线图和柱状图 两个图表共用的公共配置
// xOptions 是一个响应式对象（通过 reactive 创建），当修改其属性时，Vue 会自动更新依赖的 DOM
const xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    legend: {},
    // 图表距离容器左侧的距离，调整这个可以给坐标轴标签等留出空间
    grid: {
        left: "20%",
    },
    // 提示框,鼠标放到图表上显示的提示信息
    tooltip: {
        // 表示以坐标轴为触发条件
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [], //横坐标的数据，后续会根据接口返回填充
        axisLine: {
            lineStyle: {
                color: "#17b3a3", // 横坐标轴线的颜色
            },
        },
        axisLabel: {
            // 坐标轴刻度标签的显示间隔，0 表示全部显示
            interval: 0,
            color: "#333", // 刻度标签的颜色
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    // 图表系列数据的颜色数组
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    // 图表的系列数据，比如折线图的每条线、柱状图的每个柱子对应的数据，后续填充
    series: [],
});
// 饼图和折线图的配置差异较大，主要区别在于：
// 饼图不需要 xAxis 和 yAxis（它是圆形布局）
// 饼图的 series 直接表示各个扇形的数据
//饼图的配置，定义基础样式，后续填充series数据来渲染饼图
const pieOptions = reactive({
    // 鼠标放到饼图的每个扇形上时显示提示信息
    tooltip: {
        trigger: "item",
    },
    legend: {},
    // 饼图每个扇形的颜色数组
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    // 饼图的系列数据，后续填充
    series: []
});
onMounted(() => {
    getTableData();
    getCountData();
    getChartData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['num']} */ ;
/** @type {__VLS_StyleScopedClasses['el-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "home" },
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "home" },
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    span: (8),
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    span: (8),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    shadow: "hover",
}));
const __VLS_10 = __VLS_9({
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    src: (__VLS_ctx.getImageUrl('user')),
    ...{ class: "user" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "user-info-admin" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "user-info-p" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
var __VLS_11;
const __VLS_12 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    data: (__VLS_ctx.tableData),
    ...{ class: "user-table" },
}));
const __VLS_14 = __VLS_13({
    data: (__VLS_ctx.tableData),
    ...{ class: "user-table" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
for (const [val, key] of __VLS_getVForSourceType((__VLS_ctx.tableLabel))) {
    const __VLS_16 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        key: (key),
        prop: (key),
        label: (val),
    }));
    const __VLS_18 = __VLS_17({
        key: (key),
        prop: (key),
        label: (val),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
var __VLS_15;
var __VLS_7;
const __VLS_20 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    span: (16),
    ...{ style: {} },
}));
const __VLS_22 = __VLS_21({
    span: (16),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "num" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.countData))) {
    const __VLS_24 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        bodyStyle: ({ display: 'flex', padding: 0 }),
        key: (item.name),
    }));
    const __VLS_26 = __VLS_25({
        bodyStyle: ({ display: 'flex', padding: 0 }),
        key: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    const __VLS_28 = ((item.icon));
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ class: "icons" },
        ...{ style: ({ background: item.color }) },
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "icons" },
        ...{ style: ({ background: item.color }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "num" },
    });
    (item.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "txt" },
    });
    (item.name);
    var __VLS_27;
}
const __VLS_32 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "oneEcharts",
    ...{ style: {} },
});
/** @type {typeof __VLS_ctx.oneEcharts} */ ;
var __VLS_35;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "graph" },
});
const __VLS_36 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "TwoEcharts",
    ...{ style: {} },
});
/** @type {typeof __VLS_ctx.TwoEcharts} */ ;
var __VLS_39;
const __VLS_40 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "ThreeEcharts",
    ...{ style: {} },
});
/** @type {typeof __VLS_ctx.ThreeEcharts} */ ;
var __VLS_43;
var __VLS_23;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['home']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info-admin']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info-p']} */ ;
/** @type {__VLS_StyleScopedClasses['login-info']} */ ;
/** @type {__VLS_StyleScopedClasses['user-table']} */ ;
/** @type {__VLS_StyleScopedClasses['num']} */ ;
/** @type {__VLS_StyleScopedClasses['icons']} */ ;
/** @type {__VLS_StyleScopedClasses['detail']} */ ;
/** @type {__VLS_StyleScopedClasses['num']} */ ;
/** @type {__VLS_StyleScopedClasses['txt']} */ ;
/** @type {__VLS_StyleScopedClasses['graph']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getImageUrl: getImageUrl,
            tableData: tableData,
            tableLabel: tableLabel,
            countData: countData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Home.vue.js.map