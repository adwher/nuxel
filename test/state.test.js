const { createStore } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("State", function() {
    const useStore = createStore({
        state: {
            counter: 0
        }
    })

    const { counter } = useStore()

    test("got the initial state", function () {
        expect(counter.value).toBe(0)
    })
})
