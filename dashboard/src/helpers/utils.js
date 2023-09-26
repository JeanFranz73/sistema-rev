/* Fontes */
import '@fontsource/nunito-sans/300.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/nunito-sans/800.css'
import '@fontsource/nunito-sans/900.css'

/* Toast para notificações */
import VueMyToasts from 'vue-my-toasts'
import BaseToast from '@/components/toasts/BaseToast.vue'

/* Ícones */

import FeatherIcon from '@/components/icons/FeatherIcon.vue'

import UniconIcon from '@/components/icons/UniconIcon.vue'
import '@iconscout/unicons/css/line.css'

import FontawesomeIcon from '@/components/icons/FontawesomeIcon.vue'
import '@fortawesome/fontawesome-free/css/all.css'

export const installIcons = (Vue) => {
    Vue.use(VueMyToasts, {
        component: BaseToast,
        options: {
            position: 'bottom-right',
            duration: 500000
        }
    })
    Vue.component(FeatherIcon.name, FeatherIcon)
    Vue.component(UniconIcon.name, UniconIcon)
    Vue.component(FontawesomeIcon.name, FontawesomeIcon)
}

/* Tooltips */

import { Tooltip } from 'bootstrap'

export const tooltipInit = () => {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    )

    tooltipTriggerList.map(
        tooltipTriggerEl =>
            new Tooltip(tooltipTriggerEl, {
                trigger: 'hover'
            })
    )
}

/* Hover para Dropdowns */

import { Dropdown } from 'bootstrap'

export const dropdownOnHover = () => {
    const navbarArea = document.querySelector('[data-dropdown-on-hover]')

    if (navbarArea) {
        navbarArea.addEventListener('mouseover', e => {
            if (
                e.target?.className?.includes('dropdown-toggle') &&
                !e.target.parentNode.className.includes('dropdown-inside') &&
                window.innerWidth > 992
            ) {
                const dropdownInstance = Dropdown.getOrCreateInstance(e.target)

                dropdownInstance._element.classList.add('show')
                dropdownInstance._menu.classList.add('show')
                dropdownInstance._menu.setAttribute('data-bs-popper', 'none')

                e.target.parentNode.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 992) {
                        dropdownInstance.hide()
                    }
                })
            }
        })
    }
}

/* Para iniciar após o DOM */

export const docReady = fn => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn)
    } else {
        setTimeout(fn, 1)
    }
}
