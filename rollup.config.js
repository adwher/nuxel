import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import declarate from "rollup-plugin-generate-declarations"

const EXTERNAL_DEPENDENCIES = ["@vue/reactivity", "object-hash"]
const IS_PRODUCTION = !process.env.ROLLUP_WATCH

export default [
    {
        input: "src/nuxel.ts",
    
        output: {
            file: "./dist/nuxel.esm.js",
            format: "esm",
        },

        external: EXTERNAL_DEPENDENCIES,
    
        plugins: [
            esbuild({
                minify: IS_PRODUCTION,
                target: "es2015",
            }),

            IS_PRODUCTION && declarate()
        ]
    },

    {
        input: "src/nuxel.ts",
    
        output: {
            file: "./dist/nuxel.cjs.js",
            format: "cjs",
        },

        external: EXTERNAL_DEPENDENCIES,
    
        plugins: [
            esbuild({
                minify: IS_PRODUCTION,
                target: "es2015",
            }),
        ]
    }
]