"use client";

import ConnectWalletButton from "./components/ConnectWalletButton";
import MemberStatus from "./components/MemberStatus";
import OwnerPanel from "./components/OwnerPanel";
import { useAccount } from "wagmi";
import ManualVerify from "./components/ManualVerify";

export default function Home() {

const { address} =useAccount();

  return (
    <main className="flex flex-col">
      {/* HERO SECTION MED BAKGRUNDSBILD */}
      <section 
        className="min-h-[100vh] flex items-start justify-center px-6 relative pt-34"
        style={{
          backgroundImage: "url('/background2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="flex w-full max-w-5xl flex-col items-center gap-6 px-8 text-center relative z-10 pt-12 pb-20 mx-auto">
          <h1 className="text-7xl leading-tight font-bold text-zinc-200 w-full break-words">
            Welcome to Wellness Studio
          </h1>
        
          
          <p className="text-2xl font-semibold text-zinc-200">
            FlowPass is your NFT membership pass for modern wellness spaces 
            <br />- simple, secure and made for real people, not crypto nerd.
          </p>

          <h2 className="text-3xl font-semibold text-zinc-200">
              How it works
            </h2>

            <ol className="space-y-3 text-zinc-200 text-center ">
              <li>
                <span className="font-bold">1. Get your FlowPass.</span>
                {" "}You receive a unique NFT membership pass in your wallet.
              </li>
              <li>
                <span className="font-bold">2. Connect your wallet at the studio.</span>
                {" "}The system checks your pass in a second.
              </li>
              <li>
                <span className="font-bold">3. Enjoy member-only access.</span>
                {" "}Classes, events or perks unlocked automatically.
              </li>
            </ol>
            <br />

            <h2 className="text-3xl font-semibold text-zinc-200">
              Membership Benefits
            </h2>
            <ul className="space-y-3 text-zinc-200 text-center">
              <li>✔ Transparent, verifiable membership – no plastic cards.</li>
              <li>✔ Easy to manage: one pass, multiple wellness spaces (in the future).</li>
              <li>✔ Potential perks: discounts, early booking, member-only events.</li>
              <li>✔ Built on blockchain, but with a calm, human experience.</li>
            </ul>
          
        </div>
      </section>

      {/* RESTEN AV INNEHÅLLET */}
      <div className="min-h-screen bg-[#1f7a73] flex items-center justify-center">
        <div className="mx-auto max-w-3xl px-6 w-full flex flex-col items-center justify-center gap-10 py-16">
          
          {/* Card 1 - Wallet Verify */}
          <section className="rounded-3xl bg-white shadow-lg p-10 text-center w-full max-w-2xl mx-auto h-[500px] flex flex-col justify-start">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold text-gray-900">
                Verify membership
              </h1>
              <p className="text-base text-slate-500">
                Connect your wallet to check your status.
              </p>
              <p className="text-sm text-slate-400">
                Network: Polygon Amoy 
              </p>

              <div className="pt-2 flex justify-center">
                <ConnectWalletButton/>
              </div>
            </div>

            <div className="flex-1 flex items-start justify-center mt-6">
              <MemberStatus/>
            </div>
          </section>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 w-full flex-shrink-0">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-white/70 text-sm tracking-widest">OR</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Card 2 - Manual Verify */}
          <section className="rounded-3xl bg-white shadow-lg p-10 w-full max-w-2xl mx-auto flex-shrink-0 h-[500px] flex flex-col">
            <ManualVerify />
          </section>
          
        </div>
      </div>

      {/* FOR STUDIO OWNERS*/}
      {address && address.toLowerCase() === "0x7cd4eb5f87478686936182e858003644b4c7b0ab".toLowerCase() && (
        <section 
          className="min-h-[100vh] flex items-center justify-center px-6 relative overflow-hidden text-zinc-200"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "hue-rotate(-15deg) saturate(1.3)"
            }}
          ></div>
        <div className="relative z-10">
          <OwnerPanel connectedAddress={address}/>
        </div>
        </section>
      )}
    </main>
  );
}
