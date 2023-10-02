import { dropdownOnHover } from '@/helpers/dropdownHover'
import { initTooltips } from '@/helpers/tooltip'
import { initList } from '@/helpers/list'
import { importFonts } from '@/helpers/fonts'
import { getAvatar, isDesktop } from '@/helpers/utils'

import VueMyToasts from 'vue-my-toasts'
import BaseToast from '@/components/BaseToast.vue'

import Icon from '@/components/Icon.vue'

const docReady = fn => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn)
    } else {
        setTimeout(fn, 1)
    }
}

const installAfter = () => {
    docReady(dropdownOnHover)
    docReady(initTooltips)
}

const installList = (list, options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(initList(list, options))
        }, 1)
    })
}

const initHelpers = (Vue) => {
    Vue.use(VueMyToasts, {
        component: BaseToast,
        options: {
            position: 'bottom-right',
            duration: 500000
        }
    })
    Vue.component(Icon.name, Icon)
}


export {
    importFonts,
    installAfter,
    installList,
    initHelpers,
    getAvatar,
    isDesktop,
}