export const circularArray = (arr: any[]) => {
    let index = 0
    const _arr = [...arr]

    const next = () => {
        let value = null
        if (index === arr.length - 1) {
            value = _arr[index]
            index = 0
        }
        else {
            value = _arr[index]
            index++
        }
        return value
    }

    const same = () => {
        return _arr[index]
    }

    return {
        next,
        same,
        length: _arr.length
    }
}