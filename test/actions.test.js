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

    const { state, actions, reset } = useStore()

    test("expect every action", function () {
        expect(actions.increment).toBeInstanceOf(Function)
        expect(actions.decrement).toBeInstanceOf(Function)
    })

    test("increment by 1", function () {
        actions.increment(1)
        expect(state.counter).toBe(1)
    })

    test("increment by 10", function () {
        actions.increment(10)
        expect(state.counter).toBe(11)
    })

    test("decrement by 1", function() {
        actions.decrement(1)
        expect(state.counter).toBe(10)
    })

    test("reset the state", function() {
        reset()
        expect(state.counter).toBe(0)
    })
})