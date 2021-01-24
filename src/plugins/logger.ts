import { Store } from "../store/store"
import { Plugin } from "./definePlugins"

export function createLogger<S>(): Plugin<S> {
    function obtainTime() {
        const date = new Date()

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        return `${hours}:${minutes}:${seconds}`
    }

    return function (store: Store<S, {}, {}>) {
        store.suscribe(trigger => console.log(`[logger ${obtainTime()}] ${trigger.name}`))
    }
}