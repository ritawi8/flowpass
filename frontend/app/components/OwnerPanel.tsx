"use client";

export default function OwnerPanel() {
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
            />
  
            <button className="mt-4 w-full rounded-xl border px-4 py-3">
              Mint membership
            </button>
  
            <div className="mt-4 text-sm opacity-80">
              Status: idle
            </div>
          </div>
        </div>
      </section>
    );
  }
  