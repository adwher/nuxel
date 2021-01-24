import { UnwrapRef } from "vue"
import { Action } from "../actions/actions"
import { Getter } from "../getters/getters"
import { Suscription, Unsuscribe } from "../plugins/defineSuscriptions"

export type State<S> = S | UnwrapRef<S>

export type StoreActions<S, A> = {
    [K in keyof A]: (...args: A[K] extends Action<S, infer P> ? P : unknown[]) => Promise<void> | void
}

export type StoreGetters<S, G> = {
    [K in keyof G & string]: G[K] extends Getter<S, infer R> ? R : G[K]
}

export type StoreState<S> = { readonly [K in keyof S & string]: S[K] } | Readonly<S>

export type Store<S, A, G> = {
    state: StoreState<S>,
    actions: StoreActions<S, A>
    getters: StoreGetters<S, G>
    suscribe: (suscription: Suscription<S>) => Unsuscribe
    reset: () => void
    rollback: () => void
}

export { Options, Metadata, defineStore } from "./defineStore"