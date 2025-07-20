import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue';
const { proxy } = getCurrentInstance();
const tableData = ref([]);
const config = reactive({
    total: 0,
    page: 1,
    name: ''
});
const tableLabel = reactive([
    {
        prop: 'name', //对应数据列表字段名
        label: '姓名' //每列表头
    },
    {
        prop: 'age', //对应数据列表字段名
        label: '年龄' //每列表头
    },
    {
        prop: 'sexLabel', //对应数据列表字段名
        label: '性别' //每列表头
    },
    {
        prop: 'birth', //对应数据列表字段名
        label: '出生日期', //每列表头
        width: 200
    },
    {
        prop: 'addr', //对应数据列表字段名
        label: '地址', //每列表头
        width: 400
    },
]);
const formInline = reactive({
    keyWord: ''
});
//控制对话框是否显示
const dialogVisible = ref(false);
//新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add");
const formUser = reactive({
    sex: '1'
});
//表单校验规则
const rules = reactive({
    name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
    age: [
        { required: true, message: "年龄是必填项", trigger: "blur" },
        { type: "number", message: "年龄必须是数字" },
    ],
    sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
    birth: [{ required: true, message: "出生日期是必选项" }],
    addr: [{ required: true, message: '地址是必填项' }]
});
const getUserData = async () => {
    let data = await proxy.$api.getUserData(config);
    tableData.value = data.list.map(item => ({
        ...item,
        sexLabel: item.sex === 1 ? '女' : '男'
    }));
    config.total = data.count;
    console.log(data);
};
const handleDelete = (val) => {
    ElMessageBox.confirm("你确定要删除吗？").then(async () => {
        await proxy.$api.deleteUser({ id: val.id });
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
        });
        getUserData();
    });
};
const handleChange = (page) => {
    config.page = page;
    getUserData();
};
const handleSearch = () => {
    config.name = formInline.keyWord;
    getUserData();
};
//这个方法之前定义过
const handleAdd = () => {
    action.value = "add";
    //打开对话窗
    dialogVisible.value = true;
};
//对话框右上角的关闭事件
const handleClose = () => {
    //获取到表单dom，执行resetFields重置表单
    proxy.$refs["userForm"].resetFields();
    //关闭对话框
    dialogVisible.value = false;
};
//对话框右下角的取消事件
const handleCancel = () => {
    proxy.$refs["userForm"].resetFields();
    dialogVisible.value = false;
};
//格式化日期，格式化为：1997-01-02这种
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
};
const onSubmit = () => {
    //执行userForm表单的validate进行规则校验，传入一个回调函数，回调函数会接受到一个是否校验通过的变量
    proxy.$refs["userForm"].validate(async (valid) => {
        //如果校验成功
        if (valid) {
            //res用于接收添加用户或者编辑用户接口的返回值
            let res = null;
            //这里无论是新增或者是编辑，我们都要对这个日期进行一个格式化
            //如果不是1997-01-02这种格式，使用timeFormat方法进行格式化
            formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth);
            //如果当前的操作是新增，则调用新增接口
            if (action.value == "add") {
                res = await proxy.$api.addUser(formUser);
            }
            else if (action.value == "edit") {
                res = await proxy.$api.editUser(formUser);
            }
            //如果接口调用成功
            if (res) {
                //关闭对话框，重置表单，重新请求用户数据
                dialogVisible.value = false;
                proxy.$refs["userForm"].resetFields();
                getUserData();
            }
            //如果校验失败
        }
        else {
            ElMessage({
                showClose: true,
                message: "请输入正确的内容",
                type: "error",
            });
        }
    });
};
const handleEdit = (val) => {
    action.value = "edit";
    dialogVisible.value = true;
    nextTick(() => {
        //因为在第一次显示弹窗的时候form组件没有加载出来，如果直接对formUser赋值，这个值会作为form表单的初始值
        //所以使用nextTick，赋值的操作在一个微任务中，这样就可以避免在from表单加载之前赋值
        Object.assign(formUser, { ...val, sex: "" + val.sex });
        //这里需要改变sex数据类型，是因为el-option的value有类型的校验
    });
};
onMounted(() => {
    getUserData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user-header" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    inline: (true),
    model: (__VLS_ctx.formInline),
}));
const __VLS_10 = __VLS_9({
    inline: (true),
    model: (__VLS_ctx.formInline),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "请输入",
}));
const __VLS_14 = __VLS_13({
    label: "请输入",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    placeholder: "请输入用户名",
    modelValue: (__VLS_ctx.formInline.keyWord),
}));
const __VLS_18 = __VLS_17({
    placeholder: "请输入用户名",
    modelValue: (__VLS_ctx.formInline.keyWord),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
var __VLS_15;
const __VLS_20 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.handleSearch)
};
__VLS_27.slots.default;
var __VLS_27;
var __VLS_23;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table" },
});
const __VLS_32 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    data: (__VLS_ctx.tableData),
}));
const __VLS_34 = __VLS_33({
    data: (__VLS_ctx.tableData),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.tableLabel))) {
    const __VLS_36 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        key: (item.prop),
        label: (item.label),
        prop: (item.prop),
        width: (item.width ? item.width : 125),
    }));
    const __VLS_38 = __VLS_37({
        key: (item.prop),
        label: (item.label),
        prop: (item.prop),
        width: (item.width ? item.width : 125),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
}
const __VLS_40 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    fixed: "right",
    label: "操作",
    minWidth: "180",
}));
const __VLS_42 = __VLS_41({
    fixed: "right",
    label: "操作",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_43.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(scope.row);
        }
    };
    __VLS_47.slots.default;
    var __VLS_47;
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(scope.row);
        }
    };
    __VLS_55.slots.default;
    var __VLS_55;
}
var __VLS_43;
var __VLS_35;
const __VLS_60 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ 'onCurrentChange': {} },
    size: "small",
    background: true,
    layout: "prev,pager,next",
    total: (__VLS_ctx.config.total),
    ...{ class: "pager" },
}));
const __VLS_62 = __VLS_61({
    ...{ 'onCurrentChange': {} },
    size: "small",
    background: true,
    layout: "prev,pager,next",
    total: (__VLS_ctx.config.total),
    ...{ class: "pager" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_64;
let __VLS_65;
let __VLS_66;
const __VLS_67 = {
    onCurrentChange: (__VLS_ctx.handleChange)
};
var __VLS_63;
const __VLS_68 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.action == 'add' ? '新增用户' : '编辑用户'),
    width: "35%",
    beforeClose: (__VLS_ctx.handleClose),
}));
const __VLS_70 = __VLS_69({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.action == 'add' ? '新增用户' : '编辑用户'),
    width: "35%",
    beforeClose: (__VLS_ctx.handleClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
const __VLS_72 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    inline: (true),
    model: (__VLS_ctx.formUser),
    rules: (__VLS_ctx.rules),
    ref: "userForm",
}));
const __VLS_74 = __VLS_73({
    inline: (true),
    model: (__VLS_ctx.formUser),
    rules: (__VLS_ctx.rules),
    ref: "userForm",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
/** @type {typeof __VLS_ctx.userForm} */ ;
var __VLS_76 = {};
__VLS_75.slots.default;
const __VLS_78 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_81.slots.default;
const __VLS_82 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    span: (12),
}));
const __VLS_84 = __VLS_83({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    label: "姓名",
    prop: "name",
}));
const __VLS_88 = __VLS_87({
    label: "姓名",
    prop: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
__VLS_89.slots.default;
const __VLS_90 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    modelValue: (__VLS_ctx.formUser.name),
    placeholder: "请输入姓名",
}));
const __VLS_92 = __VLS_91({
    modelValue: (__VLS_ctx.formUser.name),
    placeholder: "请输入姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
var __VLS_89;
var __VLS_85;
const __VLS_94 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    span: (12),
}));
const __VLS_96 = __VLS_95({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    label: "年龄",
    prop: "age",
}));
const __VLS_100 = __VLS_99({
    label: "年龄",
    prop: "age",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    modelValue: (__VLS_ctx.formUser.age),
    modelModifiers: { number: true, },
    placeholder: "请输入年龄",
}));
const __VLS_104 = __VLS_103({
    modelValue: (__VLS_ctx.formUser.age),
    modelModifiers: { number: true, },
    placeholder: "请输入年龄",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
var __VLS_101;
var __VLS_97;
var __VLS_81;
const __VLS_106 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
__VLS_109.slots.default;
const __VLS_110 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    span: (12),
}));
const __VLS_112 = __VLS_111({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
__VLS_113.slots.default;
const __VLS_114 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    ...{ class: "select-clearn" },
    label: "性别",
    prop: "sex",
}));
const __VLS_116 = __VLS_115({
    ...{ class: "select-clearn" },
    label: "性别",
    prop: "sex",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    modelValue: (__VLS_ctx.formUser.sex),
    placeholder: "请选择",
}));
const __VLS_120 = __VLS_119({
    modelValue: (__VLS_ctx.formUser.sex),
    placeholder: "请选择",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
__VLS_121.slots.default;
const __VLS_122 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    label: "男",
    value: "1",
}));
const __VLS_124 = __VLS_123({
    label: "男",
    value: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
const __VLS_126 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    label: "女",
    value: "0",
}));
const __VLS_128 = __VLS_127({
    label: "女",
    value: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
var __VLS_121;
var __VLS_117;
var __VLS_113;
const __VLS_130 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    span: (12),
}));
const __VLS_132 = __VLS_131({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
__VLS_133.slots.default;
const __VLS_134 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    label: "出生日期",
    prop: "birth",
}));
const __VLS_136 = __VLS_135({
    label: "出生日期",
    prop: "birth",
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
__VLS_137.slots.default;
const __VLS_138 = {}.ElDatePicker;
/** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    modelValue: (__VLS_ctx.formUser.birth),
    type: "date",
    placeholder: "请输入",
    ...{ style: {} },
}));
const __VLS_140 = __VLS_139({
    modelValue: (__VLS_ctx.formUser.birth),
    type: "date",
    placeholder: "请输入",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
var __VLS_137;
var __VLS_133;
var __VLS_109;
const __VLS_142 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({}));
const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
__VLS_145.slots.default;
const __VLS_146 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    label: "地址",
    prop: "addr",
}));
const __VLS_148 = __VLS_147({
    label: "地址",
    prop: "addr",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
__VLS_149.slots.default;
const __VLS_150 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
    modelValue: (__VLS_ctx.formUser.addr),
    placeholder: "请输入地址",
}));
const __VLS_152 = __VLS_151({
    modelValue: (__VLS_ctx.formUser.addr),
    placeholder: "请输入地址",
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
var __VLS_149;
var __VLS_145;
const __VLS_154 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    ...{ style: {} },
}));
const __VLS_156 = __VLS_155({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
__VLS_157.slots.default;
const __VLS_158 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({}));
const __VLS_160 = __VLS_159({}, ...__VLS_functionalComponentArgsRest(__VLS_159));
__VLS_161.slots.default;
const __VLS_162 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_164 = __VLS_163({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
let __VLS_166;
let __VLS_167;
let __VLS_168;
const __VLS_169 = {
    onClick: (__VLS_ctx.handleCancel)
};
__VLS_165.slots.default;
var __VLS_165;
const __VLS_170 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_172 = __VLS_171({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
let __VLS_174;
let __VLS_175;
let __VLS_176;
const __VLS_177 = {
    onClick: (__VLS_ctx.onSubmit)
};
__VLS_173.slots.default;
var __VLS_173;
var __VLS_161;
var __VLS_157;
var __VLS_75;
var __VLS_71;
/** @type {__VLS_StyleScopedClasses['user-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['pager']} */ ;
/** @type {__VLS_StyleScopedClasses['select-clearn']} */ ;
// @ts-ignore
var __VLS_77 = __VLS_76;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            tableData: tableData,
            config: config,
            tableLabel: tableLabel,
            formInline: formInline,
            dialogVisible: dialogVisible,
            action: action,
            formUser: formUser,
            rules: rules,
            handleDelete: handleDelete,
            handleChange: handleChange,
            handleSearch: handleSearch,
            handleAdd: handleAdd,
            handleClose: handleClose,
            handleCancel: handleCancel,
            onSubmit: onSubmit,
            handleEdit: handleEdit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=User.vue.js.map