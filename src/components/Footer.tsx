import { Icon } from '@/types/types'
import { FC } from 'react'
import Link from './Link'

type FooterColumnProps = {
    header: string
    items: string[]
}

type FooterProps = {
    content: FooterColumnProps[]
    logo?: Icon
    theme: 'blue' | 'red' | 'dark'
}

const Footer: FC<FooterProps> = ({ content, logo, theme = 'blue' }) => {
    return (
        <footer className="flex flex-col max-w-screen-lg m-2">
            {logo ? (
                <div className="m-1">
                    <Link
                        icon={logo}
                        arialabel={logo.alt}
                        href={logo.href}
                        theme={theme}
                    ></Link>
                </div>
            ) : undefined}
            <div className="flex flex-row">
                {content.map((item, index) => {
                    return (
                        <FooterColumn
                            header={item.header}
                            items={item.items}
                            key={index}
                            theme={theme}
                        />
                    )
                })}
            </div>
            <div>Sponsoren</div>
            <div>Impressum Datenschutzhinweise Nutzungsbedingungen</div>
            <div>Copyright</div>
        </footer>
    )
}

const FooterColumn: FC<
    FooterColumnProps & { theme: 'blue' | 'red' | 'dark' }
> = ({ header, items, theme }) => {
    const sortedItems = items.map((item) => {
        return (
            <li key={item} className="m-1">
                <Link href={item} theme={theme}>
                    {item}
                </Link>
            </li>
        )
    })

    return (
        <div className="flex flex-col w-full text-center">
            <div className="text-center lg:text-xl sm:text-lg text-base">
                {header}
            </div>
            <ul>{sortedItems}</ul>
        </div>
    )
}

export default Footer
