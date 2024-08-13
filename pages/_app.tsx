import type { AppProps } from "next/app";
import localFont from "next/font/local";
import * as React from "react";

import "../styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";

import "../components/nextui_button";
import "../components/nextui_accordion";
import "../components/nextui_pagination";
import "../components/nextui_divider";
import "../components/nextui_navbar";
import "../components/nextui_input";
import "../components/shadcn_form";

const ClashDisplay = localFont({
  src: "./ClashDisplay-Variable.woff2",
  // display: 'swap',
  variable: "--ClashDisplay",
});

const DMSans = localFont({
  src: "./DMSans.woff2",
  variable: "--DMSans",
});

const DMSansItalic = localFont({
  src: "./DMSans-Italic.woff2",
  variable: "--DMSansItalic",
});

const SofiaSansSemiCondensedBold = localFont({
  src: "./SofiaSansSemiCondensed-Bold.woff2",
  variable: "--SofiaSansSemiCondensedBold",
});

const SofiaSansSemiCondensedBoldItalic = localFont({
  src: "./SofiaSansSemiCondensed-BoldItalic.woff2",
  variable: "--SofiaSansSemiCondensedBoldItalic",
});

console.log("Environment: ", process.env.NEXT_PUBLIC_NODE_ENV);

export default function MyApp({ Component, pageProps }: AppProps) {
  // Set the CSS variable on <body> to ensure Plasmic Studio has access to the variable.
  React.useEffect(() => {
    document.body.classList.add(
      ClashDisplay.variable,
      DMSans.variable,
      DMSansItalic.variable,
      SofiaSansSemiCondensedBold.variable,
      SofiaSansSemiCondensedBoldItalic.variable
    );
  }, []);

  return (
    <NextUIProvider>
      <Component {...pageProps} />;
    </NextUIProvider>
  );
}
