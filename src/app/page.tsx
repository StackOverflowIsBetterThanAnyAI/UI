'use client'

import Accordion from '@/components/Accordion/Accordion'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full items-center justify-between font-mono text-sm lg:flex">
                <Accordion header="header 1">
                    Content of the Accordion 1
                </Accordion>
                <Accordion header="header 2" disabled>
                    Content of the Accordion 2
                </Accordion>
                <Accordion header="header 3">
                    Content of the Accordion 3
                </Accordion>
                <Accordion header="header 4">
                    A version with a huge amount of content of the Accordion 4
                    in order to simulate line wrapping.
                </Accordion>
                <Accordion header="header 5">Accordion 5</Accordion>
            </div>
        </main>
    )
}
