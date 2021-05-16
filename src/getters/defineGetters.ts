import { computed, reactive } from "@vue/reactivity"
import { Getter } from "./getters"

export function defineGetters<S, G>(state: S, getters: G) {
    function compute(getter: Getter<S>) {
        return computed(() => getter(state))
    }

    const entries = Object
        .entries(getters || {})
        .map(function ([key, getter]) {
            return [key, compute(getter as Getter<S>)]
        })

    return reactive(Object.fromEntries(entries))
}