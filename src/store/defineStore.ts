import { reactive, readonly } from "vue"

import { State, Store, StoreState } from "./store"
import { Actions, defineActions } from "../actions/actions"
import { defineGetters, Getters } from "../getters/getters"
import { defineSuscription, Suscription } from "../plugins/defineSuscriptions"
import { Plugin } from "../plugins/definePlugins"

export type Options<S extends {}, A, G = {}> = {
    state: S
    actions?: Actions<S> | A
    getters?: Getters<S> | G
    plugins?: Plugin<S>[]
}

export type Metadata<S> = {
    history: Set<S>
    suscriptions: Set<Suscription<S>>
}

export function defineStore<S extends object, A, G>(options: Options<S, A, G>): Store<S, A, G> {
    const initialState = { ...options.state }
    const state = reactive(options.state)

    const metadata: Metadata<State<S>> = reactive({
        history: new Set(),
        suscriptions: new Set()
    })

    const actions = defineActions(state, options.actions || {}, metadata)
    const getters = defineGetters(state, options.getters || {})

    function reset() {
        Object.assign(state, initialState)
        metadata.history.clear()
    }

    return {
        state: readonly(state) as StoreState<S>,
        actions,
        getters,
        suscribe: (suscription) => defineSuscription(metadata, suscription),
        reset: reset
    }
}