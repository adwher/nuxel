import { UnwrapNestedRefs, DeepReadonly, Ref } from "@vue/reactivity"
import { StoreActions } from "./actions"
import { StoreGetters } from "./getters"
import { Suscription, Unsuscribe } from "./suscriptions"

// CONTEXT

export interface StoreContext<S> {
    trigger: string;
    timestamp: number;
    state: {
        old: S;
        newest: S;
    };
}

// STORE

export type StoreState<S> = {
    [K in keyof S]: DeepReadonly<Ref<S[K]>>;
}

export interface Store<S> {
    id: string;
    state: UnwrapNestedRefs<S>;
    history: StoreContext<S>[];
    suscriptions: Set<Suscription<S>>;

    suscribe(callback: Suscription<S>): Unsuscribe;
    reset(): void;
}

export type StoreHook<S, A, G> = () => StoreState<S> & StoreActions<S, A> & StoreGetters<S, G>

// EXPORTS

export { createStore } from "./store"
export { createLogger } from "./standard/logger"
export { createPersistence } from "./standard/persistence"