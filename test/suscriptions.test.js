const { createStore } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("Suscriptions", function() {
    const useStore = createStore({
        state: {
            counter: 0
        },
    
        actions: {
            increment(state, by = 1) {
                state.counter += by
            },
        }
    })
    
    const { state, actions, suscribe } = useStore()

    test("suscribe to store", function (done) {
        suscribe(function (trigger) {
            expect(state.counter).toBe(1)
            expect(trigger.type).toBe("increment")

            done()
        })

        actions.increment()
    })
})