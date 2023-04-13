function leftPad(v: number): string {
    if (v >= 10) {
        return v.toString()
    }

    return `0${v}`
}

export function toStringByFormatting(source: Date, delimiter = '-'): string {
    const year = source.getFullYear()
    const month = leftPad(source.getMonth() + 1)
    const day = leftPad(source.getDate())

    return [year, month, day].join(delimiter)
}