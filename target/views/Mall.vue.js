import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue';
const { proxy } = getCurrentInstance();
const loading = ref(false);
const tableData = ref([]);
const config = reactive({
    total: 0,
    page: 1,
    name: ''
});
const tableLabel = reactive([
    {
        prop: 'name',
        label: '商品名称',
        width: 150
    },
    {
        prop: 'brand',
        label: '品牌',
        width: 80
    },
    {
        prop: 'price',
        label: '价格(元)',
        width: 100
    },
    {
        prop: 'stock',
        label: '库存',
        width: 80
    },
    {
        prop: 'sales',
        label: '销量',
        width: 80
    },
    {
        prop: 'category',
        label: '分类',
        width: 80
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 150
    }
]);
const formInline = reactive({
    keyWord: ''
});
// 控制对话框是否显示
const dialogVisible = ref(false);
// 新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add");
const formProduct = reactive({
    name: '',
    brand: '',
    price: 0,
    stock: 0,
    sales: 0,
    image: '',
    description: '',
    category: '手机',
    status: 1
});
// 表单校验规则
const rules = reactive({
    name: [{ required: true, message: "商品名称是必填项", trigger: "blur" }],
    brand: [{ required: true, message: "品牌是必选项", trigger: "change" }],
    price: [{ required: true, message: "价格是必填项", trigger: "blur" }],
    stock: [{ required: true, message: "库存是必填项", trigger: "blur" }],
    sales: [{ required: true, message: "销量是必填项", trigger: "blur" }],
    image: [{ required: true, message: "商品图片是必选项", trigger: "change" }],
    description: [{ required: true, message: "商品描述是必填项", trigger: "blur" }],
    category: [{ required: true, message: "分类是必填项", trigger: "blur" }],
    status: [{ required: true, message: "状态是必选项", trigger: "change" }]
});
// 获取图片URL
const getImageUrl = (imageName) => {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
};
// 获取商品数据
const getProductData = async () => {
    loading.value = true;
    try {
        // 构建查询参数
        const params = {
            page: config.page,
            limit: 10,
            name: config.name
        };
        console.log('发送请求参数:', params);
        let data = await proxy.$api.getProductData(params);
        tableData.value = data.list;
        config.total = data.count;
        console.log('商品数据:', data);
        console.log('当前页码:', config.page, '总数:', config.total, '列表长度:', tableData.value.length);
    }
    catch (error) {
        console.error('获取商品数据失败:', error);
        ElMessage.error('获取商品数据失败');
    }
    finally {
        loading.value = false;
    }
};
// 删除商品
const handleDelete = (val) => {
    ElMessageBox.confirm("你确定要删除这个商品吗？").then(async () => {
        try {
            await proxy.$api.deleteProduct({ id: val.id });
            ElMessage({
                showClose: true,
                message: '删除成功',
                type: 'success'
            });
            getProductData();
        }
        catch (error) {
            console.error('删除商品失败:', error);
            ElMessage.error('删除商品失败');
        }
    });
};
// 分页变化
const handleChange = (page) => {
    config.page = page;
    getProductData();
};
// 搜索
const handleSearch = () => {
    config.name = formInline.keyWord;
    config.page = 1; // 重置到第一页
    getProductData();
};
// 新增商品
const handleAdd = () => {
    action.value = "add";
    dialogVisible.value = true;
};
// 对话框右上角的关闭事件
const handleClose = () => {
    proxy.$refs["productForm"].resetFields();
    dialogVisible.value = false;
};
// 对话框右下角的取消事件
const handleCancel = () => {
    proxy.$refs["productForm"].resetFields();
    dialogVisible.value = false;
};
// 提交表单
const onSubmit = () => {
    proxy.$refs["productForm"].validate(async (valid) => {
        if (valid) {
            let res = null;
            if (action.value == "add") {
                res = await proxy.$api.addProduct(formProduct);
            }
            else if (action.value == "edit") {
                res = await proxy.$api.editProduct(formProduct);
            }
            if (res) {
                dialogVisible.value = false;
                proxy.$refs["productForm"].resetFields();
                getProductData();
                ElMessage.success(action.value === 'add' ? '添加成功' : '编辑成功');
            }
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
// 编辑商品
const handleEdit = (val) => {
    action.value = "edit";
    dialogVisible.value = true;
    nextTick(() => {
        Object.assign(formProduct, { ...val });
    });
};
onMounted(() => {
    getProductData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mall-header" },
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
    placeholder: "请输入商品名称或品牌",
    modelValue: (__VLS_ctx.formInline.keyWord),
}));
const __VLS_18 = __VLS_17({
    placeholder: "请输入商品名称或品牌",
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
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
__VLS_35.slots.default;
const __VLS_36 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "商品图片",
    width: "80",
}));
const __VLS_38 = __VLS_37({
    label: "商品图片",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_39.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.ElImage;
    /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        src: (__VLS_ctx.getImageUrl(scope.row.image)),
        previewSrcList: ([__VLS_ctx.getImageUrl(scope.row.image)]),
        fit: "cover",
        ...{ style: {} },
    }));
    const __VLS_42 = __VLS_41({
        src: (__VLS_ctx.getImageUrl(scope.row.image)),
        previewSrcList: ([__VLS_ctx.getImageUrl(scope.row.image)]),
        fit: "cover",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
}
var __VLS_39;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.tableLabel))) {
    const __VLS_44 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        key: (item.prop),
        label: (item.label),
        prop: (item.prop),
        width: (item.width ? item.width : 100),
    }));
    const __VLS_46 = __VLS_45({
        key: (item.prop),
        label: (item.label),
        prop: (item.prop),
        width: (item.width ? item.width : 100),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
}
const __VLS_48 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    label: "状态",
    width: "80",
}));
const __VLS_50 = __VLS_49({
    label: "状态",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_51.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_52 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        type: (scope.row.status === 1 ? 'success' : 'danger'),
        size: "small",
    }));
    const __VLS_54 = __VLS_53({
        type: (scope.row.status === 1 ? 'success' : 'danger'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    (scope.row.status === 1 ? '上架' : '下架');
    var __VLS_55;
}
var __VLS_51;
const __VLS_56 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    fixed: "right",
    label: "操作",
    width: "150",
}));
const __VLS_58 = __VLS_57({
    fixed: "right",
    label: "操作",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_59.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_60 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(scope.row);
        }
    };
    __VLS_63.slots.default;
    var __VLS_63;
    const __VLS_68 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }));
    const __VLS_70 = __VLS_69({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    let __VLS_72;
    let __VLS_73;
    let __VLS_74;
    const __VLS_75 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(scope.row);
        }
    };
    __VLS_71.slots.default;
    var __VLS_71;
}
var __VLS_59;
var __VLS_35;
const __VLS_76 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onCurrentChange': {} },
    size: "small",
    background: true,
    layout: "prev,pager,next",
    total: (__VLS_ctx.config.total),
    currentPage: (__VLS_ctx.config.page),
    ...{ class: "pager" },
}));
const __VLS_78 = __VLS_77({
    ...{ 'onCurrentChange': {} },
    size: "small",
    background: true,
    layout: "prev,pager,next",
    total: (__VLS_ctx.config.total),
    currentPage: (__VLS_ctx.config.page),
    ...{ class: "pager" },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
let __VLS_82;
const __VLS_83 = {
    onCurrentChange: (__VLS_ctx.handleChange)
};
var __VLS_79;
const __VLS_84 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.action == 'add' ? '新增商品' : '编辑商品'),
    width: "50%",
    beforeClose: (__VLS_ctx.handleClose),
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.action == 'add' ? '新增商品' : '编辑商品'),
    width: "50%",
    beforeClose: (__VLS_ctx.handleClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
const __VLS_88 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    model: (__VLS_ctx.formProduct),
    rules: (__VLS_ctx.rules),
    ref: "productForm",
    labelWidth: "100px",
}));
const __VLS_90 = __VLS_89({
    model: (__VLS_ctx.formProduct),
    rules: (__VLS_ctx.rules),
    ref: "productForm",
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
/** @type {typeof __VLS_ctx.productForm} */ ;
var __VLS_92 = {};
__VLS_91.slots.default;
const __VLS_94 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
__VLS_97.slots.default;
const __VLS_98 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    span: (12),
}));
const __VLS_100 = __VLS_99({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    label: "商品名称",
    prop: "name",
}));
const __VLS_104 = __VLS_103({
    label: "商品名称",
    prop: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
__VLS_105.slots.default;
const __VLS_106 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    modelValue: (__VLS_ctx.formProduct.name),
    placeholder: "请输入商品名称",
}));
const __VLS_108 = __VLS_107({
    modelValue: (__VLS_ctx.formProduct.name),
    placeholder: "请输入商品名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
var __VLS_105;
var __VLS_101;
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
    label: "品牌",
    prop: "brand",
}));
const __VLS_116 = __VLS_115({
    label: "品牌",
    prop: "brand",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
    modelValue: (__VLS_ctx.formProduct.brand),
    placeholder: "请选择品牌",
    ...{ style: {} },
}));
const __VLS_120 = __VLS_119({
    modelValue: (__VLS_ctx.formProduct.brand),
    placeholder: "请选择品牌",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
__VLS_121.slots.default;
const __VLS_122 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    label: "苹果",
    value: "苹果",
}));
const __VLS_124 = __VLS_123({
    label: "苹果",
    value: "苹果",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
const __VLS_126 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
    label: "三星",
    value: "三星",
}));
const __VLS_128 = __VLS_127({
    label: "三星",
    value: "三星",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const __VLS_130 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    label: "小米",
    value: "小米",
}));
const __VLS_132 = __VLS_131({
    label: "小米",
    value: "小米",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const __VLS_134 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    label: "OPPO",
    value: "OPPO",
}));
const __VLS_136 = __VLS_135({
    label: "OPPO",
    value: "OPPO",
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
const __VLS_138 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    label: "vivo",
    value: "vivo",
}));
const __VLS_140 = __VLS_139({
    label: "vivo",
    value: "vivo",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const __VLS_142 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    label: "iQOO",
    value: "iQOO",
}));
const __VLS_144 = __VLS_143({
    label: "iQOO",
    value: "iQOO",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
const __VLS_146 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    label: "魅族",
    value: "魅族",
}));
const __VLS_148 = __VLS_147({
    label: "魅族",
    value: "魅族",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
var __VLS_121;
var __VLS_117;
var __VLS_113;
var __VLS_97;
const __VLS_150 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
__VLS_153.slots.default;
const __VLS_154 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
    span: (12),
}));
const __VLS_156 = __VLS_155({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_155));
__VLS_157.slots.default;
const __VLS_158 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
    label: "价格",
    prop: "price",
}));
const __VLS_160 = __VLS_159({
    label: "价格",
    prop: "price",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
__VLS_161.slots.default;
const __VLS_162 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
    modelValue: (__VLS_ctx.formProduct.price),
    min: (0),
    max: (99999),
    placeholder: "请输入价格",
    ...{ style: {} },
}));
const __VLS_164 = __VLS_163({
    modelValue: (__VLS_ctx.formProduct.price),
    min: (0),
    max: (99999),
    placeholder: "请输入价格",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
var __VLS_161;
var __VLS_157;
const __VLS_166 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
    span: (12),
}));
const __VLS_168 = __VLS_167({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
__VLS_169.slots.default;
const __VLS_170 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
    label: "库存",
    prop: "stock",
}));
const __VLS_172 = __VLS_171({
    label: "库存",
    prop: "stock",
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
__VLS_173.slots.default;
const __VLS_174 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
    modelValue: (__VLS_ctx.formProduct.stock),
    min: (0),
    max: (9999),
    placeholder: "请输入库存",
    ...{ style: {} },
}));
const __VLS_176 = __VLS_175({
    modelValue: (__VLS_ctx.formProduct.stock),
    min: (0),
    max: (9999),
    placeholder: "请输入库存",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
var __VLS_173;
var __VLS_169;
var __VLS_153;
const __VLS_178 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({}));
const __VLS_180 = __VLS_179({}, ...__VLS_functionalComponentArgsRest(__VLS_179));
__VLS_181.slots.default;
const __VLS_182 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    span: (12),
}));
const __VLS_184 = __VLS_183({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_183));
__VLS_185.slots.default;
const __VLS_186 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
    label: "销量",
    prop: "sales",
}));
const __VLS_188 = __VLS_187({
    label: "销量",
    prop: "sales",
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
__VLS_189.slots.default;
const __VLS_190 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
    modelValue: (__VLS_ctx.formProduct.sales),
    min: (0),
    max: (9999),
    placeholder: "请输入销量",
    ...{ style: {} },
}));
const __VLS_192 = __VLS_191({
    modelValue: (__VLS_ctx.formProduct.sales),
    min: (0),
    max: (9999),
    placeholder: "请输入销量",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
var __VLS_189;
var __VLS_185;
const __VLS_194 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
    span: (12),
}));
const __VLS_196 = __VLS_195({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
__VLS_197.slots.default;
const __VLS_198 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
    label: "状态",
    prop: "status",
}));
const __VLS_200 = __VLS_199({
    label: "状态",
    prop: "status",
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
__VLS_201.slots.default;
const __VLS_202 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
    modelValue: (__VLS_ctx.formProduct.status),
    placeholder: "请选择状态",
    ...{ style: {} },
}));
const __VLS_204 = __VLS_203({
    modelValue: (__VLS_ctx.formProduct.status),
    placeholder: "请选择状态",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
__VLS_205.slots.default;
const __VLS_206 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
    label: "上架",
    value: (1),
}));
const __VLS_208 = __VLS_207({
    label: "上架",
    value: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const __VLS_210 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
    label: "下架",
    value: (0),
}));
const __VLS_212 = __VLS_211({
    label: "下架",
    value: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
var __VLS_205;
var __VLS_201;
var __VLS_197;
var __VLS_181;
const __VLS_214 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({}));
const __VLS_216 = __VLS_215({}, ...__VLS_functionalComponentArgsRest(__VLS_215));
__VLS_217.slots.default;
const __VLS_218 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218({
    span: (12),
}));
const __VLS_220 = __VLS_219({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_219));
__VLS_221.slots.default;
const __VLS_222 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
    label: "分类",
    prop: "category",
}));
const __VLS_224 = __VLS_223({
    label: "分类",
    prop: "category",
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
__VLS_225.slots.default;
const __VLS_226 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({
    modelValue: (__VLS_ctx.formProduct.category),
    placeholder: "请输入分类",
}));
const __VLS_228 = __VLS_227({
    modelValue: (__VLS_ctx.formProduct.category),
    placeholder: "请输入分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_227));
var __VLS_225;
var __VLS_221;
const __VLS_230 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230({
    span: (12),
}));
const __VLS_232 = __VLS_231({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
__VLS_233.slots.default;
const __VLS_234 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
    label: "商品图片",
    prop: "image",
}));
const __VLS_236 = __VLS_235({
    label: "商品图片",
    prop: "image",
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
__VLS_237.slots.default;
const __VLS_238 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
    modelValue: (__VLS_ctx.formProduct.image),
    placeholder: "请选择图片",
    ...{ style: {} },
}));
const __VLS_240 = __VLS_239({
    modelValue: (__VLS_ctx.formProduct.image),
    placeholder: "请选择图片",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_239));
