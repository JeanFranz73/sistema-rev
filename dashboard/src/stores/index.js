import { useConfigStore } from './config.store'
import { useSessionStore } from './session.store'

export const installStores = () => {
    useConfigStore().fetch()
    useSessionStore().fetch()
}

export {
    useConfigStore,
    useSessionStore
}

