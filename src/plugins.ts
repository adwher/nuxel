import { Actions } from "./actions"
import { Getters } from "./getters"
import { UseStore } from "./store"

export type Plugin<S, A extends Actions<S>, G extends Getters<S>> = (store: UseStore<S, A, G>) => void