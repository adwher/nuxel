import { computed, ComputedRef, UnwrapNestedRefs } from "@vue/reactivity"
import { Store } from "./nuxel"

export type Getter<S, R = unknown> = (state: UnwrapNestedRefs<S>) => R

export interface OptionGetters<S> {
    [name: string]: Getter<S>;
}

export type StoreGetters<S, G> = {
    [K in keyof G]: G[K] extends Getter<S, infer R> ? ComputedRef<R> : unknown;
}

export function defineGetters<S, G>(store: Store<S>, getters: G): StoreGetters<S, G> {
    const entries = Object
        .entries(getters || {})
        .map(function (entry) {
            const getter = entry[1] as Getter<S>
            const name = entry[0]

            return [name, computed(() => getter(store.state))]
        })

    return Object.fromEntries(entries)
}