import '@/scss/theme.scss'
import 'bootstrap'

import { initHelpers, installFonts } from '@/helpers'
import { installStores } from '@/stores'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import { router } from '@/router'

const app = createApp(App)

installFonts()
initHelpers(app)

app.use(createPinia())
installStores()


app.use(router)
app.mount('#app')