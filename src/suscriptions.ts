import { Actions } from "./actions"
import { Metadata } from "./metadata"

export type Trigger<S, A extends Actions<S>> = {
    type: keyof A,
    metadata: Metadata<S, A>
}

export type Suscribe<S, A extends Actions<S>> = (trigger: Trigger<S, A>) => void

export type Suscription<S, A extends Actions<S>> = (callback: Suscribe<S, A>) => void
