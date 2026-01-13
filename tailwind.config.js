/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#1A237E', // Deep Navy Blue for accent
				background: {
					light: '#F5F5F5',
					dark: '#0D0D15', // Deep utilitarian dark
				},
				border: {
					light: '#D4D4D4',
					dark: '#334155',
				},
				text: {
					light: '#111111',
					dark: '#E0E0E0',
				},
				grid: {
					light: '#E0E0E0',
					dark: '#1F1F28',
				}
			},
			fontFamily: {
				display: ['JetBrains Mono', 'monospace'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			backgroundImage: {
				'grid-pattern-light': "linear-gradient(to right, #E0E0E0 1px, transparent 1px), linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)",
				'grid-pattern-dark': "linear-gradient(to right, #1F1F28 1px, transparent 1px), linear-gradient(to bottom, #1F1F28 1px, transparent 1px)",
			},
			backgroundSize: {
				'grid-pattern': '40px 40px',
			},
			backdropBlur: {
				sm: '4px',
			},
		},
	},
	plugins: [],
}
