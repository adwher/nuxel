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
            count(state) {
                return "Counter: " + state.counter
            }
        }
    })

    const { count, increment } = useStore()

    test("expect getters are defined", function () {
        expect(count.value).toBeDefined()
    })

    test("increment", function (done) {
        increment(1)
        expect(count.value).toBe("Counter: 1")

        increment(10)
        expect(count.value).toBe("Counter: 11")

        done()
    })
})