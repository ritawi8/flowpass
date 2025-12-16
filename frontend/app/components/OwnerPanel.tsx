"use client";

import { useState } from "react";
import { mintTo } from "../lib/contract/getFlowPassContract";

const OWNER_ADDRESS ="0x7cd4eb5f87478686936182e858003644b4c7b0ab";

type Props = {
    connectedAddress?: string;
}

export default function OwnerPanel({ connectedAddress }: Props) {

const [ recipient, setRecipient ] = useState("");
const [ status, setStatus ] = useState("Enter a wallet address and click Mint");

    // If no wallet is connected - shows nothing
    if(!connectedAddress) return null;

    //Check if connected wallet is owner
    const isOwner = 
        connectedAddress.toLowerCase() === OWNER_ADDRESS.toLowerCase()

    //If not owner - shows nothing
    if(!isOwner) return null;

    const handleMint =async () =>{
            if (!recipient || !recipient.startsWith("0x") || recipient.length !== 42){
                setStatus("Please enter a valid wallet address");
               
                return;
            }

            try{
                setStatus("Minting membership…")
                const to = recipient as `0x${string}`;
                

                await mintTo(to); // Contract call

                setStatus("Success: membership minted : ")
            } catch  (err:unknown) {
                console.error(err);
                setStatus("Error: mint failed")
            }
        }

    return (
      <section id="owner" className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-semibold">For Studio Owners</h2>
          <p className="mt-2 text-sm opacity-80">
            Mint a membership pass to a customer wallet.
          </p>
  
          <div className="mt-8 rounded-2xl border p-6">
            <label className="text-sm opacity-80">Recipient address</label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
  
            <button className="mt-4 w-full rounded-xl border px-4 py-3"
            onClick={handleMint}>
              Mint membership
            </button>
  
            <div className="mt-4 text-sm opacity-80">
              Status: {status}
            </div>
          </div>
        </div>
      </section>
    );
  }

  