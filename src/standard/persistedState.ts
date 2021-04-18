import { Plugin } from "../plugins/definePlugins"
import { createHashMark, decryptData, encryptData } from "../utils"

export function createPersistence<S extends object>(): Plugin<S> {
    return function (store) {
        const key = `cached/${store.id}`
        const encrypted = localStorage.getItem(key)

        if (encrypted) {
            const json = decryptData(encrypted)

            const cachedHash = createHashMark(json)
            const stateHash = createHashMark(store.state)

            if (cachedHash === stateHash) {
                Object.assign(store.state, json)
            }

            else localStorage.removeItem(key)
        }

        store.suscribe(() =>
            localStorage.setItem(key, encryptData({ ...store.state }))
        )
    }
}