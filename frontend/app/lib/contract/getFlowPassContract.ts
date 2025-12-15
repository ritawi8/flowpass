import { getPublicClient, getWalletClient } from "@wagmi/core";
import { config } from "../wagmi";
import { FLOWPASS_ADDRESS, FLOWPASS_ABI } from "./flowpass-contract";

/* Läsa kontraktets namn */
export async function readFlowPassName() {
  const publicClient = getPublicClient(config);
  return publicClient.readContract({
    address: FLOWPASS_ADDRESS,
    abi: FLOWPASS_ABI,
    functionName: "name",
  });
}

/*Kolla om en användare är medlem*/
export async function readIsMember(user: `0x${string}`) {
  const publicClient = getPublicClient(config);
  return publicClient.readContract({
    address: FLOWPASS_ADDRESS,
    abi: FLOWPASS_ABI,
    functionName: "isMember",
    args: [user],
  });
}

/* Mint ett NFT till en adress*/
export async function mintTo(to: `0x${string}`) {
  const walletClient = await getWalletClient(config);
  if (!walletClient) {
    throw new Error("Wallet not connected");
  }

  // 1) Skicka transaktion
  const hash = await walletClient.writeContract({
    address: FLOWPASS_ADDRESS,
    abi: FLOWPASS_ABI,
    functionName: "mint",
    args: [to],
  });

  // 2) Vänta på kvitto
  const publicClient = getPublicClient(config);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt;
}
