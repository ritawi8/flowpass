# Activity Plan

This activity plan is divided into sprints. Each sprint has a clear goal, a set of tasks, and an expected outcome.

---

## Sprint 1 – Smart Contract + Testnet (completed)

**Goal:**  
Design, implement and deploy a working ERC-721 membership contract on a testnet.

**Tasks:**
- Create GitHub repo & folder structure  
- Write ERC-721 membership contract in Solidity (`MembershipPass.sol`)  
- Compile & test the contract in Remix (mint, balanceOf, isMember)  
- Deploy the contract to Polygon Amoy testnet using MetaMask  
- Verify the contract and store contract address and ABI for later use  

**Outcome:**  
A fully working membership NFT contract deployed on Polygon Amoy, with address and ABI available for integration in the frontend.

---

## Sprint 2 – Frontend + Wallet Integration + Contract Functions

**Goal:**  
Connect the frontend to the blockchain so users can connect their wallet and check membership status.

**Tasks:**
- Create Next.js frontend project (1 SP)  
- Add MetaMask wallet connection (3 SP)  
  - Create “Connect Wallet” button  
  - Display connected wallet address in the UI  
- Integrate Ethers.js with ABI + contract address (5 SP)  
  - Import ABI + address into frontend  
  - Create a contract instance using the MetaMask provider  
- Build Customer Verification section (5 SP)  ✅
  - Call `isMember(address)` from the frontend  ✅
  - Show clear result in the UI (e.g. “You are a member” / “You are not a member”)  ✅

**Outcome:**  
A user can connect their wallet in the frontend and see whether they are a member according to the deployed smart contract.

---

## Sprint 3 – Owner Mint Flow (Admin)

**Goal:**  
Allow the contract owner to mint membership NFTs to customers directly from the frontend.

**Tasks:**
- Create a simple admin section/page for the owner  
- Add a form to input a recipient address  
- Connect the form to the `mint(address)` function in the contract  
- Show basic feedback in the UI (loading, success, error)  

**Outcome:**  
The owner can mint new membership NFTs to any wallet address through the frontend, using the deployed contract on Polygon Amoy.

---

## Sprint 4 – UI & Styling

**Goal:**  
Make the application easy to use and visually clear, without focusing on advanced design.

**Tasks:**
- Add a minimal layout (header, main content area, basic navigation if needed)  
- Apply basic Tailwind CSS styling (2 SP)  
  - Clear typography and spacing  
  - Buttons and status messages with simple styling  
- Add loading and error states for blockchain actions (connect, check membership, mint)  

**Outcome:**  
A simple but usable UI where users and the owner can clearly see wallet status, membership status, and mint actions.

---

## Sprint 5 – Documentation & Final Review

**Goal:**  
Document the technical solution and prepare the project for submission.

**Tasks:**
- Write deployment documentation (`docs/deployment.md`)  
- Document the smart contract (`contract/README.md`) and reference `docs/contract-address.md`  
- Describe how the frontend interacts with the smart contract (wallet connection, ethers, contract calls)  
- Write a short reflection on challenges, choices and possible future improvements  
- Final review of repo structure (contract, docs, frontend) and clean up unused files  

**Outcome:**  
A well-documented project where both code and architecture are clearly explained and ready to be presented as an exam project.
