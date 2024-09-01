"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ConnectWalletButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    // Simulating wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Add your actual wallet connection logic here
  }

  return (
    (<div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Connect to MetaMask
      </h1>
      <Button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:bg-gray-200 disabled:text-gray-500">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-700" />
            Connecting...
          </>
        ) : (
          "Connect Wallet"
        )}
      </Button>
    </div>)
  );
}