import { UnwrapRef } from "vue"

export type State<S> = S | UnwrapRef<S>