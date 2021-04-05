import { Store } from "../store/store"

export type Plugin<S> = (store: Store<S, unknown, unknown>) => any

export type Plugins<S> = Plugin<S>[]

export function definePlugins<S, A, G>(store: Store<S, A, G>, plugins: Plugins<S> = []) {
    plugins.forEach(async plugin => await plugin(store))
}