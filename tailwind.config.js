/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#2563EB', // Utilitarian engineer blue
				background: {
					light: '#F8FAFC', // Slate 50
					dark: '#0F172A', // Slate 900
				},
				surface: {
					light: '#FFFFFF',
					dark: '#1E293B',
				},
				border: {
					light: '#E2E8F0',
					dark: '#334155',
				},
				text: {
					light: '#0F172A',
					dark: '#F8FAFC',
					'secondary-light': '#475569',
					'secondary-dark': '#94A3B8',
				},
				grid: {
					light: '#E2E8F0',
					dark: '#334155',
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			backgroundImage: {
				'grid-light': "linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)",
				'grid-dark': "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
			},
			backdropBlur: {
				sm: '4px',
			},
		},
	},
	plugins: [],
}
