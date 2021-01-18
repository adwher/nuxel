import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"
import inject from "rollup-plugin-inject-process-env"

export default [
    {
        input: "src/nuxel.ts",
    
        output: {
            name: "esm",
            file: "./dist/nuxel.esm.js",
            format: "esm",
        },
    
        plugins: [
            esbuild({
                minify: true,
                target: "es2017",
            }),
    
            resolve()
        ]
    },

    {
        input: "src/nuxel.ts",
    
        output: {
            name: "cjs",
            file: "./dist/nuxel.cjs.js",
            format: "cjs",
        },
    
        plugins: [
            esbuild({
                minify: true,
                target: "es2015",
            }),
    
            resolve()
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
            resolve({ browser: true  }),

            esbuild({
                minify: true,
                target: "es2015",
            }),

            inject({ NODE_ENV: "production" })
        ]
    }
]