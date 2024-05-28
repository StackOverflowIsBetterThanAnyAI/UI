export const formatURL = (url: string) => {
    return url.toLowerCase().split(' ').join('-').replace('+', 'plus')
}
