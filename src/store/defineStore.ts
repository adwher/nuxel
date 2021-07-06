import { reactive, readonly } from "@vue/reactivity"

import { Store } from "./store"
import { Actions, defineActions } from "../actions/actions"
import { defineGetters, Getters } from "../getters/getters"
import { defineSuscription, Suscription } from "../plugins/defineSuscriptions"
import { definePlugins, Plugins } from "../plugins/definePlugins"
import { createHash } from "../utils"

export type Options<S extends object, A, G> = {
    state: S
    actions?: A & Actions<S>
    getters?: G & Getters<S>
    plugins?: Plugins<S>
}

export type Metadata<S, A> = {
    history: Set<S>
    suscriptions: Set<Suscription<S, A>>
}

export function defineStore<S extends object, A, G>(options: Options<S, A, G>): Store<S, A, G> {
    if (typeof options.state !== "object") {
        throw "[nuxel] Initial state should be an object"
    }

    else {
        const id = createHash(options.state)
        const initial = options.state
        const state = reactive({ ...initial }) as S

        const metadata: Metadata<S, A> = reactive({
            history: new Set(),
            suscriptions: new Set()
        })

        const actions = defineActions<S, A>(state, options.actions, metadata)
        const getters = defineGetters<S, G>(state, options.getters)

        const reset = function () {
            Object.assign(state, initial)
            metadata.history.clear()
        }

        const rollback = function () {
            const oldState = metadata.history.size > 0
                ? metadata.history[metadata.history.size - 1]
                : initial

            Object.assign(state, oldState)
        }

        const suscribe = (suscription: Suscription<S, A>) => defineSuscription(metadata, suscription)

        const store: Store<S, A, G> = {
            id: id,
            state: state,
            actions: actions,
            getters: getters,

            suscribe: suscribe,
            reset: reset,
            rollback: rollback
        }

        definePlugins<S>(store as Store<S, unknown, unknown>, options.plugins)

        return {
            ...store,
            state: readonly(state) as S
        }
    }
}