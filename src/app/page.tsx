'use client'

import Footer from '@/components/Footer'

import starrzIcon from './starzz.png'
import car4sportsIcon from './car4sports.png'
import dsaIcon from './dsa.png'
import footbaoIcon from './footbao.png'
import clanqIcon from './clanq.png'
import racematesIcon from './racemates.png'
import sport1Icon from './sport1.png'

export default function Home() {
    return (
        <>
            <main className="flex flex-col items-center p-24 bg-red-300 max-w-screen-lg w-full m-auto min-h-96 min-w-64"></main>
            <Footer
                logo={{
                    src: sport1Icon,
                    alt: 'Zur Startseite',
                    href: '#',
                }}
                theme="yellow"
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
                    { href: 'Impressum', title: 'Impressum' },
                    {
                        href: 'Datenschuthinweise',
                        title: 'Datenschutzhinweise',
                    },
                    {
                        href: 'Datenschutzeinstellungen',
                        title: 'Datenschutzeinstellungen',
                    },
                    {
                        href: 'Nutzungsbedingungen',
                        title: 'Nutzungsbedingungen',
                    },
                    {
                        href: 'Nutzung-mit-Werbung-beenden',
                        title: 'Nutzung mit Werbung beenden',
                    },
                ]}
            />
        </>
    )
}
