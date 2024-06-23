"use client";
import Tasklist from "../components/tasklist";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react";
import { session } from "next-auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <SessionProvider session={session}>
        <Header />
        <Tasklist />
      </SessionProvider>
    </main>
  );
}
