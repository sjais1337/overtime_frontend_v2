# ReadMe

## Project Overview

This project aims to develop a decentralized blockchain-based platform for automating task allocation and payment processing. Workers register with their availability, expertise, and wage requirements, while tasks are managed by an Admin. All task allocations and payments are handled on-chain via smart contracts, ensuring transparency and trust. It uses MetaMask for managing accounts securely, and interacting with the Ethereum blockchain.

### Overview

Create a blockchain-based system that efficiently matches workers with tasks based on predefined criteria, automates task allocation, and processes payments securely.

## Features

- *Worker Registration*: Register with availability, expertise, and wage preferences, linking wallets for payments.
- *Admin Task Management*: Add tasks with specific requirements, including time, expertise, and wage.
- *On-Chain Task Allocation*: Automated, constraint-based task assignment via smart contracts.
- *Smart Contract Execution*: Automatic payment processing post-task completion.
- *MetaMask Integration:* Users can establish their identities using MetaMask web-extension.

### Technology Stack

- *Frontend:* Next.js, TailwindCSS
- *Backend:* Node.js
- *Smart Contracts:* Solidity
- *Wallet:* MetaMask
- *Blockchain:* Ethereum Sepolia Testnet
- *RPC Provider:* Infura

This project uses *Next.js* for building a modern, server-side rendered frontend. *Web3.js* connects the application to the Ethereum blockchain, interacting with MetaMask for account management and smart contract transactions. *Tailwind CSS* provides a utility-first approach to styling, ensuring a responsive and visually consistent UI. MetaMask serves as the wallet provider for secure Ethereum interactions, while Infura is used as the RPC provider to connect to the Sepolia testnet.

## Getting Started

To start the development server, use one of the following commands:

bash
npm run dev
# or
yarn dev
# or
pnpm dev


 
Once the server is running, open [http://localhost:3000](http://localhost:3000/) in your browser to view your application.

## Deployment

<To Insert>
