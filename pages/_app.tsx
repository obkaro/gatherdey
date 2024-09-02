import type { AppProps } from "next/app";
import localFont from "next/font/local";
import * as React from "react";

import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { SpeedInsights } from "@vercel/speed-insights/next";

import "../styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";

import "../components/nextui_button";
import "../components/nextui_accordion";
import "../components/nextui_pagination";
import "../components/nextui_divider";
import "../components/nextui_navbar";
import "../components/nextui_input";
import "../components/shadcn_form";
import "../components/nextui_chip";
import "../components/header";
import "../components/header_2";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV !== "production") posthog.debug();
    },
    capture_pageleave: true,
  });
}

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

  const router = useRouter();

  React.useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <SpeedInsights />
    </PostHogProvider>
  );
}
