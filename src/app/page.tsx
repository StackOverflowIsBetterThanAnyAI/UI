'use client'

import Accordion from '@/components/Accordion/Accordion'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full items-top justify-between font-sans text-sm lg:flex flex-wrap">
                <Accordion header="Header 1">
                    Content of the Accordion 1
                </Accordion>
                <Accordion header="Header 2" disabled startExpanded>
                    Content of the Accordion 2
                </Accordion>
                <Accordion header="Header 3">
                    Content of the Accordion 3
                </Accordion>
                <Accordion header="Header 4">
                    Content of the Accordion 4
                </Accordion>
            </div>
        </main>
    )
}
