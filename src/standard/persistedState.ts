import { Plugin } from "../plugins/definePlugins"
import { createHashNotion, decryptData, encryptData } from "../utils"

interface PersistenceOptions {
    verbose?: boolean
}

/**
 * Create a `cache` version of the store and before usage load the `cache` at state. Useful to load not dynamic data as sessions, tokens, counters and some stuff else.

 * ```ts
 * import { createStore, createPersistence } from "nuxel"
 * 
 * export const useStore = createStore({
 *     state: {
 *         counter: 0
 *     },
 * 
 *     actions: {
 *         increment(state, by: number = 1) {
 *             state.counter += by
 *         }
 *     },
 * 
 *     plugins: [
 *         createPersistence()
 *     ]
 * })
 * ```
 */
export function createPersistence<S extends object>(options: PersistenceOptions = {}): Plugin<S> {
    return function (store) {
        const key = encryptData(store.id)
        const encrypted = localStorage.getItem(key)

        if (encrypted) {
            const json = decryptData(encrypted)

            const cachedHash = createHashNotion(json)
            const stateHash = createHashNotion(store.state)

            if (cachedHash === stateHash) {
                Object.assign(store.state, json)

                if (options.verbose) {
                    console.groupCollapsed(
                        `%c[persistence] restored from storage`,
                        `
                            font-weight: bold;
                            background-color: #FBCFE8;
                            color: #DB2777;
                            padding: 0.15rem 0.25rem;
                            border-radius: 0.15rem;
                        `
                    )
    
                    console.log(`id %c${store.id}`, "font-weight: bold;")
                    console.log("cached", json)
                    
                    console.groupEnd()
                }
            }

            else localStorage.removeItem(key)
        }

        store.suscribe(() =>
            localStorage.setItem(key, encryptData({ ...store.state }))
        )
    }
}