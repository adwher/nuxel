import { Plugin } from "../plugins"
import { obtainTime } from "../util"

/**
 * Suscribe a event to the store, every mutations will gonna display at the console. Useful to `development` and `debugging` purposes.
 * 
 * ```ts
 * import { createStore, createLogger } from "nuxel"
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
 *         createLogger()
 *     ]
 * })
 * ```
 */
export function createLogger<S>(): Plugin<S> {
    return function (store) {
        store.suscribe(async context => {
            console.groupCollapsed(
                `%c[logger] ${obtainTime()}`,
                `
                    font-weight: bold;
                    background-color: #C7D2FE;
                    color: #4338CA;
                    padding: 0.15rem 0.25rem;
                    border-radius: 0.15rem;
                `
            )
        
            console.log(`id %c${store.id}`, "font-weight: bold;")
            console.log("state", context.state.newest)
            console.log(`action %c${context.trigger}`, "font-weight: bold;")

            console.groupCollapsed("%ctimeline", "font-weight: normal;")

            context.history
                .reverse()
                .forEach((action) => {
                    console.groupCollapsed(
                        `%c[${action.trigger}] %c${obtainTime(action.timestamp)}`,
                        `font-weight: bold;`,
                        `font-weight: normal;`,
                    )
                
                    console.log("old", action.state.old)
                    console.log("newest", action.state.newest)

                    console.groupEnd()
                })

            console.groupEnd()
            
            console.groupEnd()
        })
    }
}