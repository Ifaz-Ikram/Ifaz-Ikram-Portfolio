/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)', // Adjusted Navy/Blue for visibility due to dynamic switching
				background: {
					light: '#FFFFFF',
					dark: '#1A1A1A', // Deep Charcoal
				},
				surface: {
					light: '#F9FAFB',
					dark: '#222222', // Slightly lighter charcoal for cards
				},
				border: {
					light: '#E5E7EB',
					dark: '#333333', // Subtle grey border
				},
				text: {
					light: '#111827',
					dark: '#E0E0E0', // Soft off-white
					'secondary-light': '#4B5563',
					'secondary-dark': '#A3A3A3',
				},
				grid: {
					light: '#E2E8F0',
					dark: 'rgba(255,255,255,0.05)',
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
				'grid-dark': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
			},
			backdropBlur: {
				sm: '4px',
			},
		},
	},
	plugins: [],
}
