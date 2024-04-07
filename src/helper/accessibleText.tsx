import { StringNumberJSX } from '@/types/StringNumberJSX'
import { Children, isValidElement } from 'react'

export const accessibleText = (textElement: StringNumberJSX) => {
    if (typeof textElement === 'string') return textElement
    if (typeof textElement === 'number') return textElement.toString()

    let x = extractTextFromJSXElement(textElement)

    console.log(x, 'ariaLabel')

    return x
}

const extractTextFromJSXElement = (textElement: JSX.Element): string => {
    const children = Children.toArray(textElement.props.children)
    return children
        .map((child) => {
            if (isValidElement(child)) {
                return extractTextFromJSXElement(child)
            } else {
                return String(child)
            }
        })
        .join('')
}
