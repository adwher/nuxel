import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"

const EXTERNAL_DEPENDENCIES = ["@vue/reactivity"]
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
            })
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
    },

    {
        input: "src/nuxel.ts",
    
        output: {
            name: "nuxel",
            file: "./dist/nuxel.iife.js",
            format: "iife"
        },
    
        plugins: [
            resolve({ browser: true, dedupe: EXTERNAL_DEPENDENCIES }),

            esbuild({
                minify: IS_PRODUCTION,
                target: "es2015",
                minifyIdentifiers: true,
            }),

            replace({
                preventAssignment: true,
                values: {
                    "process.env.NODE_ENV": JSON.stringify("production")
                }
            })
        ]
    }
]