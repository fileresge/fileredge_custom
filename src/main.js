import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const mountTarget = document.querySelector('#app')
const initialHtml = mountTarget?.innerHTML || ''

createApp(App, { initialHtml }).mount(mountTarget)
