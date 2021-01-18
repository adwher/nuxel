import { reactive, readonly } from "vue"

import { Actions, convertActions } from "./actions"
import { convertGetters, Getters } from "./getters"
import { Metadata } from "./metadata"
import { Store, UseStore } from "./store"
import { Suscribe } from "./suscriptions"

export function createStore<S extends {}, A extends Actions<S>, G extends Getters<S>>(store: Store<S, A, G>) {
    const metadata = reactive<Metadata<S, A, G>>({
        history: [],
        suscriptions: new Set(),
        plugins: new Set(store.plugins ?? []),
    })
    
    const initialState = { ...store.state }
    const state = reactive(store.state)

    const actions = convertActions<S, A>(state, metadata, store.actions)
    const getters = convertGetters(state, store.getters)
    
    return function (): UseStore<S, A, G> {
        const stateReadOnly = readonly(state) as Readonly<S>

        function suscribe(callback: Suscribe<S, A>) {
            metadata.suscriptions.add(callback)
            return () => metadata.suscriptions.delete(callback)
        }

        function reset() {
            metadata.history = []
            Object.assign(state, initialState)
        }

        const stored = {
            state: stateReadOnly,
            actions: actions,
            getters: getters,
            suscribe: suscribe,
            reset: reset
        }

        metadata.plugins.forEach(plugin => plugin(stored)) // plugins

        return stored
    }
}

export function createLogger() {
    return function<S, A extends Actions<S>, G extends Getters<S>>(store: UseStore<S, A, G>) {
        store.suscribe(function ({ type }) {
            const date = new Date()

            const hours = date.getHours()
            const seconds = date.getSeconds()
            const milliseconds = date.getMilliseconds()

            console.log(`[nuxel ${hours}:${seconds}:${milliseconds}] ${type}`)
        })
    }
}