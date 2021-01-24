import { Store } from "../store/store";

export type Plugin<S> = (store: Store<S, {}, {}>) => void

export function definePlugins<S, A, G>(store: Store<S, A, G>, plugins: Plugin<S>[] = []) {
    plugins.forEach(plugin => plugin(store))
}