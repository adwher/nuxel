import { StoreState } from "../store/store"

export type Getter<S, R = unknown> = (state: StoreState<S>) => R

export type Getters<S> = {
    [name: string]: Getter<S>
}

export { defineGetters } from "./defineGetters"