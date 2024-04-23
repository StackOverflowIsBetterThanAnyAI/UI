import { Icon } from '@/types/types'
import { FC } from 'react'
import Link from './Link'
import { useScreenWidth } from '@/hooks/useScreenWidth'

type FooterProps = {
    content: FooterColumnProps[]
    copyrightHolder: string
    footerLinks: FooterLinksProps[]
    logo?: Icon
    sponsors?: Icon[]
    theme?: 'blue' | 'red' | 'dark'
}

type FooterColumnProps = {
    header: string
    items: string[]
}

type FooterLinksProps = {
    title: string
    href: string
}

type SponsorProps = {
    logo: Icon
}

const PADDING = 'pb-4 px-4'

const Footer: FC<FooterProps> = ({
    content,
    copyrightHolder,
    footerLinks,
    logo,
    sponsors,
    theme = 'blue',
}) => {
    const screenWidth = useScreenWidth()

    return (
        <footer className="flex flex-col max-w-screen-lg">
            {logo ? (
                <div className={`mx-8 my-4 max-w-64 ${PADDING}`}>
                    <Link
                        icon={logo}
                        arialabel={logo.alt}
                        href={logo.href}
                        theme={theme}
                    />
                </div>
            ) : undefined}
            {screenWidth === 'DESKTOP' ? (
                <div className={`flex flex-row ${PADDING}`}>
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
            ) : undefined}
            {sponsors ? (
                <div>
                    <ul className={`flex justify-between flex-wrap ${PADDING}`}>
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
            <div>
                {screenWidth === 'DESKTOP' ? (
                    <ul
                        className={`flex justify-between flex-wrap gap-2 ${PADDING}`}
                    >
                        {footerLinks.map((link) => {
                            return (
                                <li key={link.href}>
                                    <Link href={link.href} theme={theme}>
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <ul
                        className={`flex justify-between flex-wrap gap-2 ${PADDING}`}
                    >
                        {footerLinks.map((link) => {
                            return (
                                <li key={link.href}>
                                    <Link href={link.href} theme={theme}>
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <Copyright copyrightHolder={copyrightHolder} />
        </footer>
    )
}

const FooterColumn: FC<
    FooterColumnProps & { theme: 'blue' | 'red' | 'dark' }
> = ({ header, items, theme }) => {
    const sortedItems = items.map((item) => {
        return (
            <li key={item} className="px-4 py-2">
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
        <div className="px-4 py-2">
            <Link
                href={logo.href}
                icon={{ src: logo.src, alt: logo.alt }}
                arialabel={logo.alt}
                theme={theme}
                background="light"
            />
        </div>
    )
}

const Copyright = ({ copyrightHolder }: { copyrightHolder: string }) => {
    const year = new Date().getFullYear()
    return (
        <div
            className={`font-light lg:text-base sm:text-sm text-xs ${PADDING}`}
        >{`Copyright ${String.fromCharCode(
            169
        )} ${year} ${copyrightHolder}. All Rights Reserved.`}</div>
    )
}

export default Footer
