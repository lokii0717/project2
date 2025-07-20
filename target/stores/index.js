import { defineStore } from "pinia";
import { ref } from "vue";
function initState() {
    return {
        isCollapse: false,
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menuList: JSON.parse(localStorage.getItem('menuList') || '[]'),
        token: localStorage.getItem('token') || '',
        userRole: localStorage.getItem('userRole') || ''
    };
}
export const useAllDataState = defineStore('allData', () => {
    const state = ref(initState());
    //在之前定义的selectMenu方法中
    function selectMenu(val) {
        if (val.name == 'home') {
            state.value.currentMenu = null;
        }
        else {
            state.value.currentMenu = val;
            //这里添加如果点击的不是home时，先找一下tags中是否存在点击的菜单
            let index = state.value.tags.findIndex(item => item.name === val.name);
            //如果不存在则添加到tags中
            index === -1 ? state.value.tags.push(val) : "";
        }
    }
    function updateTags(tag) {
        //找到要删除的tab索引，使用splice方法删除
        let index = state.value.tags.findIndex(item => item.name === tag.name);
        state.value.tags.splice(index, 1);
    }
    function updateMenuList(list) {
        state.value.menuList = list;
        localStorage.setItem('menuList', JSON.stringify(list));
    }
    function updateToken(token) {
        state.value.token = token;
        localStorage.setItem('token', token);
    }
    function updateUserRole(role) {
        state.value.userRole = role;
        localStorage.setItem('userRole', role);
    }
    return {
        state,
        selectMenu,
        updateTags,
        updateMenuList,
        updateToken,
        updateUserRole
    };
});
//# sourceMappingURL=index.js.map