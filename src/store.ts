import { reactive, readonly, toRefs } from "@vue/reactivity";
import { encryptData as createHash } from "./util";

import { Store, StoreHook, StoreState } from "./nuxel"
import { defineActions, OptionActions } from "./actions";
import { suscribeToStore } from "./suscriptions";
import { defineGetters, OptionGetters } from "./getters";
import { OptionPlugins, setupPlugins } from "./plugins";

interface Options<S, A, G> {
    state: S;
    actions?: A & OptionActions<S>;
    getters?: G & OptionGetters<S>;

    plugins?: OptionPlugins<S>;
}

export function createStore<S extends object, A, G>(options: Options<S, A, G>): StoreHook<S, A, G> {
    if (typeof options?.state !== "object") {
        throw new TypeError("State must be an object")
    }

    const id = createHash(options.state)

    const state = reactive(options.state)
    const initialState = { ...options.state }

    const reset = () => {
        Object.assign(state, initialState)
    }

    const store: Store<S> = {
        id: id,
        state: state,
        history: [],
        suscriptions: new Set(),

        suscribe: (callback) => suscribeToStore(callback, store),
        reset: reset,
    }

    setupPlugins(store, options.plugins)

    const stateToHook = toRefs(readonly(state)) as StoreState<S>
    const actions = defineActions(store, options.actions)
    const getters = defineGetters(store, options.getters)

    return () => Object.assign({}, stateToHook, actions, getters)
}