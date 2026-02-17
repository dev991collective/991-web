import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import "./globals.css";

const dmsans = DM_Sans({ subsets: ["latin"] });

function getMetadataBase() {
  const fallback = "https://991collective.com";
  const source = process.env.NEXT_PUBLIC_SITE_URL || fallback;

  try {
    return new URL(source);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "991Collective",
    template: "%s | 991Collective",
  },
  description: "Independent multigenre record label based in Sao Paulo, Brazil.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmsans.className} bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Aoscompo>
            <div className="flex min-h-screen flex-col">
              <Header />
              <NextTopLoader />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