__VLS_241.slots.default;
const __VLS_242 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242({
    label: "苹果",
    value: "苹果.png",
}));
const __VLS_244 = __VLS_243({
    label: "苹果",
    value: "苹果.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_243));
const __VLS_246 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
    label: "三星",
    value: "三星 .png",
}));
const __VLS_248 = __VLS_247({
    label: "三星",
    value: "三星 .png",
}, ...__VLS_functionalComponentArgsRest(__VLS_247));
const __VLS_250 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
    label: "小米",
    value: "小米.png",
}));
const __VLS_252 = __VLS_251({
    label: "小米",
    value: "小米.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
const __VLS_254 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
    label: "OPPO",
    value: "oppo.png",
}));
const __VLS_256 = __VLS_255({
    label: "OPPO",
    value: "oppo.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_255));
const __VLS_258 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
    label: "vivo",
    value: "vivo.png",
}));
const __VLS_260 = __VLS_259({
    label: "vivo",
    value: "vivo.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_259));
const __VLS_262 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
    label: "iQOO",
    value: "iqoo.png",
}));
const __VLS_264 = __VLS_263({
    label: "iQOO",
    value: "iqoo.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_263));
const __VLS_266 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({
    label: "魅族",
    value: "魅族.png",
}));
const __VLS_268 = __VLS_267({
    label: "魅族",
    value: "魅族.png",
}, ...__VLS_functionalComponentArgsRest(__VLS_267));
var __VLS_241;
var __VLS_237;
var __VLS_233;
var __VLS_217;
const __VLS_270 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270({}));
const __VLS_272 = __VLS_271({}, ...__VLS_functionalComponentArgsRest(__VLS_271));
__VLS_273.slots.default;
const __VLS_274 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_275 = __VLS_asFunctionalComponent(__VLS_274, new __VLS_274({
    label: "商品描述",
    prop: "description",
}));
const __VLS_276 = __VLS_275({
    label: "商品描述",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_275));
