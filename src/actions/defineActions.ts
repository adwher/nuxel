import { Action } from "./actions"
import { Metadata, StoreActions } from "../store/store"

export function defineActions<S, A>(state: S, actions: A, metadata: Metadata<S, A>): StoreActions<S, A> {
    async function execute<P extends unknown[]>(name: string, action: Action<S, P>, ...args: P) {
        try {
            const old = { ...state }

            metadata.history.add(old)
            await action(state, ...args)

            metadata.suscriptions.forEach(async suscription => {
                await suscription({
                    trigger: name as keyof A,
                    metadata: metadata,
                    state: [old, { ...state }]
                })
            })
        }

        catch(err) {
            console.error(`[nuxel] "${name}" action produce error: ${err}`)
        }
    }

    const entries = Object
        .entries(actions || {})
        .map(function ([key, action]) {
            return [key, (...args: unknown[]) => execute(key, action as Action<S>, ...args)]
        })

    return Object.fromEntries(entries)
}