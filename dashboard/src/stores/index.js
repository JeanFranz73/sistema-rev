import { useConfigStore } from './config.store'
import { useSessionStore } from './session.store'
import { useCartStore } from './cart.store'

export const installStores = () => {
    useConfigStore().fetch()
    useSessionStore().fetch()
    useCartStore().fetch()
}

export {
    useConfigStore,
    useSessionStore,
    useCartStore
}
