const { createStore } = require("../dist/nuxel.umd.js")

// test

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
})

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
