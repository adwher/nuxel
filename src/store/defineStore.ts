import { reactive, readonly } from "vue"

import { State, Store, StoreState } from "./store"
import { Actions, defineActions } from "../actions/actions"
import { defineGetters, Getters } from "../getters/getters"
import { defineSuscription, Suscription } from "../plugins/defineSuscriptions"
import { Plugin } from "../plugins/definePlugins"

export type Options<S extends object, A, G = {}> = {
    id: string
    state: S
    actions?: Actions<S> | A
    getters?: Getters<S> | G
    plugins?: Plugin<S, A, G>[]
}

export type Metadata<S> = {
    history: Set<S>
    suscriptions: Set<Suscription<S>>
}

export function defineStore<S extends object, A, G>(options: Options<S, A, G>): Store<S, A, G> {
    if (options.state === undefined) {
        throw "[nuxel] Initial state was undefined"
    }

    else {
        const initialState = options.state
        const state = reactive({ ...initialState })

        const metadata: Metadata<State<S>> = reactive({
            history: new Set(),
            suscriptions: new Set()
        })

        const actions = defineActions(state, options.actions || {}, metadata)
        const getters = defineGetters(state, options.getters || {})

        const reset = function () {
            Object.assign(state, initialState)
            metadata.history.clear()
        }

        const rollback = function () {
            const oldState = metadata.history.size > 0
                ? metadata.history[metadata.history.size - 1]
                : initialState

            Object.assign(state, oldState)
        }

        const suscribe = (suscription: Suscription<S>) => defineSuscription(metadata, suscription)

        return {
            id: options.id,
            state: readonly(state) as StoreState<S>,
            actions,
            getters,
            suscribe,
            reset,
            rollback
        }
    }
}