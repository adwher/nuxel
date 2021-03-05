import { Store } from "../store/store"
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

export function createLogger<S, A, G>(): Plugin<S, A, G> {
    return function (store: Store<S, unknown, unknown>) {
        store.suscribe(async context => {
            console.log(`[${store.id} ${obtainTime()}] %c${context.trigger}`, "font-weight: bold")
        })
    }
}