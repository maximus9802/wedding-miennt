import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lễ Thành Hôn | Xuân Phú & Nguyễn Miền",
  description: "Trân trọng kính mời bạn và gia đình tới tham dự lễ cưới chung vui cùng gia đình chúng tôi!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Lễ Thành Hôn | Xuân Phú & Nguyễn Miền",
    description: "Trân trọng kính mời bạn và gia đình tới tham dự lễ cưới chung vui cùng gia đình chúng tôi!",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Xuân Phú & Nguyễn Miền Wedding",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${montserrat.variable} ${dancingScript.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#EFE8E0] text-[#2E241E] font-sans selection:bg-[#B89673]/30 selection:text-[#4A3425]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
