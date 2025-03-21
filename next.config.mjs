const CMS_URL =
	process.env.NODE_ENV !== "production"
		? `${process.env.NEXT_PUBLIC_CMS_PROTOCAL}://${process.env.NEXT_PUBLIC_CMS_DOMAIN}:${process.env.NEXT_PUBLIC_CMS_PORT}`
		: "http://cms:3001"
const ANALYTICS_URL = process.env.NEXT_PUBLIC_UMAMI_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// serverExternalPackages: ['graphql'],
	experimental: {
		// without this, 'Error: Expected Upload to be a GraphQL nullable type.'
		serverComponentsExternalPackages: ["graphql"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// async redirects() {
	//   // return [
	//   //   {
	//   //     source: '/juicy',
	//   //     destination: '/posts',
	//   //     permanent: true,
	//   //   },
	//   // ];
	//   // return [
	//   //   {
	//   //     source: '/',
	//   //     destination: '/home',
	//   //     permanent: true,
	//   //   },
	//   // ];
	// },
	//? https://nextjs.org/docs/pages/api-reference/config/next-config-js/rewrites
	async rewrites() {
		const beforeFiles = []
		const afterFiles = [
			// {
			// 	source: "/juicy",
			// 	destination: "/posts",
			// },
      //TODO back on
      // {
      // 	source: "/admin",
			// 	destination: `${CMS_URL}/`,
			// },
		]
		const fallback = [
      //! cannot make this work. check `keystone.ts`
			// {
			// 	source: "/admin",
			// 	destination: `${CMS_URL}/admin`,
			// },
			// {
			// 	source: "/admin/:admin*",
			// 	destination: `${CMS_URL}/admin/:admin*`,
			// },
			// {
			// 	source: "/admin/:path*",
			// 	destination: `${CMS_URL}/:path*`,
			// },
			...(ANALYTICS_URL
				? [{ source: "/stts/:match*", destination: ANALYTICS_URL }]
				: []),
		]

		return {
			beforeFiles,
			fallback,
			afterFiles,
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3001",
				pathname: "/assets/**",
			},
			{
				protocol: "http",
				hostname: "frostwifi.lan",
				port: "3001",
				pathname: "/assets/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/assets/**",
			},
			{
				protocol: "https",
				hostname: "cdn.dribbble.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dh5vxixzn/**",
			},
			{
				protocol: "https",
				hostname: "i.pinimg.com",
				port: "",
				pathname: "/originals/**",
			},
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
				port: "",
				pathname: "/photo/**",
			},
			{
				protocol: "https",
				hostname: "cloutdrive.williamusic.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "media.giphy.com",
				port: "",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "i.giphy.com",
				port: "",
				pathname: "/media/**",
			},
			{
				protocol: "https",
				hostname: "assets.nintendo.com",
				port: "",
				pathname: "/image/**",
			},
			{
				protocol: "https",
				hostname: "api.dicebear.com",
				port: "",
				pathname: "/9.x/**",
			},
		],
	},
}

export default nextConfig
