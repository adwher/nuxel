import { Metadata } from "../store/store"

export type SuscriptionContext<S, A> = {
    trigger: keyof A & string
    metadata: Metadata<S, A>
    state: [old: S, newest: S]
}

export type Suscription<S, A> = (context: SuscriptionContext<S, A>) => Promise<void> | void

export type Unsuscribe = () => boolean

export function defineSuscription<S, A>(metadata: Metadata<S, A>, suscription: Suscription<S, A>) {
    metadata.suscriptions.add(suscription)
    return () => metadata.suscriptions.delete(suscription)
}