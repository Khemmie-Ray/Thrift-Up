import React, { useCallback, useState } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { baseSepolia } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/singlethriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { ethers } from "ethers";
import { BeatLoader } from "react-spinners";

const EmergencyWithdraw = ({ thriftAddress }) => {
  const { chainId } = useAppKitNetwork();
  const { address } = useAppKitAccount();
  const errorDecoder = ErrorDecoder.create([abi]);
  const { signer } = useSignerOrProvider();
  const [loading, setLoading] = useState(false);

  const contract = new ethers.Contract(thriftAddress, abi, signer);

  const handleWithdraw = useCallback(async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!contract) {
      toast.error("Contract not found");
      return;
    }

    if (Number(chainId) !== Number(baseSepolia.id)) {
      toast.error("You're not connected to Hedera");
      return;
    }

    try {
      setLoading(true);

      const tx = await contract.emergencyWithdrawal();
      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Receipt:", receipt);

      if (receipt.status === 1) {
        toast.success("Withdraw successfully");
      } else {
        toast.error("Withdraw failed");
      }
    } catch (err) {
      const decodedError = await errorDecoder.decode(err);
      toast.error(`Withdraw failed - ${decodedError.reason}`, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [contract, address, chainId]);

  return (
    <>
      <button
        className="border border-primary py-3 px-6 flex justify-center items-center rounded-full text-[14px] font-[500] hover:scale-105 text-primary mb-3  ml-4"
        onClick={handleWithdraw}
      >
        {!loading ? (
          "Emergency Withdraw"
        ) : (
          <BeatLoader color="#6138FE" size={15} />
        )}
      </button>
    </>
  );
};

export default EmergencyWithdraw;
