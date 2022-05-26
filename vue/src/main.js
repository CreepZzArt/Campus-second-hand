import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'    
import '@element-plus/icons-vue'
import '@/assets/css/global.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { Post, Get ,Request} from './utils/request';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$Post = Post;
app.config.globalProperties.$Get = Get;
app.config.globalProperties.$Request = Request;
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app')


