import { Contract, ethers } from "ethers";
import Overtime from "@/abi/Overtime.json";

const CONTRACT_ABI = Overtime;
const CONTRACT_ADDRESS = "0xB04Df08ff4360776D2494D892ba0E2AA930a1391";
const INFURA_RPC = "https://sepolia.infura.io/v3/8409f54447114f4ab2264b1f9ae7bdab";

export const loadBlockChainDataAndCheckAdmin = async () => {
  try {
    const infuraProvider = new ethers.InfuraProvider("sepolia", INFURA_API);
    const signer = infuraProvider.getSigner();

    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const admin = await contract.admin();
    const caller = await signer.getAddress();
    console.log(provider.getBlockNumber());
    return caller.toLowerCase() === admin.toLowerCase();
  } catch (error) {
    console.error(
      "Error loading blockchain data or checking admin status:",
      error.message || error
    );
    return false;
  }
};
