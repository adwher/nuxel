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
                    return text += `${key} `
                },

                ""
            )
            .trimEnd()
    }

    return encryptData({ key: toArrayNotation(data) })
}