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

                {status && (
                    <p className="mt-3 text-xs text-slate-500">
                        {status}
                    </p>
                )}

                <button 
                    className="mt-5 w-full rounded-xl bg-[#1f7a73] text-white font-semibold py-3 hover:opacity-90 transition disabled:opacity-50"
                    onClick={handleManualCheck}
                    disabled={loading || !isAmoy}
                >
                    {loading ? "Checking..." : "Check Membership"}
                </button>
                
                {status && (
                    <button 
                        onClick={handleClear}
                        className="mt-3 w-full rounded-xl border border-gray-300 py-3 text-gray-700 hover:bg-gray-50 transition">
                        Clear/Next customer
                    </button>
                )}
            </div>
        </>
    )
}