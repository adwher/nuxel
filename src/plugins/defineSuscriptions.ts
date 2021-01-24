import { Metadata, State } from "../store/store"

export type Trigger<S> = {
    name: string
    metadata: Metadata<S>
}

export type Suscription<S> = (trigger: Trigger<S>, state: [old: State<S>, newest: State<S>]) => void

export type Unsuscribe = () => boolean

export function defineSuscription<S>(metadata: Metadata<S>, suscription: Suscription<S>) {
    metadata.suscriptions.add(suscription)
    return () => metadata.suscriptions.delete(suscription)
}