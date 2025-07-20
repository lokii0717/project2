import { reactive, getCurrentInstance, ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { useAllDataState } from '@/stores';
import { ElMessage } from 'element-plus';
import { Setting, User, Lock, Right, InfoFilled } from '@element-plus/icons-vue';
const store = useAllDataState();
const { proxy } = getCurrentInstance();
const router = useRouter();
const loading = ref(false);
// 定义表单数据
const loginForm = reactive({
    username: '',
    password: '',
});
// 确保表单数据清空
const resetForm = () => {
    loginForm.username = '';
    loginForm.password = '';
};
// 组件挂载时清空表单
onMounted(() => {
    resetForm();
    // 强制清空输入框
    setTimeout(() => {
        resetForm();
    }, 100);
    // 监听页面可见性变化
    const handleVisibilityChange = () => {
        if (!document.hidden) {
            resetForm();
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // 清理事件监听器
    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
});
// 页面激活时清空表单
onActivated(() => {
    resetForm();
});
// 登录方法
const login = async () => {
    // 检查输入是否为空
    if (!loginForm.username || !loginForm.password) {
        ElMessage.error('请输入账号和密码');
        return;
    }
    loading.value = true;
    try {
        // 先检查是否是注册用户
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('注册用户列表:', registeredUsers);
        const registeredUser = registeredUsers.find(user => user.username === loginForm.username && user.password === loginForm.password);
        if (registeredUser) {
            console.log('找到注册用户:', registeredUser);
            // 注册用户登录
            const mockMenuData = getMenuByRole(registeredUser.role);
            store.updateMenuList(mockMenuData.menuList);
            store.updateToken(mockMenuData.token);
            store.updateUserRole(registeredUser.role);
            ElMessage.success('登录成功');
            router.push('/home');
        }
        else {
            console.log('未找到注册用户，尝试演示账号登录');
            // 尝试原有登录逻辑（演示账号）
            const res = await proxy.$api.getMenu(loginForm);
            console.log('登录响应:', res);
            if (res && res.menuList) {
                store.updateMenuList(res.menuList);
                store.updateToken(res.token);
                store.updateUserRole(res.role);
                ElMessage.success('登录成功');
                router.push('/home');
            }
            else {
                ElMessage.error('账号或密码错误');
            }
        }
    }
    catch (error) {
        console.error('登录错误:', error);
        ElMessage.error('账号或密码错误');
    }
    finally {
        loading.value = false;
    }
};
// 根据角色获取菜单数据
const getMenuByRole = (role) => {
    const menuData = {
        admin: {
            menuList: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页',
                    icon: 'house'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 'user'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '商品管理',
                    icon: 'Goods'
                },
                {
                    path: 'other',
                    label: '其他',
                    icon: 'More',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting'
                        }
                    ]
                }
            ],
            token: 'admin-token-' + Date.now(),
            role: 'admin'
        },
        user: {
            menuList: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页',
                    icon: 'house'
                },
                {
                    path: '/mall',
                    name: 'mall',
                    label: '商品管理',
                    icon: 'Goods'
                }
            ],
            token: 'user-token-' + Date.now(),
            role: 'user'
        }
    };
    return menuData[role] || menuData.user;
};
// 跳转到注册页面
const goToRegister = () => {
    router.push('/register');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['login-content']} */ ;
/** @type {__VLS_StyleScopedClasses['login-image']} */ ;
/** @type {__VLS_StyleScopedClasses['login-img']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['login-content']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-image" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/04.png",
    alt: "登录图片",
    ...{ class: "login-img" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-form-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo" },
});
const __VLS_0 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    size: "40",
    color: "#409eff",
}));
const __VLS_2 = __VLS_1({
    size: "40",
    color: "#409eff",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.Setting;
/** @type {[typeof __VLS_components.Setting, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "subtitle" },
});
const __VLS_8 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onKeyup': {} },
    model: (__VLS_ctx.loginForm),
    ...{ class: "login-form" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onKeyup': {} },
    model: (__VLS_ctx.loginForm),
    ...{ class: "login-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onKeyup: (__VLS_ctx.login)
};
__VLS_11.slots.default;
const __VLS_16 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入账号",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
    autocomplete: "off",
    showPassword: (false),
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入账号",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
    autocomplete: "off",
    showPassword: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}));
const __VLS_30 = __VLS_29({
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.loading),
    ...{ class: "login-btn" },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.loading),
    ...{ class: "login-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.login)
};
__VLS_39.slots.default;
if (!__VLS_ctx.loading) {
    const __VLS_44 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    const __VLS_48 = {}.Right;
    /** @type {[typeof __VLS_components.Right, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
    const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
    var __VLS_47;
}
(__VLS_ctx.loading ? '登录中...' : '登录');
var __VLS_39;
var __VLS_35;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "demo-info" },
});
const __VLS_52 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.InfoFilled;
/** @type {[typeof __VLS_components.InfoFilled, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
var __VLS_55;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "register-link" },
});
const __VLS_60 = {}.ElLink;
/** @type {[typeof __VLS_components.ElLink, typeof __VLS_components.elLink, typeof __VLS_components.ElLink, typeof __VLS_components.elLink, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_62 = __VLS_61({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_64;
let __VLS_65;
let __VLS_66;
const __VLS_67 = {
    onClick: (__VLS_ctx.goToRegister)
};
__VLS_63.slots.default;
var __VLS_63;
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['login-content']} */ ;
/** @type {__VLS_StyleScopedClasses['login-image']} */ ;
/** @type {__VLS_StyleScopedClasses['login-img']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['login-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-info']} */ ;
/** @type {__VLS_StyleScopedClasses['register-link']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Setting: Setting,
            User: User,
            Lock: Lock,
            Right: Right,
            InfoFilled: InfoFilled,
            loading: loading,
            loginForm: loginForm,
            login: login,
            goToRegister: goToRegister,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Login.vue.js.map