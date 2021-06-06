# Nuxel

Nuxel is a state managment library based on [Vue 3](https://v3.vuejs.org) and the Composition API. It serves a centralized stores than you can use in web applications.

## An example

Suppose you're creating a counter app, and your store looks like this:

```ts
import { createStore } from "nuxel"

export const useCounter = createStore({
    state: {
        counter: 0
    },

    actions: {
        increment(state, by: number = 1) {
            state.counter += by
        }
    }
})
```

And then you can put all the `useCounter` API [provided](https://github.com/adwher/nuxel/wiki/API#usage) by `nuxel`. Read more at the [`wiki`](https://github.com/adwher/nuxel/wiki) section at the repo.

## Feedback

Issues and pull requests are welcome.