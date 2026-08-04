import "./globals.css";

export const metadata = {
  title: "Rodrigo Arellano — Portfolio",
  description: "3D interactive portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
