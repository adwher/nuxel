import { Store, StoreContext } from "./nuxel"

export type Unsuscribe = () => void

export type Suscription<S> = (context: StoreContext<S> & { history: StoreContext<S>[] }) => void

export function suscribeToStore<S>(callback: Suscription<S>, store: Store<S>) {
    store.suscriptions.add(callback)
    return () => store.suscriptions.delete(callback)
}