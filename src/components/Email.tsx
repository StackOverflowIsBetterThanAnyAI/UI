import { FC } from 'react'
import Button from './Button'
import { StringNumber } from '@/types/types'
import emailIcon from './../app/email.png'

type EmailProps = {
    emailAdress: string
    recipient: string
    children: StringNumber
    disabled?: boolean
    theme?: 'blue' | 'red' | 'dark'
}

const Email: FC<EmailProps> = ({
    children,
    disabled = false,
    emailAdress,
    recipient,
    theme = 'dark',
}) => {
    const accessibleText = `Send an email to ${recipient}`
    return (
        <Button
            href={`mailto:${emailAdress}`}
            disabled={disabled}
            arialabel={accessibleText}
            icon={{
                src: emailIcon,
                alt: accessibleText,
            }}
            theme={theme}
        >
            {children}
        </Button>
    )
}

export default Email
