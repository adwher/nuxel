import { Plugin } from "../plugins/definePlugins"

function formatNumber(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })

    return formatter.format(value)
}

function obtainTime() {
    const date = new Date()

    const hours = formatNumber(date.getHours())
    const minutes = formatNumber(date.getMinutes())
    const seconds = formatNumber(date.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}

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
            console.log(`[${store.id} ${obtainTime()}] %c${context.trigger}`, "font-weight: bold")
        })
    }
}