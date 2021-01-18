import { Action, Actions } from "./actions"
import { Getter, Getters } from "./getters"
import { Plugin } from "./plugins"
import { Suscription } from "./suscriptions"

export type UseActions<S, A> = {
    [K in keyof A]: (...args: A[K] extends Action<S, infer T> ? T : unknown[]) => void
}

export type UseGetters<S, G> = {
    [K in keyof G]: G[K] extends Getter<S, infer T> ? T : unknown
}

export type UseStore<S, A extends Actions<S>, G extends Getters<S>> = {
    state: Readonly<S>,
    actions?: UseActions<S, A>,
    getters?: UseGetters<S, G>,
    suscribe: Suscription<S, A>,
    reset: () => void
}

export interface Store<S extends {}, A extends Actions<S>, G extends Getters<S>> {
    state: S,
    actions?: A,
    getters?: G,
    plugins?: Plugin<S, A, G>[]
}