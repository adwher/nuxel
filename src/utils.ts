export function encryptData(data: any) {
    const text = JSON.stringify(data)
    return btoa(text)
}

export function decryptData(data: string) {
    return JSON.parse(atob(data))
}

export function createHashNotion(data: object) {
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

    return createHash({ key: toArrayNotation(data) })
}

export function createHash(data: object) {
    const sign = JSON.stringify(data)
    return btoa(sign)
}