export const circularArray = (arr: any[]) => {
    const _arr = [...arr]
    let index = 0

    const next = () => {
        return _arr[index++ % _arr.length]

    }

    return {
        next
    }
}