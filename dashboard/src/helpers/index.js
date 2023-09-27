import feather from 'feather-icons'

import {
    initTooltips,
    initIcons,
    dropdownOnHover
} from '@/helpers/utils'

export const installAfter = () => {
    docReady(feather.replace)
    docReady(dropdownOnHover)
    docReady(initTooltips)
}

/* iniciar listas */
import initList from '@/helpers/list'

export const installList = () => {
    docReady(initList)
}

export const installHelpers = (Vue) => {
    initIcons(Vue)
}

const docReady = fn => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn)
    } else {
        setTimeout(fn, 1)
    }
}
