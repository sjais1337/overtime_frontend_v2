"use client"

import { Button } from "@/components/ui/button"
import { loadWeb3Metamask } from "@/lib/connection"

export function ConnectWalletButton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Connect to MetaMask
      </h1>
      <Button
        onClick={loadWeb3Metamask}
        className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
        Connect Wallet
      </Button>
    </div>
  );
}
