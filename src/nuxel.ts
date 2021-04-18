import { defineStore, Options } from "./store/store"

export { createLogger } from "./standard/logger"
export { createPersistence } from "./standard/persistedState"

export function createStore<S extends object, A, G>(options: Options<S, A, G>) {
    const store = defineStore(options)

    return () => store
}