import { computed, reactive } from "@vue/reactivity"
import { Getter } from "./getters"
import { State } from "../store/store"

export function defineGetters<S, G>(state: State<S>, getters: G) {
    function compute(getter: Getter<S>) {
        return computed(() => getter(state))
    }

    const entries = Object
        .entries(getters)
        .map(function ([key, getter]) {
            return [key, compute(getter)]
        })

    return reactive(Object.fromEntries(entries))
}