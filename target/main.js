import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/less/index.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import '@/api/mock.js';
import api from '@/api/api.js';
const pinia = createPinia();
const app = createApp(App);
//全局的api
app.config.globalProperties.$api = api;
app.use(ElementPlus).use(router).use(pinia).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
//# sourceMappingURL=main.js.map