import { State } from "../store/store"

export type Action<S, P extends any[] = any[]> = (state: State<S>, ...args: P) => Promise<void> | void

export type Actions<S> = {
    [name: string]: Action<S>
}

export { defineActions } from "./defineActions"