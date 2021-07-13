import { reactive, readonly, toRefs } from "@vue/reactivity"

import { Store, StoreBackdoor } from "./store"
import { Actions, defineActions } from "../actions/actions"
import { defineGetters, Getters } from "../getters/getters"
import { defineSuscription, Suscription } from "../plugins/defineSuscriptions"
import { definePlugins, Plugins } from "../plugins/definePlugins"
import { createHash } from "../utils"

export type Options<S extends object, A, G> = {
    state: S;
    actions?: A & Actions<S>;
    getters?: G & Getters<S>;
    plugins?: Plugins<S>;
}

export type Metadata<S, A> = {
    history: S[];
    suscriptions: Suscription<S, A>[];
}

export function defineStore<S extends object, A, G>(options: Options<S, A, G>) {
    if (typeof options.state !== "object") {
        throw "initial state should be an object"
    }

    const id = createHash(options.state)

    const initial = options.state
    const state = reactive({ ...initial }) as S
    const stateReadOnly = toRefs(readonly(state)) as S

    const metadata: Metadata<S, A> = {
        history: [],
        suscriptions: [],
    }

    const actions = defineActions<S, A>(state, options.actions, metadata)
    const getters = defineGetters<S, G>(state, options.getters)

    const reset = function () {
        Object.assign(state, initial)
        metadata.history = []
    }

    const rollback = function () {
        const oldState = metadata.history.length > 0
            ? metadata.history[metadata.history.length - 1]
            : initial

        Object.assign(state, oldState)
    }

    const suscribe = (suscription: Suscription<S, A>) => defineSuscription(metadata, suscription)

    const store = () => Object.assign({}, stateReadOnly, actions, getters)
    
    const backdoor: StoreBackdoor<S, A> = {
        id: id,
        state: state,
        metadata: metadata,

        suscribe: suscribe,
        reset: reset,
        rollback: rollback,
    }

    definePlugins<S>(backdoor, options.plugins)

    return store
}