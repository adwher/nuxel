import { Action } from "./actions"
import { Metadata, State } from "../store/store"

export function defineActions<S, A>(state: S, actions: A, metadata: Metadata<S>) {
    async function execute<P extends any[]>(name: string, action: Action<S, P>, ...args: P) {
        try {
            metadata.history.add({ ...state })

            await action(state, ...args)

            // suscriptions

            const trigger = {
                name,
                metadata
            }

            metadata.suscriptions.forEach(suscription => {
                const old = metadata.history[metadata.history.size - 1]

                suscription(trigger, [old, state])
            })
        }

        catch {
            // TODO
        }
    }

    const entries = Object
        .entries(actions)
        .map(function ([key, action]) {
            return [key, (...args: unknown[]) => execute(key, action, ...args)]
        })

    return Object.fromEntries(entries)
}