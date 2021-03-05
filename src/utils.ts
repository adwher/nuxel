export function encryptData(data: object) {
    const text = JSON.stringify(data)
    return btoa(text)
}

export function decryptData(data: string) {
    return JSON.parse(atob(data))
}

export function createHashMark(data: object) {
    function toArrayNotation(data: object) {
        return Object
            .entries(data)
            .reduce<string>(
                function (text, [key, value]) {
                    const isObject = typeof value === "object" && !Array.isArray(value)
                    return text += isObject ? `${key}: { ${toArrayNotation(value)} }` : `${key} `
                },

                ""
            )
            .trimEnd()
    }

    return encryptData(toArrayNotation(data))
}