'use client'

import Toggle from '@/components/Toggle'
import Footer from '@/components/Footer'

import emailIcon from './email.png'
import starrzIcon from './starzz.png'
import car4sportsIcon from './car4sports.png'
import dsaIcon from './dsa.png'
import footbaoIcon from './footbao.png'
import clanqIcon from './clanq.png'
import racematesIcon from './racemates.png'
import sport1Icon from './sport1.png'

import Link from '@/components/Link'

export default function Home() {
    return (
        <>
            <main className="flex flex-col items-center p-24 bg-red-300 max-w-screen-lg w-full m-auto">
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
                <Toggle textOff="OFF" textOn="ON" arialabel="light switch" />
                <Link
                    href="#"
                    icon={{ src: emailIcon, alt: 'email' }}
                    arialabel="email"
                    theme="red"
                ></Link>
            </main>
            <Footer
                logo={{
                    src: sport1Icon,
                    alt: 'Zur Startseite',
                    href: '#',
                }}
                theme="red"
                copyrightHolder="Sport1 GmbH"
                content={[
                    {
                        header: 'Sportarten',
                        items: [
                            'Fußball',
                            'Motorsport',
                            'Darts',
                            'US-Sport',
                            'Olympia',
                        ],
                    },
                    {
                        header: 'Social Media',
                        items: [
                            'Facebook',
                            'Instagram',
                            'X',
                            'TikTok',
                            'YouTube',
                        ],
                    },
                    {
                        header: 'Video',
                        items: [
                            'Mediathek',
                            'Livestream',
                            'Podcasts',
                            'Doppelpass',
                        ],
                    },
                    {
                        header: 'Service',
                        items: [
                            'News-App',
                            'Liveticker',
                            'eSPORTS1',
                            'Sport1+',
                            'Sport1 Darts',
                        ],
                    },
                    {
                        header: 'Mehr',
                        items: [
                            'TV-Programm',
                            'Sportquiz',
                            'Tippspiel',
                            'Sportwetten',
                            'Sport1 Akademie',
                        ],
                    },
                    {
                        header: 'Über uns',
                        items: [
                            'Unternehmen',
                            'Karriere',
                            'Kontakt',
                            'Presse',
                            'Sport1 Business',
                        ],
                    },
                ]}
                sponsors={[
                    {
                        src: starrzIcon,
                        alt: 'starrz',
                        href: 'https://starzz.eu/',
                        background: 'light',
                    },
                    {
                        src: car4sportsIcon,
                        alt: 'Car4Sports',
                        href: 'https://car4sports.de/',
                        background: 'light',
                    },
                    {
                        src: dsaIcon,
                        alt: 'Deutsche Streaming Allianz',
                        href: 'https://deutsche-streaming-allianz.com/',
                        background: 'none',
                    },
                    {
                        src: footbaoIcon,
                        alt: 'footbao',
                        href: 'https://play.google.com/store/apps/details?id=world.footbao.footbao&gl=DE',
                        background: 'light',
                    },
                    {
                        src: clanqIcon,
                        alt: 'Clanq',
                        href: 'https://www.clanq.de/',
                        background: 'light',
                    },
                    {
                        src: racematesIcon,
                        alt: 'Racemates',
                        href: 'https://racemates-nft.com/',
                        background: 'none',
                    },
                ]}
                footerLinks={[
                    { href: '#', title: 'Impressum' },
                    { href: '#', title: 'Datenschutzhinweise' },
                    { href: '#', title: 'Datenschutzeinstellungen' },
                    { href: '#', title: 'Nutzungsbedingungen' },
                    { href: '#', title: 'Nutzung mit Werbung beenden' },
                ]}
            />
        </>
    )
}
