import { Contract, ethers } from "ethers";
import Web3 from "web3";
import Overtime from "@/abi/Overtime.json";

const CONTRACT_ABI = Overtime;
const CONTRACT_ADDRESS = "0xB04Df08ff4360776D2494D892ba0E2AA930a1391"; // Sepolia contract

export const loadWeb3Metamask = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    console.error("Non-Ethereum browser detected. Consider using MetaMask!");
  }
};

export const loadBlockChainDataAndCheckAdmin = async () => {
  const web3 = window.web3;
  try {
    const accounts = await web3.eth.getAccounts();
    const caller = accounts[0];
    console.log("caller", caller);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const adminAddress = await contract.admin();

    if (caller === adminAddress) {
      console.log("Admin access granted");
      return true; 
    } else {
      console.warn("You are not authorized to access this page");
      return false; 
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
