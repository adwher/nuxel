# Nuxel

Nuxel is a state managment library based on [Vue 3](https://v3.vuejs.org) and the Composition API. It serves a centralized stores than you can use in web applications.

> **HANDS UP!** We are under development yet

## Documentation

> Not ready yet

```ts
import { createStore } from "nuxel"

const useStore = createStore({
    state: {
        counter: 0
    },

    actions: {
        increment(state, by: number = 1) {
            state.counter += by
        }
    }
})

export default useStore
```

Code by [@adwher](https://github.com/adwher)
