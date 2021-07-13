import { Metadata } from "../store/store"

import lodash from "lodash"

export type SuscriptionContext<S, A> = {
    trigger: keyof A & string
    metadata: Metadata<S, A>
    state: [old: S, newest: S]
}

export type Suscription<S, A> = (context: SuscriptionContext<S, A>) => Promise<void> | void

export type Unsuscribe = () => void

export function defineSuscription<S, A>(metadata: Metadata<S, A>, suscription: Suscription<S, A>): Unsuscribe {
    metadata.suscriptions.push(suscription)
    
    return () => {
        lodash.remove(metadata.suscriptions, suscription)
    }
}