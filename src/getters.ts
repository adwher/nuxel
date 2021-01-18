import { computed, reactive } from "vue"

import { State } from "./state"
import { UseGetters } from "./store"

export type Getter<S, R extends unknown> = (state: State<S>) => R

export type Getters<S> = {
    [name: string]: Getter<S, unknown>
}

export function convertGetters<S extends {}, G extends Getters<S>>(state: State<S>, getters: G) {
    const entries = reactive(
        Object
            .entries(getters ?? {})
            .map(function ([key, getter]) {
                return [key, computed(() => getter(state))]
            })
    )

    return Object.fromEntries(entries) as UseGetters<S, G>
}