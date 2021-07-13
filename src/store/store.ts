import { ComputedRef, ToRefs } from "@vue/reactivity"
import { Action } from "../actions/actions"
import { Getter } from "../getters/getters"
import { Suscription, Unsuscribe } from "../plugins/defineSuscriptions"
import { Metadata } from "./defineStore"

export type StoreState<S> = ToRefs<S> & Readonly<S>

export type StoreActions<S, A> = {
    [K in keyof A]: (...args: A[K] extends Action<S, infer P> ? P : never) => Promise<void> | void
}

export type StoreGetters<S, G> = {
    readonly [K in keyof G & string]: G[K] extends Getter<S, infer R> ? ComputedRef<R> : ComputedRef<G[K]>
}

export type StoreBackdoor<S, A> = {
    id: string;
    state: S;
    metadata: Metadata<S, A>;

    suscribe(suscription: Suscription<S, A>): Unsuscribe;
    reset(): void;
    rollback(): void;
}

export type Store<S, A, G> = () => StoreState<S> & StoreActions<S, A> & StoreGetters<S, G>

export { Options, Metadata, defineStore } from "./defineStore"