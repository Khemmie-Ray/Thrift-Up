import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia  } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../constants/abi.json";

const useRegister = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);

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
        const tx = await contract.register(username, assetLister);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Registration Successful");
          return;
        }

        toast.error("Registration failed");
        return;
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

export default useRegister;
