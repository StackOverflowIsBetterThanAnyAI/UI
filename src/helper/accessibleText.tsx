import { StringNumber } from '@/types/types'

export const accessibleText = (element: StringNumber, disabled: boolean) => {
    if (typeof element === 'number')
        return disabled ? `${element.toString()}. disabled` : element.toString()
    return disabled ? `${element}. disabled` : element
}
