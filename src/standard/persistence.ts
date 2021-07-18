import { Plugin } from "../plugins"
import { decryptData, encryptData } from "../util"

interface PersistenceOptions {
    verbose?: boolean
}

export function generateNotion(data: object) {
    return Object
        .entries(data)
        .reduce<string>(
            function (text, [key]) {
                return text += `${key} `
            },

            ""
        )
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
        const encrypted = localStorage.getItem(store.id)

        if (encrypted) {
            const json = decryptData(encrypted)

            const cachedHash = generateNotion(json)
            const stateHash = generateNotion(store.state)

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

            else localStorage.removeItem(store.id)
        }

        store.suscribe(() => {
            localStorage.setItem(store.id, encryptData(store.state))
        })
    }
}