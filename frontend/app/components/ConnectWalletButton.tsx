"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <button
        onClick={() => disconnect()}
        className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-700/60 transition-colors duration-200 font-medium text-sm"
      >
        <span className="text-zinc-300">Connected:</span>{" "}
        <span className="font-mono">{address?.slice(0, 6)}…{address?.slice(-4)}</span>{" "}
        <span className="text-zinc-400">(Click to disconnect)</span>
      </button>
    );

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
    >
      {isPending ? "Connecting..." : "Connect MetaMask"}
    </button>
  );
}
