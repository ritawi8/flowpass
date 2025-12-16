"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readIsMember } from "../lib/contract/getFlowPassContract";

export default function MemberStatus() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isConnected || !address) {
      setIsMember(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function check() {
      if (!address) return;
      
      const userAddress = address as `0x${string}`;
      
      try {
        setLoading(true);
        setError(null);

        const result = await readIsMember(userAddress);

        if (!cancelled) setIsMember(result);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Could not verify membership";
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
  if (!mounted) {
    return null;
  }

  if (!isConnected) {
    return <p className="text-sm ">Connect wallet to verify membership.</p>;
  }

  if (loading) {
    return <p className="text-sm ">Checking membership…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-200">
        Error: {error}
      </p>
    );
  }

  if (isMember === null) return null;

  return isMember ? (
    <p className="text-sm ">✅ Membership verified</p>
  ) : (
    <p className="text-sm ">❌ No membership NFT found</p>
  );
}
