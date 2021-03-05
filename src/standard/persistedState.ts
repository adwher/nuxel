import { reactive } from "vue"
import { Store } from "../store/store"
import { createHashMark, decryptData, encryptData } from "../utils"

export function createPersistence<S, A, G>() {
    return function (store: Store<S, A, G>) {
        const key = `persisted/${store.id}`
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