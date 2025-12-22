"use client";

import ConnectWalletButton from "./components/ConnectWalletButton";
import MemberStatus from "./components/MemberStatus";
import OwnerPanel from "./components/OwnerPanel";
import { useAccount } from "wagmi";

export default function Home() {

const { address} =useAccount();

  return (
    <main className="flex flex-col">
      {/* HERO SECTION MED BAKGRUNDSBILD */}
      <section 
        className="min-h-[100vh] flex items-center justify-center px-6 relative"
        style={{
          backgroundImage: "url('/background2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-8 text-center sm:items-start sm:text-left relative z-10 py-20">
          <h1 className="text-5xl leading-tight font-semibold">
            Welcome to Wellness Studio
          </h1>
        
          
          <p className="text-lg text-zinc-200">
            FlowPass is your NFT membership pass for modern wellness spaces 
            <br />- simple, secure and made for real people, not crypto nerd.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-200">
              How it works
            </h2>

            <ol className="space-y-3 text-zinc-200 ">
              <li>
                <span className="font-semibold">1. Get your FlowPass.</span>
                {" "}You receive a unique NFT membership pass in your wallet.
              </li>
              <li>
                <span className="font-semibold">2. Connect your wallet at the studio.</span>
                {" "}The system checks your pass in a second.
              </li>
              <li>
                <span className="font-semibold">3. Enjoy member-only access.</span>
                {" "}Classes, events or perks unlocked automatically.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold text-zinc-200">
              Membership Benefits
            </h2>
            <ul className="space-y-3 text-zinc-200">
              <li>✔ Transparent, verifiable membership – no plastic cards.</li>
              <li>✔ Easy to manage: one pass, multiple wellness spaces (in the future).</li>
              <li>✔ Potential perks: discounts, early booking, member-only events.</li>
              <li>✔ Built on blockchain, but with a calm, human experience.</li>
            </ul>
          
        </div>
      </section>

      {/* RESTEN AV INNEHÅLLET */}
      <div className="flex justify-center px-6 py-40 md:py-64 min-h-[100vh]">
        <div className="flex w-full max-w-3xl flex-col items-center gap-16 px-8 text-center sm:items-start sm:text-left">
          
          <section className="flex flex-col gap-6 border-t border-zinc-700/60 pt-16 w-full">
           
          <h1 className="text-5xl leading-tight font-semibold">
            Connect your wallet to verify membership status
          </h1>



            <ConnectWalletButton/>
            <MemberStatus/>
            </section>

          {/* MEMBERSHIP BENEFITS*/}
          <section className="flex flex-col gap-6 border-t border-zinc-700/60 pt-16 w-full">
          <h1 className="text-5xl leading-tight font-semibold">
            Enter you wallet address to verify manually
          </h1>



          </section>
          
        </div>
      </div>

      {/* FOR STUDIO OWNERS*/}
      <section 
        className="min-h-[100vh] flex items-center justify-center px-6 relative"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
      <OwnerPanel connectedAddress={address}/>
      </section>
    </main>
  );
}
