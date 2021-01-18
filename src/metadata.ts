import { Actions } from "./actions"
import { Getters } from "./getters"
import { Plugin } from "./plugins"
import { State } from "./state"
import { Suscribe } from "./suscriptions"

export interface Metadata<S extends {}, A extends Actions<S>, G extends Getters<S>> {
    history: Set<State<S>>,
    suscriptions: Set<Suscribe<S, A, G>>,
    plugins: Set<Plugin<S, A, G>>
}