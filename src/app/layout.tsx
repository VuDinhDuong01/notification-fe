'use client'

import localFont from "next/font/local";

import { AntdRegistry } from '@ant-design/nextjs-registry';
import ProviderReactQuery from "./util/api/react-query";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi">
      <body className={`${geistSans.variable}`}>
        
          <AntdRegistry >
            <ProviderReactQuery>
            {children}
            </ProviderReactQuery>
            
            </AntdRegistry>
      </body>
    </html>
  );
}
