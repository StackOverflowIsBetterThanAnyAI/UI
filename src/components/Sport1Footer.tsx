import Footer from './Footer'

import starrzIcon from './../app/starzz.png'
import car4sportsIcon from './../app/car4sports.png'
import dsaIcon from './../app/dsa.png'
import footbaoIcon from './../app/footbao.png'
import clanqIcon from './../app/clanq.png'
import racematesIcon from './../app/racemates.png'
import sport1Icon from './../app/sport1.png'

const Sport1Footer = () => {
    return (
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
                    items: ['Facebook', 'Instagram', 'X', 'TikTok', 'YouTube'],
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
    )
}

export default Sport1Footer
