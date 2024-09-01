"use client";

import { useEffect, useState } from "react";
import { loadBlockChainDataAndCheckAdmin } from "@/lib/connection";
import { Admin } from "@/components/component/admin";
import { User } from "@/components/component/user";
import { ConnectWalletButton } from "@/components/component/connect_wallet";

export default function Page() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => { 
      const adminStatus = await loadBlockChainDataAndCheckAdmin(); 
      setIsAdmin(adminStatus);
      setIsConnected(true);
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      {isConnected ? isAdmin ? <Admin /> : <User /> : <ConnectWalletButton />}
    </div>
  );
}
