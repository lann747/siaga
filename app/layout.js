import "./globals.css";
import { Sora, Public_Sans } from "next/font/google";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Siaga - Asisten AI Kesiapsiagaan Bencana",
  description:
    "Pantau gempa terbaru dari BMKG dan buat rencana evakuasi keluarga yang dipersonalisasi dengan AI.",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
