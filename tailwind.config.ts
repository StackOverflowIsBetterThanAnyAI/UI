import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                red: {
                    1000: '#ab1717',
                    1100: '#981616',
                    1200: '#851414',
                },
                stone: {
                    350: '#c1bfbd',
                    450: '#96908d',
                },
                cyan: {
                    250: '#9bf3fd',
                    450: '#1fc2db',
                },
            },
        },
    },
    plugins: [],
}
export default config
