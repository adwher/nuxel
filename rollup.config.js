import esbuild from "rollup-plugin-esbuild"
import declarate from "rollup-plugin-generate-declarations"

import pkg from "./package.json"

const EXTERNAL_DEPENDENCIES = ["@vue/reactivity", "lodash"]
const IS_PRODUCTION = !process.env.ROLLUP_WATCH

export default {
    input: "src/nuxel.ts",

    output: [
        {
            file: pkg.module,
            format: "esm",
        },

        {
            file: pkg.main,
            format: "cjs",
        }
    ],

    external: EXTERNAL_DEPENDENCIES,

    plugins: [
        esbuild({
            minify: IS_PRODUCTION,
            target: "es2015",
        }),

        declarate(),
    ]
}