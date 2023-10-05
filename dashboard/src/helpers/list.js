import List from 'list.js'

const togglePaginationButtonDisable = (button, disabled) => {
    button.disabled = disabled
    button.classList[disabled ? 'add' : 'remove']('disabled')
}

export const initList = (el, options) => {
    const bulkSelect = el.querySelector('[data-bulk-select]')

    options = {
        ...options,
        pagination: {
            item: `<li class='page-item'><button class='page page-link' type='button'></button></li>`,
            ...options.pagination
        }
    }

    const paginationButtonNext = el.querySelector(
        '[data-list-pagination="next"]'
    )
    const paginationButtonPrev = el.querySelector(
        '[data-list-pagination="prev"]'
    )
    const viewAll = el.querySelector('[data-list-view="*"]')
    const viewLess = el.querySelector('[data-list-view="less"]')
    const listInfo = el.querySelector('[data-list-info]')
    const listFilter = document.querySelector('[data-list-filter]')
    const list = new List(el, options)

    // ---------------------------------------

    let totalItem = list.items.length
    const itemsPerPage = list.page
    const btnDropdownClose = list.listContainer.querySelector('.btn-close')
    let pageQuantity = Math.ceil(list.size() / list.page)
    let pageCount = 1
    let numberOfcurrentItems =
        (pageCount - 1) * Number(list.page) + list.visibleItems.length
    let isSearching = false

    btnDropdownClose &&
        btnDropdownClose.addEventListener('search.close', () => {
            list.fuzzySearch('')
        })

    const updateListControls = () => {
        listInfo &&
            (listInfo.innerHTML = `${list.i} a ${numberOfcurrentItems} <span class='text-600'> itens de </span>${totalItem}`)

        paginationButtonPrev &&
            togglePaginationButtonDisable(
                paginationButtonPrev,
                pageCount === 1 || pageCount === 0
            )
        paginationButtonNext &&
            togglePaginationButtonDisable(
                paginationButtonNext,
                pageCount === pageQuantity || pageCount === 0
            )

        if (pageCount > 1 && pageCount < pageQuantity) {
            togglePaginationButtonDisable(paginationButtonNext, false)
            togglePaginationButtonDisable(paginationButtonPrev, false)
        }
    }

    // List info
    updateListControls()

    if (paginationButtonNext) {
        paginationButtonNext.addEventListener('click', e => {
            e.preventDefault()
            pageCount += 1
            const nextInitialIndex = list.i + itemsPerPage
            nextInitialIndex <= list.size() &&
                list.show(nextInitialIndex, itemsPerPage)
        })
    }

    if (paginationButtonPrev) {
        paginationButtonPrev.addEventListener('click', e => {
            e.preventDefault()
            pageCount -= 1
            const prevItem = list.i - itemsPerPage
            prevItem > 0 && list.show(prevItem, itemsPerPage)
        })
    }

    const toggleViewBtn = () => {
        viewLess.classList.toggle('d-none')
        viewAll.classList.toggle('d-none')
    }

    if (viewAll) {
        viewAll.addEventListener('click', () => {
            list.show(1, totalItem)
            pageCount = 1
            toggleViewBtn()
        })
    }
    if (viewLess) {
        viewLess.addEventListener('click', () => {
            list.show(1, itemsPerPage)
            pageCount = 1
            toggleViewBtn()
        })
    }
    // numbering pagination
    if (options.pagination) {
        el.querySelector('.pagination').addEventListener('click', e => {
            if (e.target.classList[0] === 'page') {
                const pageNum = Number(e.target.getAttribute('data-i'))
                if (pageNum) {
                    list.show(itemsPerPage * (pageNum - 1) + 1, list.page)
                    pageCount = pageNum
                }
            }
        })
    }
    // filter
    if (options.filter) {
        const { key } = options.filter
        listFilter.addEventListener('change', e => {
            list.filter(item => {
                if (e.target.value === '') {
                    return true
                }
                pageQuantity = Math.ceil(list.matchingItems.length / list.page)
                pageCount = 1
                updateListControls()
                return item.values()[key].toLowerCase().includes(e.target.value.toLowerCase())
            })
        })
    }

    // bulk-select
    if (bulkSelect) {
        bulkSelect.addEventListener('change', () => {
            if (list) {
                if (bulkSelect.checked) {
                    list.items.forEach(item => {
                        item.elm.querySelector(
                            '[data-bulk-select-row]'
                        ).checked = true
                    })
                } else {
                    list.items.forEach(item => {
                        item.elm.querySelector(
                            '[data-bulk-select-row]'
                        ).checked = false
                    })
                }
            }
        })
    }
    const startEvents = ['searchStart', 'filterStart']
    const completeEvents = ['searchComplete', 'filterComplete']

    startEvents.forEach(evt => {
        list.on(evt, () => {
            isSearching = true
        })
    })

    completeEvents.forEach(evt => {
        list.on(evt, () => {
            isSearching = false
        })
    })

    list.on('updated', item => {
        if (!list.matchingItems.length) {
            pageQuantity = Math.ceil(list.size() / list.page)
        } else {
            pageQuantity = Math.ceil(list.matchingItems.length / list.page)
        }
        numberOfcurrentItems =
            (pageCount - 1) * Number(list.page) + list.visibleItems.length
        updateListControls()

        // -------search-----------
        if (isSearching) {
            if (list.matchingItems.length === 0) {
                pageCount = 0
            } else {
                pageCount = 1
            }
            totalItem = list.matchingItems.length
            numberOfcurrentItems =
                (pageCount === 0 ? 1 : pageCount - 1) * Number(list.page) +
                list.visibleItems.length

            updateListControls()
            listInfo &&
                (listInfo.innerHTML = `${list.matchingItems.length === 0 ? 0 : list.i} a ${list.matchingItems.length === 0 ? 0 : numberOfcurrentItems} <span class='text-600'> itens de </span>${list.matchingItems.length}`)
        }

        // -------fallback-----------
        const fallback =
            el.querySelector('.fallback') ||
            document.getElementById(options.fallback)

        if (fallback) {
            if (item.matchingItems.length === 0) {
                fallback.classList.remove('d-none')
            } else {
                fallback.classList.add('d-none')
            }
        }
    })
    return list
}