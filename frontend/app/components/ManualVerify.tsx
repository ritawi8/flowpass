"use client";

import { useState } from "react";
import { readIsMember } from "../lib/contract/getFlowPassContract";

export default function ManualVerify () {
    const [addr, setAddr ] = useState("");
    const [status, setStatus] = useState("Enter a wallet address and click Check");
    const [loading, setLoading]=useState(false);

    const isValidAddress = (v: string)=> v.startsWith("0x") && v.length === 42;

    const handleManualCheck = async () => {
        const clean = addr.trim();

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
            setLoading (false)
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

            <div className="mt-6 rounden-2xl boder p-6">
                <label className="text-sm opacity-80">Wallet address</label>
                <input 
                    className="mt-2 w-full rounded-xl border px-4 py-3"
                    placeholder="0x..."
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                />

            <button 
                className="mt-4 w-full rounden-xl border px-4 py-3 disabled:opacity-50"
                onClick={handleManualCheck}
                disabled={loading}
            >
                {loading ? "Checking..." : "Check Membership"}
            </button>

            <div className="mt-4 text-sm opacity-80">Status: {status}</div>
            </div>
        </section>
    )
}