export const getNRandomsFromArray = (n: number) => (array: any[]) => {
    return Array.from({ length: n }, () => array[Math.floor(Math.random() * array.length)])
}

export const tail = (arr: any[]) => {
    const _arr = [...arr]
    return _arr[_arr.length - 1]
}

export const head = (arr: any[]) => {
    const _arr = [...arr]
    return _arr[0]
}