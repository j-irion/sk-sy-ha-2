import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BACKEND_URL
    ? process.env.BACKEND_URL
    : 'http://localhost/todos',
});

const app = createApp(App);
app.config.productionTip = false;
app.config.globalProperties.$http = http;
app.mount('#app');
