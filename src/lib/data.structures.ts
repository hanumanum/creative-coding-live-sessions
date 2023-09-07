export const circularArray = (arr: any[]) => {
    let index = 0
    const _arr = [...arr]

    const next = () => {
        index = (index === arr.length - 1) ? 0 : index + 1
        return same()
    }

    const same = () => {
        return _arr[index]
    }

    return {
        next,
        same
    }
}