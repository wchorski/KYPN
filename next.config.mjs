export default {
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
}
