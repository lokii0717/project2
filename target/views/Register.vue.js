import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Setting, User, Lock, Right, UserFilled } from '@element-plus/icons-vue';
const router = useRouter();
const loading = ref(false);
const registerFormRef = ref();
// 定义注册表单数据
const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
});
// 表单校验规则
const rules = reactive({
    username: [
        { required: true, message: "用户名是必填项", trigger: "blur" },
        { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "密码是必填项", trigger: "blur" },
        { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" }
    ],
    confirmPassword: [
        { required: true, message: "确认密码是必填项", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                if (value !== registerForm.password) {
                    callback(new Error('两次输入密码不一致'));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    role: [
        { required: true, message: "请选择角色", trigger: "change" }
    ]
});
// 确保表单数据清空
const resetForm = () => {
    registerForm.username = '';
    registerForm.password = '';
    registerForm.confirmPassword = '';
    registerForm.role = '';
};
// 组件挂载时清空表单
import { onMounted } from 'vue';
onMounted(() => {
    resetForm();
});
// 注册方法
const register = async () => {
    if (!registerFormRef.value)
        return;
    try {
        const valid = await registerFormRef.value.validate();
        if (!valid)
            return;
        loading.value = true;
        // 调用注册API
        const res = await registerUser(registerForm);
        if (res && res.success) {
            ElMessage.success('注册成功，请登录');
            router.push('/login');
        }
        else {
            ElMessage.error(res?.message || '注册失败');
        }
    }
    catch (error) {
        console.error('注册错误:', error);
        ElMessage.error('注册失败，请重试');
    }
    finally {
        loading.value = false;
    }
};
// 注册用户API
const registerUser = async (userData) => {
    // 模拟API调用
    return new Promise((resolve) => {
        setTimeout(() => {
            // 检查用户名是否已存在
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = existingUsers.find(user => user.username === userData.username);
            if (existingUser) {
                resolve({
                    success: false,
                    message: '用户名已存在'
                });
                return;
            }
            // 创建新用户
            const newUser = {
                id: Date.now().toString(),
                username: userData.username,
                password: userData.password, // 实际项目中应该加密
                role: userData.role,
                createTime: new Date().toISOString()
            };
            // 保存到localStorage
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            resolve({
                success: true,
                message: '注册成功'
            });
        }, 1000);
    });
};
// 跳转到登录页
const goToLogin = () => {
    router.push('/login');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['register-content']} */ ;
/** @type {__VLS_StyleScopedClasses['register-image']} */ ;
/** @type {__VLS_StyleScopedClasses['register-img']} */ ;
/** @type {__VLS_StyleScopedClasses['register-form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['register-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['register-content']} */ ;
/** @type {__VLS_StyleScopedClasses['register-form-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-image" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/images/04.png",
    alt: "注册图片",
    ...{ class: "register-img" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-form-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-header" },
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
    model: (__VLS_ctx.registerForm),
    rules: (__VLS_ctx.rules),
    ...{ class: "register-form" },
    ref: "registerFormRef",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onKeyup': {} },
    model: (__VLS_ctx.registerForm),
    rules: (__VLS_ctx.rules),
    ...{ class: "register-form" },
    ref: "registerFormRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onKeyup: (__VLS_ctx.register)
};
/** @type {typeof __VLS_ctx.registerFormRef} */ ;
var __VLS_16 = {};
__VLS_11.slots.default;
const __VLS_18 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    prop: "username",
}));
const __VLS_20 = __VLS_19({
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.registerForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
    autocomplete: "off",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.registerForm.username),
    placeholder: "请输入用户名",
    size: "large",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
    autocomplete: "off",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
const __VLS_26 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    prop: "password",
}));
const __VLS_28 = __VLS_27({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.registerForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.registerForm.password),
    type: "password",
    placeholder: "请输入密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_29;
const __VLS_34 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    prop: "confirmPassword",
}));
const __VLS_36 = __VLS_35({
    prop: "confirmPassword",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    modelValue: (__VLS_ctx.registerForm.confirmPassword),
    type: "password",
    placeholder: "请确认密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}));
const __VLS_40 = __VLS_39({
    modelValue: (__VLS_ctx.registerForm.confirmPassword),
    type: "password",
    placeholder: "请确认密码",
    size: "large",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
    clearable: true,
    autocomplete: "new-password",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
var __VLS_37;
const __VLS_42 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    prop: "role",
}));
const __VLS_44 = __VLS_43({
    prop: "role",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
const __VLS_46 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.registerForm.role),
    placeholder: "请选择角色",
    size: "large",
    ...{ style: {} },
    prefixIcon: (__VLS_ctx.UserFilled),
}));
const __VLS_48 = __VLS_47({
    modelValue: (__VLS_ctx.registerForm.role),
    placeholder: "请选择角色",
    size: "large",
    ...{ style: {} },
    prefixIcon: (__VLS_ctx.UserFilled),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
const __VLS_50 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    label: "管理员",
    value: "admin",
}));
const __VLS_52 = __VLS_51({
    label: "管理员",
    value: "admin",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const __VLS_54 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    label: "普通用户",
    value: "user",
}));
const __VLS_56 = __VLS_55({
    label: "普通用户",
    value: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
var __VLS_49;
var __VLS_45;
const __VLS_58 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
__VLS_61.slots.default;
const __VLS_62 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.loading),
    ...{ class: "register-btn" },
}));
const __VLS_64 = __VLS_63({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    loading: (__VLS_ctx.loading),
    ...{ class: "register-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_66;
let __VLS_67;
let __VLS_68;
const __VLS_69 = {
    onClick: (__VLS_ctx.register)
};
__VLS_65.slots.default;
if (!__VLS_ctx.loading) {
    const __VLS_70 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    __VLS_73.slots.default;
    const __VLS_74 = {}.Right;
    /** @type {[typeof __VLS_components.Right, ]} */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    var __VLS_73;
}
(__VLS_ctx.loading ? '注册中...' : '注册');
var __VLS_65;
var __VLS_61;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "register-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "login-link" },
});
const __VLS_78 = {}.ElLink;
/** @type {[typeof __VLS_components.ElLink, typeof __VLS_components.elLink, typeof __VLS_components.ElLink, typeof __VLS_components.elLink, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_80 = __VLS_79({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_82;
let __VLS_83;
let __VLS_84;
const __VLS_85 = {
    onClick: (__VLS_ctx.goToLogin)
};
__VLS_81.slots.default;
var __VLS_81;
/** @type {__VLS_StyleScopedClasses['register-page']} */ ;
/** @type {__VLS_StyleScopedClasses['register-content']} */ ;
/** @type {__VLS_StyleScopedClasses['register-image']} */ ;
/** @type {__VLS_StyleScopedClasses['register-img']} */ ;
/** @type {__VLS_StyleScopedClasses['register-form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['register-container']} */ ;
/** @type {__VLS_StyleScopedClasses['register-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['register-form']} */ ;
/** @type {__VLS_StyleScopedClasses['register-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['register-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['login-link']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Setting: Setting,
            User: User,
            Lock: Lock,
            Right: Right,
            UserFilled: UserFilled,
            loading: loading,
            registerFormRef: registerFormRef,
            registerForm: registerForm,
            rules: rules,
            register: register,
            goToLogin: goToLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Register.vue.js.map