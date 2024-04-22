import { Icon } from '@/types/types'
import { FC } from 'react'
import Link from './Link'

type FooterColumnProps = {
    header: string
    items: string[]
}

type FooterProps = {
    content: FooterColumnProps[]
    copyrightHolder: string
    logo?: Icon
    sponsors?: Icon[]
    theme?: 'blue' | 'red' | 'dark'
}

type FooterLinksProps = {
    title: string
    href: string
}

type SponsorProps = {
    logo: Icon
}

const Footer: FC<FooterProps> = ({
    content,
    copyrightHolder,
    logo,
    sponsors,
    theme = 'blue',
}) => {
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
                {content.map((item) => {
                    return (
                        <FooterColumn
                            header={item.header}
                            items={item.items}
                            key={item.header}
                            theme={theme}
                        />
                    )
                })}
            </div>
            {sponsors ? (
                <div>
                    <ul className="flex justify-between flex-wrap">
                        {sponsors.map((sponsor) => {
                            return (
                                <li key={sponsor.href}>
                                    <Sponsors
                                        logo={sponsor}
                                        theme={theme}
                                        key={sponsor.href}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : undefined}
            <div>Impressum Datenschutzhinweise Nutzungsbedingungen</div>
            <Copyright copyrightHolder={copyrightHolder} />
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
            <div className="font-semibold text-center lg:text-xl sm:text-lg text-base">
                {header}
            </div>
            <ul>{sortedItems}</ul>
        </div>
    )
}

const Sponsors: FC<SponsorProps & { theme: 'blue' | 'red' | 'dark' }> = ({
    logo,
    theme,
}) => {
    return (
        <Link
            href={logo.href}
            icon={{ src: logo.src, alt: logo.alt }}
            arialabel={logo.alt}
            theme={theme}
        />
    )
}

const Copyright = ({ copyrightHolder }: { copyrightHolder: string }) => {
    const year = new Date().getFullYear()
    return (
        <div className="font-light lg:text-base sm:text-sm text-xs">{`Copyright ${String.fromCharCode(
            169
        )} ${year} ${copyrightHolder}. All Rights Reserved.`}</div>
    )
}

export default Footer
