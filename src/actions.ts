import { Store } from "./nuxel"

type ActionParams = unknown[]

export type Action<S, P extends ActionParams> = (state: S, ...params: P) => Promise<void> | void

export interface OptionActions<S> {
    [name: string]: Action<S, unknown[]>;
}

export type StoreActions<S, A> = {
    [K in keyof A]: (...params: A[K] extends Action<S, infer P> ? P : never) => Promise<void> | void;
}

async function executeAction<S, P extends ActionParams>(store: Store<S>, name: string, action: Action<S, P>, params: P) {
    try {
        const old = Object.assign({}, store.state) as S

        await action(store.state as S, ...params)

        const context = {
            trigger: name,
            timestamp: Date.now(),
            state: {
                old: old,
                newest: Object.assign({}, store.state) as S
            },
        }

        store.history.push(context)
        store.suscriptions.forEach(suscription => suscription({ ...context, history: store.history }))
    }

    catch (err) {
        throw new Error(err)
    }
}

export function defineActions<S, A>(store: Store<S>, actions: A): StoreActions<S, A> {
    const entries = Object
        .entries(actions || {})
        .map(function (entry) {
            const action = entry[1] as Action<S, ActionParams>
            const name = entry[0]

            return [name, (...params: ActionParams) => executeAction(store, name, action, params)]
        })

    return Object.fromEntries(entries)
}