__VLS_277.slots.default;
const __VLS_278 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({
    modelValue: (__VLS_ctx.formProduct.description),
    type: "textarea",
    rows: (3),
    placeholder: "请输入商品描述",
}));
const __VLS_280 = __VLS_279({
    modelValue: (__VLS_ctx.formProduct.description),
    type: "textarea",
    rows: (3),
    placeholder: "请输入商品描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_279));
var __VLS_277;
var __VLS_273;
const __VLS_282 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({
    ...{ style: {} },
}));
const __VLS_284 = __VLS_283({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_283));
__VLS_285.slots.default;
const __VLS_286 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_287 = __VLS_asFunctionalComponent(__VLS_286, new __VLS_286({}));
const __VLS_288 = __VLS_287({}, ...__VLS_functionalComponentArgsRest(__VLS_287));
__VLS_289.slots.default;
const __VLS_290 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_291 = __VLS_asFunctionalComponent(__VLS_290, new __VLS_290({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_292 = __VLS_291({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_291));
let __VLS_294;
let __VLS_295;
let __VLS_296;
const __VLS_297 = {
    onClick: (__VLS_ctx.handleCancel)
};
__VLS_293.slots.default;
var __VLS_293;
const __VLS_298 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_299 = __VLS_asFunctionalComponent(__VLS_298, new __VLS_298({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_300 = __VLS_299({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_299));
let __VLS_302;
let __VLS_303;
let __VLS_304;
const __VLS_305 = {
    onClick: (__VLS_ctx.onSubmit)
};
__VLS_301.slots.default;
var __VLS_301;
var __VLS_289;
var __VLS_285;
var __VLS_91;
var __VLS_87;
/** @type {__VLS_StyleScopedClasses['mall-header']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['pager']} */ ;
// @ts-ignore
var __VLS_93 = __VLS_92;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            loading: loading,
            tableData: tableData,
            config: config,
            tableLabel: tableLabel,
            formInline: formInline,
            dialogVisible: dialogVisible,
            action: action,
            formProduct: formProduct,
            rules: rules,
            getImageUrl: getImageUrl,
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
//# sourceMappingURL=Mall.vue.js.map