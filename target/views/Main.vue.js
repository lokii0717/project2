import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAllDataState } from '@/stores';
// @ts-ignore
import CommonAside from '@/components/CommonAside.vue';
// @ts-ignore
import CommonHeader from '@/components/CommonHeader.vue';
// @ts-ignore
import CommonTab from '@/components/CommonTab.vue';
const router = useRouter();
onMounted(() => {
    // 页面加载时，如果当前路径不是首页，则跳转到首页
    if (router.currentRoute.value.path !== '/home') {
        router.push('/home');
    }
    // 检查是否有token，如果有但没有菜单数据，则重新获取菜单
    const store = useAllDataState();
    if (store.state.token && store.state.menuList.length === 0) {
        // 这里可以调用获取菜单的接口
        // 或者从localStorage恢复菜单数据
        console.log('检测到token但菜单为空，需要重新获取菜单');
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "common-layout" },
});
const __VLS_0 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "lay-container" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "lay-container" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
/** @type {[typeof CommonAside, typeof CommonAside, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(CommonAside, new CommonAside({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
const __VLS_7 = {}.ElContainer;
/** @type {[typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, typeof __VLS_components.ElContainer, typeof __VLS_components.elContainer, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_10.slots.default;
const __VLS_11 = {}.ElHeader;
/** @type {[typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, typeof __VLS_components.ElHeader, typeof __VLS_components.elHeader, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ class: "el-header" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "el-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
/** @type {[typeof CommonHeader, typeof CommonHeader, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(CommonHeader, new CommonHeader({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
var __VLS_14;
/** @type {[typeof CommonTab, typeof CommonTab, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(CommonTab, new CommonTab({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const __VLS_21 = {}.ElMain;
/** @type {[typeof __VLS_components.ElMain, typeof __VLS_components.elMain, typeof __VLS_components.ElMain, typeof __VLS_components.elMain, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "right-main" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "right-main" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_24;
var __VLS_10;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['common-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['lay-container']} */ ;
/** @type {__VLS_StyleScopedClasses['el-header']} */ ;
/** @type {__VLS_StyleScopedClasses['right-main']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CommonAside: CommonAside,
            CommonHeader: CommonHeader,
            CommonTab: CommonTab,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Main.vue.js.map