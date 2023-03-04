import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import ClientOnly from "@/components/ClientOnly";
import WorkBoard from "./components/WorkBoard";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("userID");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ClientOnly>
          <WorkBoard />
        </ClientOnly>
      </main>
    </>
  );
}
