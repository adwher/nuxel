const { createStore } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("Actions", function() {
    const useStore = createStore({
        state: {
            counter: 0
        },
    
        actions: {
            increment(state, by = 1) {
                state.counter += by
            },
    
            decrement(state, by = 1) {
                state.counter -= by
            }
        }
    })

    const { counter, increment, decrement } = useStore()

    test("expect every action", function () {
        expect(increment).toBeInstanceOf(Function)
        expect(decrement).toBeInstanceOf(Function)
    })

    test("increment by 1", function () {
        increment(1)
        expect(counter.value).toBe(1)
    })

    test("increment by 10", function () {
        increment(10)
        expect(counter.value).toBe(11)
    })

    test("decrement by 1", function() {
        decrement(1)
        expect(counter.value).toBe(10)
    })
})