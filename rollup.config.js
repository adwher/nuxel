import esbuild from "rollup-plugin-esbuild"
import resolve from "@rollup/plugin-node-resolve"

export default {
    input: "src/main.ts",

    output: [
        {
            name: "umd",
            file: "dist/nuxel.umd.js",
            format: "umd",
            globals: ["vue"]
        },

        {
            name: "esm",
            file: "dist/nuxel.esm.js",
            format: "esm",
        },
    ],

    plugins: [
        esbuild({
            minify: false,
            target: "es2015",
            sourceMap: true
        }),

        resolve()
    ]
}