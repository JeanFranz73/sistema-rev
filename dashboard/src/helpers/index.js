import feather from 'feather-icons'

import {
    docReady,
    tooltipInit,
    installIcons,
    dropdownOnHover
} from "@/helpers/utils"

import initList from "@/helpers/list"

export const installAfter = () => {
    docReady(feather.replace)
    docReady(dropdownOnHover)
    docReady(tooltipInit)
    docReady(initList)
}

export const installHelpers = (Vue) => {
    installIcons(Vue)
}