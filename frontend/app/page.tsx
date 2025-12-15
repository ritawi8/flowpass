"use client";

import ConnectWalletButton from "./components/ConnectWalletButton";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center pt-40 px-6">
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-8  text-center sm:items-start sm:text-left ">
      
      {/*HERO */}
      <section className="flex flex-col gap-4">
      <h1 className="text-5xl leading-tight font-semibold">
        Welcome to Wellness Studio
      </h1>
      <ConnectWalletButton/>
      <p className="text-lg">
        FlowPass is your NFT membership pass for modern wellness spaces 
        <br />- simple, secure and made for real people, not crypto nerd.
      </p>
      </section>

      {/* HOW IT WORKS*/}
      <section className="flex flex-col gap-4 border-t border-zinc-700/60 pt-8">
        <h2 className="text-2xl font-semibold">
          How it works
        </h2>
        <ol className="spacey-y-3 text-zinc-200">
          <li>
            <span className="font-semibold">1. Get your FlowPass.</span>
            You receive a unique NFT membership pass in your wallet.
          </li>
          <li>
            <span className="font-semibold">2. Connect your wallet at the studio.</span>
            The system checks your pass in a second.
          </li>
          <li>
            <span className="font-semibold">3. Enjoy member-only access.</span>
            Classes, events or perks unlocked automatically.
          </li>
        </ol>
      </section>

      {/* MEMBERSHIP BENEFITS*/}
      <section className="flex flex-col gap-4 border-t border-zinc-700/60 pt-8">
        <h2 className="text-2xl font-semibold">
          Membership Benefits
        </h2>
        <ul className="space-y-3 text-zinc-200">
        <li>✔ Transparent, verifiable membership – no plastic cards.</li>
            <li>✔ Easy to manage: one pass, multiple wellness spaces (in the future).</li>
            <li>✔ Potential perks: discounts, early booking, member-only events.</li>
            <li>✔ Built on blockchain, but with a calm, human experience.</li>
        </ul>
      </section>
    </div>
  </main>
  );
}
