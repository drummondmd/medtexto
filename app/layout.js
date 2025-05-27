import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata = {
  title: "MedTexto",
  description: "Facilitando o dia a dia do Médico e do estudante de Medicina.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="pt-br">
        <body>{children}</body>
      </html>



    </>

  );
}
