import { Store } from "./nuxel"

export type Plugin<S> = (store: Store<S>) => Promise<void> | void

export type OptionPlugins<S> = Plugin<S>[]

export function setupPlugins<S>(store: Store<S>, plugins: OptionPlugins<S> = []) {
    plugins.forEach(async plugin => await plugin(store))
}