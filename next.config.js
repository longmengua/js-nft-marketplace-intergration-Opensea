/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'openseauserdata.com',
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
    ]
  }
}
