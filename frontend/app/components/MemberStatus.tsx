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
  if (!mounted) return <div className="min-h-[200px]"></div>;

  if (!isConnected) {
    return <div className="min-h-[200px]"></div>;
  }

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <p className="text-sm text-gray-600">Checking membership…</p>
      </div>
    );
  }

 // If there is an error, show it + allow disconnect
  if (error) {
    return (
      <div className="min-h-[200px] flex flex-col justify-center">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-2 text-red-700">
            <span className="text-sm">✗</span>
            <span className="text-sm font-medium">Error: {error}</span>
          </span>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => disconnect()}
            className="rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200">
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  // No result yet (connected but not checked / just reset states)
  if (isMember === null) return <div className="min-h-[200px]"></div>;

  return (
    <div className="min-h-[200px] flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 mb-10">
        {isMember ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-emerald-700">
            <span className="text-sm">✔</span>
            <span className="text-sm font-medium">Membership verified</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-2 text-yellow-700">
            <span className="text-sm">✗</span>
            <span className="text-sm font-medium">No membership NFT found</span>
          </span>
        )}
      </div>

      <div className="mt-6 flex justify-center w-full">
        <button
          onClick={() => disconnect()}
          className="w-full max-w-[280px] rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
          Disconnect
        </button>
      </div>
    </div>
  );
}
