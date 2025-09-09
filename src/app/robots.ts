import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/auth/verify',
          '/auth/verify-request'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/auth/verify',
          '/auth/verify-request'
        ],
      },
    ],
    sitemap: 'https://crittr.app/sitemap.xml',
    host: 'https://crittr.app',
  }
}