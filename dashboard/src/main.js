import '@/scss/theme.scss'
import 'bootstrap'
import { installHelpers } from '@/helpers'
import '@/helpers'
import { installStores } from '@/stores'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

installHelpers(app)

app.use(createPinia())
app.use(router)

installStores()

app.mount('#app')