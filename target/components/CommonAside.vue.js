import { computed } from 'vue';
import { useAllDataState } from '@/stores';
import { useRouter } from 'vue-router';
// 显式导出组件
defineOptions({
    name: 'CommonAside'
});
const router = useRouter();
// const list=ref([
//       	{
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house',
//           url: 'Home'
//       	},
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'Goods',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '用户管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'More',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
const list = computed(() => store.state.menuList);
const noChildren = computed(() => list.value.filter(item => !item.children));
const hasChildren = computed(() => list.value.filter(item => item.children));
const store = useAllDataState();
const isCollapse = computed(() => store.state.isCollapse);
const width = computed(() => store.state.isCollapse ? '64px' : '180px');
const navigate = (path) => {
    router.push(path);
    // 找到对应的菜单项并添加到tags
    const menuItem = list.value.find(item => item.path === path) ||
        list.value.flatMap(item => item.children || []).find(subItem => subItem.path === path);
    if (menuItem) {
        store.selectMenu(menuItem);
    }
};
// 移除未使用的函数
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElAside;
/** @type {[typeof __VLS_components.ElAside, typeof __VLS_components.elAside, typeof __VLS_components.ElAside, typeof __VLS_components.elAside, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    width: (__VLS_ctx.width),
}));
const __VLS_2 = __VLS_1({
    width: (__VLS_ctx.width),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    backgroundColor: "#545c64",
    textColor: "#fff",
    collapse: (__VLS_ctx.isCollapse),
    collapseTransition: (false),
}));
const __VLS_6 = __VLS_5({
    backgroundColor: "#545c64",
    textColor: "#fff",
    collapse: (__VLS_ctx.isCollapse),
    collapseTransition: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.isCollapse) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isCollapse) }, null, null);
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.noChildren))) {
    const __VLS_8 = {}.ElMenuItem;
    /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        index: (item.path),
        key: (item.path),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        index: (item.path),
        key: (item.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (...[$event]) => {
            __VLS_ctx.navigate(item.path);
        }
    };
    __VLS_11.slots.default;
    const __VLS_16 = ((item.icon));
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "icons" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "icons" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.label);
    var __VLS_11;
}
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.hasChildren))) {
    const __VLS_20 = {}.ElSubMenu;
    /** @type {[typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        index: (item.path),
        key: (item.path),
    }));
    const __VLS_22 = __VLS_21({
        index: (item.path),
        key: (item.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    {
        const { title: __VLS_thisSlot } = __VLS_23.slots;
        const __VLS_24 = ((item.icon));
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ class: "icons" },
        }));
        const __VLS_26 = __VLS_25({
            ...{ class: "icons" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (item.label);
    }
    const __VLS_28 = {}.ElMenuItemGroup;
    /** @type {[typeof __VLS_components.ElMenuItemGroup, typeof __VLS_components.elMenuItemGroup, typeof __VLS_components.ElMenuItemGroup, typeof __VLS_components.elMenuItemGroup, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
    const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    for (const [subItem] of __VLS_getVForSourceType((item.children))) {
        const __VLS_32 = {}.ElMenuItem;
        /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
            ...{ 'onClick': {} },
            index: (subItem.path),
            key: (subItem.path),
        }));
        const __VLS_34 = __VLS_33({
            ...{ 'onClick': {} },
            index: (subItem.path),
            key: (subItem.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        let __VLS_36;
        let __VLS_37;
        let __VLS_38;
        const __VLS_39 = {
            onClick: (...[$event]) => {
                __VLS_ctx.navigate(subItem.path);
            }
        };
        __VLS_35.slots.default;
        (subItem.label);
        var __VLS_35;
    }
    var __VLS_31;
    var __VLS_23;
}
var __VLS_7;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['icons']} */ ;
/** @type {__VLS_StyleScopedClasses['icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            noChildren: noChildren,
            hasChildren: hasChildren,
            isCollapse: isCollapse,
            width: width,
            navigate: navigate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=CommonAside.vue.js.map