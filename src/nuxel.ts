import { definePlugins } from "./plugins/definePlugins"
import { defineStore, Options } from "./store/store"

export function createStore<S, A, G>(options: Options<S, A, G>) {
    const store = defineStore(options)

    definePlugins(store, options.plugins)

    return () => store
}