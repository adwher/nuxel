import { Store } from "../store/store"
import { Plugin } from "./definePlugins"

export function createLogger<S, A, G>(): Plugin<S, A, G> {
    function obtainTime() {
        const date = new Date()

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        return `${hours}:${minutes}:${seconds}`
    }

    return function (store: Store<S, unknown, unknown>) {
        store.suscribe(trigger => console.log(`%b[${store.name} ${obtainTime()}] %c${trigger.name}`, "font-weight: bold"))
    }
}