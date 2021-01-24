import { State } from "../store/store";

export type Getter<S, R = unknown> = (state: State<S>) => R

export type Getters<S> = {
    [name: string]: Getter<S>
}

export { defineGetters } from "./defineGetters"