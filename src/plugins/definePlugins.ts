import { StoreBackdoor } from "../store/store"

export type Plugin<S> = (store: StoreBackdoor<S, any>) => Promise<void> | void

export type Plugins<S> = Plugin<S>[]

export function definePlugins<S>(store: StoreBackdoor<S, any>, plugins: Plugins<S> = []) {
    plugins.forEach(async plugin => await plugin(store));
}