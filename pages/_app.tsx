import type { AppProps } from "next/app";
import localFont from "next/font/local";
import * as React from "react";

import "../styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";

import "../components/nextui_button";
import "../components/nextui_accordion";
import "../components/nextui_pagination";

const ClashDisplay = localFont({
  src: "./ClashDisplay-Variable.woff2",
  // display: 'swap',
  variable: "--ClashDisplay",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  // Set the CSS variable on <body> to ensure Plasmic Studio has access to the variable.
  React.useEffect(() => {
    document.body.classList.add(ClashDisplay.variable);
  }, []);

  return (
    <NextUIProvider>
      <Component {...pageProps} />;
    </NextUIProvider>
  );
}
