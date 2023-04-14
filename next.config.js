/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/pokemons",
        destination: "/pokemons/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
