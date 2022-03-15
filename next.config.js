/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/tasks',
				permanent: true,
			},
		]
	},

}

module.exports = nextConfig
