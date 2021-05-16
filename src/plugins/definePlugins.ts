import { Store } from "../store/store"

export type Plugin<S> = (store: Store<S, any, any>) => Promise<void> | void

export type Plugins<S> = Plugin<S>[]

export function definePlugins<S>(store: Store<S, any, any>, plugins: Plugins<S> = []) {
    plugins.forEach(async plugin => await plugin(store))
}