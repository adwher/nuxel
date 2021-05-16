export type Getter<S, R = unknown> = (state: S) => R

export type Getters<S> = {
    [name: string]: Getter<S>
}

export { defineGetters } from "./defineGetters"