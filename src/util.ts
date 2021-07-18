export function encryptData(data: object) {
    const text = JSON.stringify(data)
    return btoa(text)
}

export function decryptData(data: string) {
    return JSON.parse(atob(data))
}

function formatNumber(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })

    return formatter.format(value)
}

export function obtainTime(timestamp = Date.now()) {
    const date = new Date(timestamp)

    const hours = formatNumber(date.getHours())
    const minutes = formatNumber(date.getMinutes())
    const seconds = formatNumber(date.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}