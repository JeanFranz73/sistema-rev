import '@/scss/theme.scss'
import 'bootstrap'

import { initHelpers, importFonts } from '@/helpers'
import { installStores } from '@/stores'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import { router } from '@/router'

const app = createApp(App)

importFonts()
initHelpers(app)

app.use(createPinia())
installStores()


app.use(router)
app.mount('#app')