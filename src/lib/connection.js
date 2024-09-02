import Web3 from "web3";
import Overtime from "@/abi/Overtime.json";

const CONTRACT_ABI = Overtime;
const CONTRACT_ADDRESS = "0xB04Df08ff4360776D2494D892ba0E2AA930a1391";
const INFURA_RPC =
  "https://sepolia.infura.io/v3/8409f54447114f4ab2264b1f9ae7bdab";

export const getUserAccount = async () => {
  if (window.ethereum) {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      return accounts[0]; 
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  } else {
    console.warn("MetaMask not detected. Please install MetaMask.");
    return null;
  }
};

export const getContract = () => {
  const web3 = new Web3(INFURA_RPC);
  const Contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  Contract.handleRevert = true;
  return Contract;
};

export const getAdmin = async () => {
  const contract = getContract();
  try {
    const admin = await contract.methods.admin().call(); 
    return admin;
  } catch (error) {
    console.error("Error fetching admin from contract:", error);
    return null;
  }
};
