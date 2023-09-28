/* Fontes */
import '@fontsource/nunito-sans/300.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/nunito-sans/800.css'
import '@fontsource/nunito-sans/900.css'

/* Toast para notificações */
import VueMyToasts from 'vue-my-toasts'
import BaseToast from '@/components/BaseToast.vue'

/* Ícones */

import Icon from '@/components/Icon.vue'

export const initIcons = (Vue) => {
    Vue.use(VueMyToasts, {
        component: BaseToast,
        options: {
            position: 'bottom-right',
            duration: 500000
        }
    })
    Vue.component(Icon.name, Icon)
}

/* Tooltips */

import { Tooltip } from 'bootstrap'

export const initTooltips = () => {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    )

    tooltipTriggerList.map(
        tooltipTriggerEl => {
            if (tooltipTriggerEl.hasAttribute('desktop-only') && ('ontouchstart' in window)) return
            new Tooltip(tooltipTriggerEl, {
                trigger: 'hover'
            })
        }
    )
}

/* Hover para Dropdowns */

import { Dropdown } from 'bootstrap'

const isDesktop = () => window.innerWidth > 992

export const dropdownOnHover = () => {
    const navbarArea = document.querySelector('[dropdown-hover]')

    if (navbarArea) {
        navbarArea.addEventListener('mouseover', e => {
            // console.log(e.target?.className?.includes('dropdown-icon'))
            console.log(e.target)
            if (
                    // e.target?.className?.includes('dropdown-toggle') &&
                    // !e.target.parentNode.className.includes('dropdown-inside') &&
                isDesktop
            ) {
                const dropdownInstance = Dropdown.getOrCreateInstance(e.target)

                dropdownInstance._element.classList.add('show')
                dropdownInstance._menu.classList.add('show')
                dropdownInstance._menu.setAttribute('data-bs-popper', 'none')

                e.target.parentNode.addEventListener('mouseleave', () => {
                    if (isDesktop) {
                        dropdownInstance.hide()
                    }
                })
            }
        })
    }
}