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
            .map(([key, value]) => {
                const isObject = typeof value === "object" && !Array.isArray(value)
                return isObject ? [toArrayNotation(value)] : key
            })
    }

    return encryptData(toArrayNotation(data))
}