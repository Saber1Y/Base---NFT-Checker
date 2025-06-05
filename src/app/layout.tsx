// app/layout.tsx
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";


export const metadata = {
  title: "NFT on Base",
  description: "Track NFTs on Base L2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
