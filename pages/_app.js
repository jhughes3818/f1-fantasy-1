import "../styles/globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
const queryClient = new QueryClient();
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>Fantasy Grid</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
          <Analytics />
        </SessionContextProvider>
      </QueryClientProvider>
    </>
  );
}
