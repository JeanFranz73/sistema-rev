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