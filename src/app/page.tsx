'use client'

import Button from '@/components/Button'

import starImage from './star.png'
import { Email } from '@/components/Email'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <Button lang="de" onClick={() => console.log('')}>
                    {187}
                </Button>
                <Button lang="de" onClick={() => console.log('')} disabled>
                    {187}
                </Button>
                <Button
                    lang="de"
                    onClick={() => console.log('')}
                    theme="red"
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                />
                <Button
                    lang="de"
                    onClick={() => console.log('')}
                    theme="red"
                    disabled
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                />
                <Button
                    onClick={() => console.log('')}
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                >
                    Hello World Image
                </Button>
                <Button
                    onClick={() => console.log('')}
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                    disabled
                >
                    Hello World With An Image
                </Button>
            </div>
            <div>
                <Button
                    lang="de"
                    onClick={() => console.log('')}
                    href="#header1"
                >
                    {187}
                </Button>
                <Button
                    lang="de"
                    onClick={() => console.log('')}
                    disabled
                    href="#header1"
                >
                    {187}
                </Button>
                <Button
                    lang="de"
                    theme="red"
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                    href="#header2"
                />
                <Button
                    lang="de"
                    theme="red"
                    disabled
                    ariaLable="Hello World"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                    href="#header2"
                />
                <Button
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                    href="#header3"
                >
                    Hello World With An Image
                </Button>
                <Button
                    theme="dark"
                    ariaLable="Hello Michael"
                    icon={{
                        src: starImage,
                        alt: 'a happy star which is smiling at you',
                    }}
                    disabled
                    href="#header3"
                >
                    Hello World Image
                </Button>
            </div>
            <div>
                <Email
                    emailAdress="michael.muenzenhofer@gmail.com"
                    recipient="Michael Münzenhofer"
                    theme="dark"
                >
                    Michael Münzenhofer
                </Email>
                <Email
                    emailAdress="michael.muenzenhofer@gmail.com"
                    recipient="Michael Münzenhofer"
                    theme="dark"
                    disabled
                >
                    Michael Münzenhofer
                </Email>
            </div>
        </main>
    )
}
