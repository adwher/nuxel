# nuxel

```tss
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