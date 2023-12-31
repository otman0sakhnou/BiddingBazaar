import "./globals.css";
import NavBar from "./nav/NavBar";
import ToasProviders from "./providers/ToastProviders";

export const metadata = {
  title: "BiddingBazaar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasProviders/>
        <NavBar />
       <main className="container mx-auto px-5 pt-10">
       {children}
       </main>
      </body>
    </html>
  );
}
