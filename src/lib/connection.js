import { ethers } from "ethers";
import Web3 from "web3";
import Overtime from "@/abi/Overtime.json";

const CONTRACT_ABI = Overtime;
const CONTRACT_ADDRESS = "0xB04Df08ff4360776D2494D892ba0E2AA930a1391";

export const loadWeb3Metamask = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    throw new Error("Non-Ethereum browser detected. Please install MetaMask!");
  }
};

export const loadBlockChainDataAndCheckAdmin = async () => {
  await loadWeb3Metamask();
  const web3 = window.web3;

  try {
    const accounts = await web3.eth.getAccounts();
    const caller = accounts[0];
    console.log("Caller:", caller);

    const networkId = await web3.eth.net.getId();
    console.log("Network ID:", networkId);

    const overtimeContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const admin = await overtimeContract.methods.admin().call();
    console.log("Contract Admin:", admin);

    if (caller.toLowerCase() === admin.toLowerCase()) {
      console.log("Access granted to admin.");
      // Your logic for admin access
    } else {
      console.log("Access denied. You are not the admin.");
      // Your logic for non-admin access
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
