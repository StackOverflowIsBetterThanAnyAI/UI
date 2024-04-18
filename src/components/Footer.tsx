import { Icon } from '@/types/types'
import { FC } from 'react'
import Button from './Button'

type FooterColumnProps = {
    header: string
    items: string[]
}

type FooterProps = {
    content: FooterColumnProps[]
    logo?: Icon
}

const Footer: FC<FooterProps> = ({ content, logo }) => {
    return (
        <footer className="flex flex-col max-w-screen-lg">
            {logo ? (
                <Button
                    icon={logo}
                    arialabel={logo.alt}
                    href={logo.href}
                ></Button>
            ) : undefined}
            <div className="flex flex-row">
                {content.map((item) => {
                    return (
                        <FooterColumn header={item.header} items={item.items} />
                    )
                })}
            </div>
            <div>Sponsoren</div>
            <div>Impressum Datenschutzhinweise Nutzungsbedingungen</div>
            <div>Copyright</div>
        </footer>
    )
}

const FooterColumn: FC<FooterColumnProps> = ({ header, items }) => {
    const sortedItems = items.map((item) => {
        return (
            <li key={item}>
                <div>{item}</div>
            </li>
        )
    })

    return (
        <div>
            <div>{header}</div>
            <ul>{sortedItems}</ul>
        </div>
    )
}

export default Footer
