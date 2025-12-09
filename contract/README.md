# MembershipPass – Smart Contract

This smart contract implements a simple NFT-based membership system using the ERC-721 standard.

## Purpose

The contract is used to mint membership NFTs (“FlowPass Membership”) that give users access to a members-only section in the frontend application.  
A user is considered a member if they own at least one membership NFT.

## Key Details

- **Standard:** Inherits from `ERC721` (OpenZeppelin)
- **Ownership:** Inherits from `Ownable`. Only the contract owner can mint new membership NFTs.
- **Name:** `FlowPass Membership`
- **Symbol:** `FLOWPASS`

## Core Functions

### `mint(address to)`
- Only callable by the contract owner.
- Increments an internal tokenId and mints a new membership NFT to address `to`.

### `isMember(address user) → bool`
- Returns `true` if the address owns at least one NFT (`balanceOf(user) > 0`).
- Used by the frontend to check membership status.

## How the Frontend Will Use This Contract

- The frontend will connect with MetaMask and read `isMember(msg.sender)` to determine whether the logged-in wallet is a member.
- The owner of the contract (the studio/creator) can mint membership NFTs to customers using the `mint` function.
- The contract address and ABI are imported into the frontend so it can interact with the blockchain.

## Deployment

- **Network:** Polygon Amoy (Testnet)  
- **Contract Address:** *(stored in docs/contract-address.md)*  
- **Verified:** Sourcify  
- **Explorer:** OKLink  
