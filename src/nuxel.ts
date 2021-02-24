import { definePlugins } from "./plugins/definePlugins"
import { defineStore, Options } from "./store/store"

export { createLogger } from "./plugins/logger"
export { createPersistedState } from "./plugins/persistedState"

export function createStore<S extends object, A, G>(options: Options<S, A, G>) {
    const store = defineStore(options)

    definePlugins(store, options.plugins)

    return () => store
}