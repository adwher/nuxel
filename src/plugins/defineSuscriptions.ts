import { Metadata, State } from "../store/store"

export type SuscriptionContext<S> = {
    trigger: string
    metadata: Metadata<S>
    state: [old: State<S>, newest: State<S>]
}

export type Suscription<S> = (context: SuscriptionContext<S>) => void | Promise<void>

export type Unsuscribe = () => boolean

export function defineSuscription<S>(metadata: Metadata<S>, suscription: Suscription<S>) {
    metadata.suscriptions.add(suscription)
    return () => metadata.suscriptions.delete(suscription)
}