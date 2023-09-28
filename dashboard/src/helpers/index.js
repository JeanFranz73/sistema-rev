import {
    initTooltips,
    initIcons,
    dropdownOnHover
} from '@/helpers/utils'

export const installAfter = () => {
    docReady(dropdownOnHover)
    docReady(initTooltips)
}

/* iniciar listas */
import { initList } from '@/helpers/list'

export const installList = (list, options) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(initList(list, options))
        }, 1)
    })
}

export const installHelpers = (Vue) => {
    initIcons(Vue)
}

export const docReady = fn => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn)
    } else {
        setTimeout(fn, 1)
    }
}
