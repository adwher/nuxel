import { Actions } from "./actions"
import { Getters } from "./getters"
import { Metadata } from "./metadata"

export type Trigger<S, A extends Actions<S>, G extends Getters<S>> = {
    type: keyof A,
    metadata: Metadata<S, A, G>
}

export type Suscribe<S, A extends Actions<S>, G extends Getters<S>> = (trigger: Trigger<S, A, G>) => void

export type Suscription<S, A extends Actions<S>, G extends Getters<S>> = (callback: Suscribe<S, A, G>) => void
