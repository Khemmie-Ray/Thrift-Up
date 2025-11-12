import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import {baseSepolia} from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../constants/abi.json";

const useCreateThrift = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);

  return useCallback(
    async (
      goalName,
      goalAmount,
      frequency,
      vaultAddress,
      startTime,
      endTime,
      participant
    ) => {
      if (
        !goalName ||
        !goalAmount ||
        frequency === "" ||
        !vaultAddress ||
        !startTime ||
        !endTime ||
        participant === null || participant === undefined
      ) {
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
        const tx = await contract.createThrift(
          goalName,
          goalAmount,
          frequency,
          vaultAddress,
          startTime,
          endTime,
          participant
        );
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("New module creation Successful");
          return true;
        }

        toast.error("New module creation failed");
        return false;
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        toast.error(`New module creation failed - ${decodedError.reason}`, {
          position: "top-center",
        });
      }
    },
    [contract, address, chainId]
  );
};

export default useCreateThrift;
