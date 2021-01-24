import { Store } from "../store/store";

export type Plugin<S, A, G> = (store: Store<S, A, G>) => void

export function definePlugins<S, A, G>(store: Store<S, A, G>, plugins: Plugin<S, A, G>[] = []) {
    plugins.forEach(plugin => plugin(store))
}