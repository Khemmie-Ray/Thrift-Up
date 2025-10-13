import { useCallback } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../constants/abi.json";
import tokenAbi from "../constants/singlethriftAbi.json"
import { useThriftData } from "../context/ThriftContextProvider";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract } from "ethers";

const useSaveIndividual = () => {
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);
  const { allSingle, singleUser } = useThriftData();
  const { signer } = useSignerOrProvider()
  console.log(allSingle, singleUser)

  return useCallback(
    async (username, assetLister) => {
      if (!username && !assetLister) {
        toast.error("Invalid Input");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia .id)) {
        toast.error("You're not connected to Base Sepolia");
        return;
      }

      try {
        const ercContract = new ethers.Contract(
            import.meta.env.VITE_TOKEN_ADDRESS,
            tokenAbi,
            signer
          );

        const contract = new ethers.Contract(
            import.meta.env.VITE_TOKEN_ADDRESS,
            tokenAbi,
            signer
        );
        const value = ethers.utils.parseEther(amount); 
        const tx = await contract.saveForGoal(address, { value });
        console.log(tx);
        const receipt = await tx.wait();
  
        if (receipt.status === 1) {
          toast.success("Saved successfully");
        } else {
          toast.error("Save failed");
        }
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        toast.error(`Registration failed - ${decodedError.reason}`, {
          position: "top-center",
        });
      }
    },
    [contract, address, chainId]
  );
};

export default useSaveIndividual;
