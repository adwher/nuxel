import { Getters } from "./getters"
import { Metadata } from "./metadata"
import { State } from "./state"
import { UseActions } from "./store"

export type Action<S, P extends unknown[]> = (state: State<S>, ...args: P) => void

export type Actions<S> = {
    [name: string]: Action<S, unknown[]>
}

export function convertActions<S extends {}, A extends Actions<S>, G extends Getters<S>>(state: State<S>, meta: Metadata<S, A, G>, actions: A) {
    function changeState(type: string, callback: Action<S, unknown[]>, ...args: unknown[]) {
        meta.history.add(Object.assign({}, state)) // take snapshot
        callback(state, ...args)

        meta.suscriptions.forEach(sub => sub({ type, metadata: meta })) // suscriptions
    }
    
    const entries = Object
        .entries(actions ?? {})
        .map(function ([key, action]) {
            return [key, (...args: unknown[]) => changeState(key, action, ...args)]
        })

    return Object.fromEntries(entries) as UseActions<S, A>
}