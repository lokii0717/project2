import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataState } from '@/stores';
const store = useAllDataState();
const route = useRoute();
const router = useRouter();
const tags = computed(() => {
    //这个在下面配置
    return store.state.tags;
});
const changeMenu = (tag) => {
    //单击tab时，联动面包屑
    store.selectMenu(tag);
    //跳转对应页面
    router.push(tag.path);
};
//关闭tab时触发
const handleClose = (tag, index) => {
    //这里执行pinia中的updateTags方法，把这个tab删除掉
    store.updateTags(tag);
    //只有当关闭的tab对应当前页面的时候，才需要做一些操作
    if (tag.name !== route.name)
        return;
    //tags.length，这个长度是点击之前的tabs数量-1，因为上面我们删除了一个tab
    //如果关闭的是最后一个
    if (index === store.state.tags.length) {
        //联动面包屑
        store.selectMenu(tags.value[index - 1]);
        //跳转到前一个tab
        router.push(tags.value[index - 1].path);
    }
    else {
        //如果不是最后一个，则让删除后处于这个索引的tab进行联动
        store.selectMenu(tags.value[index]);
        router.push(tags.value[index].path);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tags" },
});
for (const [tag, index] of __VLS_getVForSourceType((__VLS_ctx.tags))) {
    const __VLS_0 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        ...{ 'onClose': {} },
        key: (tag.name),
        closable: (tag.name !== 'home'),
        effect: (__VLS_ctx.route.name === tag.name ? 'dark' : 'plain'),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        ...{ 'onClose': {} },
        key: (tag.name),
        closable: (tag.name !== 'home'),
        effect: (__VLS_ctx.route.name === tag.name ? 'dark' : 'plain'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            __VLS_ctx.changeMenu(tag);
        }
    };
    const __VLS_8 = {
        onClose: (...[$event]) => {
            __VLS_ctx.handleClose(tag, index);
        }
    };
    __VLS_3.slots.default;
    (tag.label);
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['tags']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            route: route,
            tags: tags,
            changeMenu: changeMenu,
            handleClose: handleClose,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=CommonTab.vue.js.map