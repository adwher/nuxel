import { computed, readonly } from "@vue/reactivity"
import { StoreState } from "../store/store"
import { Getter } from "./getters"

export function defineGetters<S extends object, G>(state: S, getters: G) {
    function compute(getter: Getter<S>) {
        return computed(() => getter(readonly(state) as StoreState<S>))
    }

    const entries = Object
        .entries(getters || {})
        .map(function ([key, getter]) {
            return [key, compute(getter as Getter<S>)]
        })

    return Object.fromEntries(entries)
}