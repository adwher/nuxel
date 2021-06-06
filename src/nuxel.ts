import { defineStore, Options, Store } from "./store/store"

export { createLogger } from "./standard/logger"
export { createPersistence } from "./standard/persistedState"

/**
 * To create a new instance of a store, with their `state`, `actions` and `getters`.
 * 
 * ```ts
 * import { createStore } from "nuxel"
 * 
 * export const useCounter = createStore({
 *     // initial state
 *     state: {
 *         counter: 0
 *     },
 * 
 *     actions: {
 *         increase(state, by: number = 1) {
 *             state.counter += by
 *         }
 *     },
 * 
 *     getters: {
 *         count(state) {
 *             return `The count is: ${state.counter}`
 *         }
 *     }
 * })
 * ```
*/
export function createStore<S extends object, A, G>(options: Options<S, A, G>): () => Store<S, A, G> {
    const store = defineStore(options)

    return () => store
}