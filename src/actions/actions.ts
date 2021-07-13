export type Action<S, P extends unknown[] = any[]> = (state: S, ...args: P) => Promise<void> | void

export type Actions<S> = {
    [name: string]: Action<S>
}

export { defineActions } from "./defineActions"