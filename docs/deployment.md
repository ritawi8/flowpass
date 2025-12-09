# Deployment Information – FlowPass Membership NFT
This document describes the deployment process of the smart contract used in my project.

## Network
The contract was deployed to:
Network: Polygon Amoy Testnet
Type: EVM-compatible test network
Reason: Cheap gas fees, stable RPC, and recommended for student projects and dApp prototypes.

## Tools Used
Remix IDE – for compilation and deployment
MetaMask – for signing the transaction
POL (test tokens) – to pay for gas fees
Sourcify – for contract verification
OKLink – blockchain explorer used to inspect deployment

## Deployment Steps
1. Opened Remix IDE and pasted the completed MembershipPass.sol contract
2. Compile the contract using Solidity version 0.8.20.
3. Connected Remix to Metamask using Injected Provider - MetaMask
4. Switched MetaMask to the Polygon Amoy network
5. Clicked Deploy, signed the transaction in MetaMask, and waited for confirmation
6. Received a unique contract address on the network
7. Verified the contract through Sourcify, making the code publicly visible
8. Checked the deployed contract on OKLink to ensure: 
 - the contract is live
 - the owner address is correct
 - functions mint and isMember can be executed from the explorer or Remix

## Contract address
The deployed contract address is stored here:
docs/contract-address.md

## Post-Deployment Testing
After deployment, the following tests were performed using Remix with the live contract:
- Called mint(address) as the owner to issue a membership NFT
- Verified the user’s membership with isMember(userAddress)
- Checked balanceOf to confirm the NFT was minted
- Ensured only the owner can mint (tested access control)
- All tests confirmed the contract functions as intended.

## Purpose of Deployment
The deployed contract serves as the backend of the FlowPass membership system.
The frontend will connect to this address using its ABI in order to:
- check if a user is a member
- allow the owner to mint new membership passes
- reflect membership status in the user interface