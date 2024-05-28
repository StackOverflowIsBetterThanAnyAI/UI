import Link from '@/components/Link'
import Sport1Footer from '@/components/Sport1Footer'

const NotFound = () => {
    return (
        <>
            <main className="flex flex-col items-center gap-4 p-8 max-w-screen-lg w-full m-auto min-h-96 min-w-64">
                <h2 className="sm:text-9xl text-7xl font-bold">404</h2>
                <h3 className="lg:text-lg sm:text-base text-sm">
                    We can't find anything on this topic :/
                </h3>
                <Link href="/" theme="yellow">
                    Back to the Homepage
                </Link>
            </main>
            <Sport1Footer />
        </>
    )
}

export default NotFound
