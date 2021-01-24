import { computed } from "vue"
import { Getter } from "./getters"
import { State } from "../store/store"

export function defineGetters<S, G>(state: State<S>, getters: G) {

    function compute(getter: Getter<S>) {
        return computed(() => getter(state))
    }

    const entries = Object
        .entries(getters)
        .map(function ([key, getter]) {
            return [key, computed(() => compute(getter))]
        })

    return Object.fromEntries(entries)
}