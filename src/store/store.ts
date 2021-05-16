import { Action } from "../actions/actions"
import { Getter } from "../getters/getters"
import { Suscription, Unsuscribe } from "../plugins/defineSuscriptions"

export type StoreState<S> = {
    readonly [K in keyof S]: S[K]
}

export type StoreActions<S, A> = A & {
    [K in keyof A]: (...args: A[K] extends Action<S, infer P> ? P : any[]) => Promise<void> | void
}

export type StoreGetters<S, G> = {
    readonly [K in keyof G & string]: G[K] extends Getter<S, infer R> ? R : G[K]
}

export type Store<S, A, G> = {
    id: string

    state: StoreState<S>
    actions: StoreActions<S, A>
    getters: StoreGetters<S, G>

    suscribe(suscription: Suscription<S, A>): Unsuscribe
    reset(): void
    rollback(): void
}

export { Options, Metadata, defineStore } from "./defineStore"