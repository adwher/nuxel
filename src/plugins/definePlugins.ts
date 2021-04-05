import { Store } from "../store/store"

export type Plugin<S> = (store: S) => any

export type Plugins<S> = Plugin<Store<S, unknown, unknown>>[]

export function definePlugins<S, A, G>(store: Store<S, A, G>, plugins: Plugins<S> = []) {
    plugins.forEach(async plugin => await plugin(store))
}