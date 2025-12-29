import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "MedTexto",
  description:
    "Facilitando o dia a dia do Médico e do estudante de Medicina. Presença de calculadoras médicas, bloco de resumos, bloco de notas temporario e a nossa função de criar e transformar receita em texto e vice-versa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" data-scroll-behavior="smooth">
      <body className="">
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
