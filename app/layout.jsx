import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Providers from '../src/components/Providers';
import '../src/index.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://onrylmz.net'),
  title: 'ONRYLMZ | Ankara CNC & Lazer Kesim',
  description:
    "ONRYLMZ Ankara CNC kesim, lazer kesim, gravur ve ozel ahsap uretim. Dosyanizi veya olculerinizi gonderin, hizli teklif alin.",
  keywords: [
    'ONRYLMZ',
    'Ankara CNC',
    'CNC kesim',
    'lazer kesim',
    'ahsap uretim',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://onrylmz.net/',
    title: 'ONRYLMZ | Ankara CNC & Lazer Kesim',
    description:
      'CNC kesim, lazer kesim, gravur ve ozel ahsap uretim. Dosya veya olcu gonderin, hizli teklif alin.',
    images: ['/og-onrylmz.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONRYLMZ | Ankara CNC & Lazer Kesim',
    description:
      'CNC kesim, lazer kesim, gravur ve ozel ahsap uretim. Dosya veya olcu gonderin, hizli teklif alin.',
    images: ['/og-onrylmz.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-X7T2YF5GNV" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-X7T2YF5GNV', { send_page_view: false });`}
        </Script>

        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

