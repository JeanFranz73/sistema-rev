import { Dropdown } from 'bootstrap'

const isDesktop = () => (window.innerWidth > 992)

export const dropdownOnHover = () => {
    if (isDesktop()) {
        const hoverDropdowns = document.querySelectorAll('[dropdown-hover]')

        hoverDropdowns.forEach(dropdown => {
            const dropdownButton = dropdown.querySelector('.dropdown-toggle')
            const dropdownInstance = Dropdown.getOrCreateInstance(dropdownButton)

            if (!dropdownButton.hasAttribute('enabled')) {
                dropdownButton.setAttribute('enabled', true)

                dropdown.addEventListener('mouseover', () => {
                    if (isDesktop()) {
                        dropdownInstance.show()
                        dropdownInstance._menu.addEventListener('mouseleave', () => {
                            dropdownInstance.hide()
                        })
                        dropdownButton.addEventListener('mouseleave', () => {
                            dropdownInstance.hide()
                        })
                    }
                })

                const dropdownItems = dropdown.querySelectorAll('.dropdown-item')

                dropdownItems.forEach(item => {
                    item.addEventListener('click', () => {
                        dropdownInstance.hide()
                    })
                })
            }
        })
    }
}