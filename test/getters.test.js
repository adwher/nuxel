const { createStore } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("Getters", function() {
    const useStore = createStore({
        state: {
            counter: 0
        },
    
        actions: {
            increment(state, by = 1) {
                state.counter += by
            }
        },

        getters: {
            counter(state) {
                return "Counter: " + state.counter
            }
        }
    })

    const { getters, actions } = useStore()

    test("expect getters are defined", function () {
        expect(getters.counter).toBeDefined()
    })

    test("increment", function (done) {
        actions.increment(1)
        expect(getters.counter).toBe("Counter: 1")

        actions.increment(10)
        expect(getters.counter).toBe("Counter: 11")

        done()
    })
})