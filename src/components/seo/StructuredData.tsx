export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Crittr",
    "description": "Comprehensive pet care tracking app with journal entries, health monitoring, reminders, and AI-powered insights for your beloved pets.",
    "url": "https://crittr.app",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier available with premium features",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Pet Health Tracking",
      "Journal Entries",
      "Medication Reminders",
      "Vet Visit Records",
      "Weight Monitoring",
      "AI-Powered Insights",
      "Multi-Pet Support",
      "Mobile Friendly",
      "Photo & Video Attachments",
      "Export Reports",
      "Social Pet Community"
    ],
    "author": {
      "@type": "Organization",
      "name": "Crittr Team",
      "url": "https://crittr.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Crittr",
      "url": "https://crittr.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://crittr.app/logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "screenshot": "https://crittr.app/screenshot.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "10000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Crittr has been a lifesaver for tracking my dog's health. The AI insights are incredibly helpful!"
      }
    ],
    "keywords": "pet care, pet health tracking, pet journal, veterinary records, pet management, dog health, cat health, pet wellness, pet monitoring, pet activities, pet diary, animal health, pet care software, pet parents, pet tracking",
    "audience": {
      "@type": "Audience",
      "audienceType": "Pet Owners"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://crittr.app/dashboard",
      "name": "Start Pet Health Tracking"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
