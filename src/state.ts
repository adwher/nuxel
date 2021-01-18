import { Ref, UnwrapRef } from "vue"

export type State<S> = Ref<S> | UnwrapRef<S> | Object