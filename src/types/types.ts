import { StaticImageData } from 'next/image'

export type StringNumberJSX = string | number | JSX.Element
export type StringNumber = string | number
export type Icon = {
    src: StaticImageData
    alt: string
    href: string
}
