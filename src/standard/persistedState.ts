import { reactive } from "vue"
import { Plugin } from "../plugins/definePlugins"
import { createHashMark, decryptData, encryptData } from "../utils"

export function createPersistence<S>(): Plugin<S> {
    return function (store) {
        const key = `cached/${store.id}`
        const data = localStorage.getItem(key)

        if (typeof data === "string") {
            const json = decryptData(data)

            const cachedHash = createHashMark(json)
            const stateHash = createHashMark(store.state)

            if (cachedHash === stateHash) store.state = reactive(json)
            else localStorage.removeItem(key)
        }

        store.suscribe(() =>
            localStorage.setItem(key, encryptData({ ...store.state }))
        )
    }
}