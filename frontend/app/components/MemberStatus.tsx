"use client";

import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { readIsMember } from "../lib/contract/getFlowPassContract";

export default function MemberStatus() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Avoid hydration mismatch
   useEffect(() => {
    setMounted(true);
  }, []);

  

  // Auto-check membership when wallet connects / address changes
  useEffect(() => {
    if (!isConnected || !address) {
      setIsMember(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function check() {
      try {
        setLoading(true);
        setError(null);

        const result = await readIsMember(address as `0x${string}`);
        if (!cancelled) setIsMember(result);
      } catch (e) {
        const message = 
        e instanceof Error ? e.message : "Could not verify membership";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [isConnected, address]);

  // Förhindra hydration mismatch - vänta tills komponenten är mounted
  if (!mounted) return null;

  if (!isConnected) {
    return (<p className="text-sm text-zinc-200">
      Connect wallet to verify membership.
      </p>
    );
  }

  if (loading) {
    return <p className="text-sm text-zinc-200">Checking membership…</p>;
  }

 // If there is an error, show it + allow disconnect
  if (error) {
    return (
      <div className="mt-2 w-full">
        <p className="text-sm text-red-200">Error: {error}</p>

        <button 
          onClick={() =>disconnect()}
          className="mt-3 w-full rounded-xl border px-4 py-3 text-sm text-zinc-200">
            Disconnect Wallet
          </button>
      </div>
    );
  }

  // No result yet (connected but not checked / just reset states)
  if (isMember === null) return null;

  return (
    <div className="mt-2 w-full">
      {isMember ? (
        <p className="text-sm text-emerald-200">✅ Membership verified</p>
      ) : (
        <p className="text-sm text-yellow-200">❌ No membership NFT found</p>
      )}
    
    <button
        onClick={() => disconnect()}
        className="mt-3 w-full rounded-xl border px-4 py-3 text-sm text-zinc-200"
      >
        Disconnect wallet
      </button>

      <p className="mt-2 text-xs text-zinc-200/80">
        Please disconnect your wallet after verification.
      </p>
    </div>
  );
}
