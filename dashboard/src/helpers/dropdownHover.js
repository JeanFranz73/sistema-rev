import { Dropdown } from 'bootstrap'

const isDesktop = () => window.innerWidth > 992

export const dropdownOnHover = () => {
    const navbarArea = document.querySelector('[dropdown-hover]')

    if (navbarArea) {
        navbarArea.addEventListener('mouseover', e => {
            if (
                e.target?.className?.includes('dropdown-toggle') &&
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