const { createStore } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("State", function() {
    const useStore = createStore({
        state: {
            counter: 0
        }
    })

    const { state } = useStore()

    test("got the initial state", function () {
        expect(state.counter).toBe(0)
    })

    test("try to mutate the state", function () {
        state.counter = 2
        expect(state.counter).toBe(0)
    })
})
