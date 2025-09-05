import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: any }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* body vira o “root” do sticky-footer */}
      <body className={`${dmsans.className} bg-black text-white antialiased`}>
        <AuthDialogProvider>
          <SessionProviderComp session={session}>
            <ThemeProvider attribute="class" enableSystem defaultTheme="system">
              <Aoscompo>
                {/* STICKY-FOOTER: flex col + min-h-screen */}
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <NextTopLoader />

                  {/* O conteúdo cresce e empurra o footer */}
                  <main className="flex-1">
                    {children}
                  </main>

                  <Footer />
                </div>
              </Aoscompo>

              {/* Fora do fluxo principal (ok ser fixo/absoluto) */}
              <ScrollToTop />
            </ThemeProvider>
          </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
