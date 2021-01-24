import { Action } from "./actions"
import { Metadata } from "../store/store"

export function defineActions<S, A>(state: S, actions: A, metadata: Metadata<S>) {
    async function execute<P extends any[]>(name: string, action: Action<S, P>, ...args: P) {
        try {
            metadata.history.add({ ...state })
            await action(state, ...args)

            // suscriptions

            metadata.suscriptions.forEach(suscription => {
                const trigger = {
                    name,
                    metadata
                }

                const old = metadata.history[metadata.history.size - 1]
                suscription(trigger, [old, state])
            })
        }

        catch(err) {
            console.error(`[nuxel] '${name}' action produce error: ${err}`)
        }
    }

    const entries = Object
        .entries(actions)
        .map(function ([key, action]) {
            return [key, (...args: unknown[]) => execute(key, action, ...args)]
        })

    return Object.fromEntries(entries)
}