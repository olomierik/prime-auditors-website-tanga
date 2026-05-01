import { Inter, Montserrat, Open_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
});
const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
});

export const metadata = {
  title: "Prime Auditors | Strategic Accounting, Tax & Advisory in Tanzania",
  description: "Professional CPA firm in Tanzania offering auditing, tax advisory, business registration, and international investment consulting.",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${openSans.variable}`}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingContact />
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
