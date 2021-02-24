import { reactive } from "vue"
import { Store } from "../store/store"
import { createHashMark, decryptData, encryptData } from "../utils"

export function createPersistedState<S, A, G>() {
    return function (store: Store<S, A, G>) {
        const data = localStorage.getItem(store.name)

        if (typeof data === "string") {
            const json = decryptData(data)

            const jsonMark = createHashMark(json)
            const stateMark = createHashMark(store.state)

            if (jsonMark === stateMark) {
                store.state = reactive(json)
            }

            else {
                localStorage.removeItem(store.name)
            }
        }

        store.suscribe(trigger => {
            localStorage.setItem(store.name, encryptData({ ...store.state }))
        })
    }
}