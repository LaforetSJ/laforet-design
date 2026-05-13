import type { Metadata } from 'next'
import { Noto_Sans_KR, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700']
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700']
});

const SITE_URL = "https://laforetdesign.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "라포레디자인 | 용인 수지 프리미엄 인테리어",
    template: "%s | 라포레디자인",
  },
  description: "경기도 용인 수지구 전문 인테리어 업체 라포레디자인. 아파트, 빌라, 상업공간 인테리어 시공. 합리적인 견적, 꼼꼼한 마감, 신뢰할 수 있는 시공. 지금 바로 무료 견적 문의하세요.",
  keywords: [
    "라포레디자인", "라포레 인테리어", "라포레",
    "용인 인테리어", "수지 인테리어", "용인 수지 인테리어",
    "경기도 인테리어", "아파트 인테리어", "인테리어",
    "인테리어 시공", "인테리어 업체", "인테리어 견적",
    "라포레디자인 용인", "수지구 인테리어",
    "La Foret Design", "laforetdesign"
  ],
  authors: [{ name: "라포레디자인" }],
  creator: "라포레디자인",
  publisher: "라포레디자인",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "라포레디자인",
    title: "라포레디자인 | 용인 수지 프리미엄 인테리어",
    description: "경기도 용인 수지구 전문 인테리어 업체. 아파트, 빌라, 상업공간 시공 전문. 지금 바로 무료 견적 문의하세요.",
    images: [{ url: "/laforet-logo.jpg", width: 800, height: 600, alt: "라포레디자인 로고" }],
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "t8ecBgXvE9WVeNh1NCA6WGZAHattabvSkol3o2rKiMw",
    other: {
      "naver-site-verification": "1dae2e0a313c036b18fc07bd750e35da24753f39",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${playfairDisplay.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "라포레디자인",
              alternateName: "La Forêt Design",
              url: "https://laforetdesign.vercel.app",
              telephone: ["010-8587-9987"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "수풍로 53 상가동 1층",
                addressLocality: "용인시 수지구",
                addressRegion: "경기도",
                addressCountry: "KR",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
              ],
              sameAs: ["https://blog.naver.com/laforetdesign"],
              description: "경기도 용인 수지구 전문 인테리어 업체. 아파트, 빌라, 상업공간 인테리어 시공 전문.",
            }),
          }}
        />
      </body>
    </html>
  )
}
