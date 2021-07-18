const { createStore, createLogger, createPersistence } = require("../dist/nuxel.cjs.js")
const { test, expect, describe } = require("@jest/globals")

describe("Defined", function () {
    test("expect 'createStore' to be defined", function () {
        expect(createStore).toBeInstanceOf(Function)
    })

    test("expect 'createStore' throw error when state are not a object", function (done) {
        expect(() => createStore()).toThrow()
        expect(() => createStore({})).toThrow()
        expect(() => createStore({ state: "" })).toThrow()

        done()
    })

    // PLUGINS

    test("expect 'createLogger' to be defined", function () {
        expect(createLogger).toBeInstanceOf(Function)
    })

    test("expect 'createPersistence' to be defined", function () {
        expect(createPersistence).toBeInstanceOf(Function)
    })
})