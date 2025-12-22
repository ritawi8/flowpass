"use client";

import { useState } from "react";
import { readIsMember } from "../lib/contract/getFlowPassContract";
import { isAddress } from "viem";
import { useChainId } from "wagmi";

export default function ManualVerify () {
    const [addr, setAddr ] = useState("");
    const [status, setStatus] = useState("Enter a wallet address and click Check");
    const [loading, setLoading]=useState(false);

    const isValidAddress = (v: string)=> isAddress(v);

    const chainId = useChainId();
    const isAmoy = chainId === 80002;

    const handleManualCheck = async () => {
        const clean = addr.trim();

        if(!isAmoy) {
            setStatus("Wrong network: switch to Polygon Amoy");
            return;
        }

        if (!isValidAddress(clean)) {
            setStatus("Please enter a valid wallet address (0x...)");
            return;
        }

        try {
            setLoading(true);
            setStatus("Check membership...");

            const ok = await readIsMember(clean as `0x${string}`);

            setStatus(ok ? "✅ Membership verified" : "❌ No active membership")
        } catch (err) {
            console.error(err);
            setStatus("Error: verification failed");
        } finally {
            setLoading (false);
            setAddr("");
        }
    };

    return (
        <section className="mt-10">
            <h2 className="text-3xl font-semibold">
                Enter your address to verify manually
            </h2>
            <p className="mt-2 text-sm opacity-80">
                For reception staff: paste customer wallet address and check.
            </p>

            {!isAmoy && (
                    <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm">
                        Switch to <strong>Polygon Amoy</strong> to use manual verification.
                    </div>
                )}

            <div className="mt-6 rounded-2xl border p-6">
                <label className="text-sm opacity-80">Wallet address</label>
                <input 
                    className="mt-2 w-full rounded-xl border px-4 py-3"
                    placeholder="0x..."
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                />

            <button 
                className="mt-4 w-full rounded-xl border px-4 py-3 disabled:opacity-50"
                onClick={handleManualCheck}
                disabled={loading || !isAmoy}
            >
                {loading ? "Checking..." : "Check Membership"}
            </button>

            <div className="mt-4 text-sm opacity-80">Status: {status}</div>
            </div>
        </section>
    )
}