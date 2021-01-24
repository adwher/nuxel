import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"
import inject from "rollup-plugin-inject-process-env"

const EXTERNAL_DEPENDENCIES = ["vue", "@vue/reactivity"]
const IS_PRODUCTION = !process.env.ROLLUP_WATCH

export default [
    {
        input: "src/nuxel.ts",
    
        output: {
            name: "esm",
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
            name: "cjs",
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
            resolve({ browser: true }),

            esbuild({
                minify: IS_PRODUCTION,
                target: "es2015",
            }),

            inject({ NODE_ENV: "production" })
        ]
    }
]