import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CubeSat at MSU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
