export const uniqueID = (): string => {
    let returnedID = ''

    for (let i = 0; i < 16; i++) {
        returnedID += String.fromCharCode(Math.floor(Math.random() * 25) + 97)
    }

    return returnedID
}
