"use client";

import { useState } from "react";
import { readIsMember } from "../lib/contract/getFlowPassContract";
import { isAddress } from "viem";
import { useChainId } from "wagmi";

export default function ManualVerify () {
    const [addr, setAddr ] = useState("");
    const [status, setStatus] = useState("");
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
            setStatus("Enter valid address (0x...)");
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
        }
    };

    

    const handleClear = () => {
        setAddr("");
        setStatus("");
        setLoading(false);
    };

    return (
        <>
            <h2 className="text-3xl font-semibold text-gray-900 text-center">
                Enter your address to verify manually
            </h2>
            <p className="mt-2 text-sm text-slate-500 text-center">
                For reception staff: paste customer wallet address and check.
            </p>

            {!isAmoy && (
                <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                    Switch to <strong>Polygon Amoy</strong> to use manual verification.
                </div>
            )}

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Wallet address</label>
                <input 
                    className="mt-2 w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="0x..."
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                />

                <button 
                    className="mt-5 w-full rounded-xl bg-[#1f7a73] text-white font-semibold py-3 hover:opacity-90 transition disabled:opacity-50"
                    onClick={status && (status === "✅ Membership verified" || status === "❌ No active membership") ? handleClear : handleManualCheck}
                    disabled={loading || !isAmoy}
                >
                    {loading ? "Checking..." : (status && (status === "✅ Membership verified" || status === "❌ No active membership") ? "Clear/Next customer" : "Check Membership")}
                </button>

                {status && (
                    <div className="mt-6 flex justify-center">
                        {status === "✅ Membership verified" ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-emerald-700">
                                <span className="text-sm">✔</span>
                                <span className="text-sm font-medium">Membership verified</span>
                            </span>
                        ) : status === "❌ No active membership" ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-2 text-yellow-700">
                                <span className="text-sm">✗</span>
                                <span className="text-sm font-medium">No active membership</span>
                            </span>
                        ) : (
                            <p className="text-xs text-slate-500">
                                {status}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}