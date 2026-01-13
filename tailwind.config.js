/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#3B82F6', // Royal Blue for visibility in Dark Mode
				background: {
					light: '#F5F5F5', // Keep existing light gray
					dark: '#1A1A1A', // Deep Charcoal
				},
				surface: {
					light: '#FFFFFF',
					dark: '#222222', // Slightly lighter charcoal
				},
				border: {
					light: '#d4d4d4',
					dark: '#333333', // Subtle grey border
				},
				text: {
					light: '#171717',
					dark: '#E0E0E0', // Soft off-white
					'secondary-light': '#475569',
					'secondary-dark': '#A3A3A3',
				},
				grid: {
					light: '#E2E8F0',
					dark: '#333333',
				}
			},
			borderRadius: {
				DEFAULT: "2px", // Utilitarian slight round
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
