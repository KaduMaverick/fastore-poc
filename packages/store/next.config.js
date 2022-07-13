const withTM =  require('next-transpile-modules')(['graphql-pvst']);

/** @type {import('next').NextConfig} */

const pseudoLocales = ['en', 'se']


const nextConfig = {
  publicRuntimeConfig: {
    pseudoLocales
  },
  i18n: {
    // providing the locales supported by your application
   locales: ["en-US", "fr-CA"],
   //  default locale used when the non-locale paths are visited
   defaultLocale: "en-US",
   localeDetection: false,
 },
 domains: [
  {
    domain: 'en.localhost',
    defaultLocale: "en-US",
    http: true
  },
  {
    domain: 'fastore-poc.vercel.app',
    defaultLocale: "fr-CA"
  },
  
]
}
module.exports = withTM(nextConfig);

