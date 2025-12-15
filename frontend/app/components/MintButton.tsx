"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { mintTo } from "@/app/lib/contract/getFlowPassContract";

export default function MintButton() {
  const { address, isConnected } = useAccount();
  const [minting, setMinting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleMintToMe = async () => {
    if (!isConnected || !address) {
      setMsg("Connect wallet first.");
      return;
    }

    try {
      setMinting(true);
      setMsg("Minting... confirm in wallet");

      const receipt = await mintTo(address);
      setMsg(`Mint successful! Tx: ${receipt.transactionHash}`);
    } catch (err) {
      const message = err instanceof Error 
        ? err.message 
        : typeof err === 'object' && err !== null && 'shortMessage' in err
        ? String(err.shortMessage)
        : "Mint failed";
      setMsg(message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleMintToMe}
        disabled={!isConnected || minting}
        className="rounded-lg px-4 py-2 border border-black/30 disabled:opacity-50"
      >
        {minting ? "Minting..." : "Mint FlowPass to me"}
      </button>

      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}
