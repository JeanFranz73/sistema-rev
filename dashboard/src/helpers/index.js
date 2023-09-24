import {
    docReady,
    tooltipInit,
    installIcons,
    dropdownOnHover
} from "@/helpers/utils"

export const installHelpers = (Vue) => {
    installIcons(Vue)
    docReady(dropdownOnHover)
    docReady(tooltipInit)
}