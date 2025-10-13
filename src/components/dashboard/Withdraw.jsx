import React, { useCallback, useState } from "react";
import { Button } from "@headlessui/react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { coreTestnet2 } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/singlethriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { Contract, ethers } from "ethers";
import { BeatLoader } from "react-spinners";

const Withdraw = ({ thriftAddress }) => {
  const { chainId } = useAppKitNetwork();
  const { address } = useAppKitAccount();
  const errorDecoder = ErrorDecoder.create([abi]);
  const { signer } = useSignerOrProvider();
  const [loading, setLoading] = useState(false)

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

    if (Number(chainId) !== Number(coreTestnet2.id)) {
      toast.error("You're not connected to Core Testnet2");
      return;
    }

    try {
      setLoading(true)

      const tx = await contract.withdraw();
      console.log(tx);
      const receipt = await tx.wait();

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
        setLoading(false)
    }
  }, [contract, address, chainId]);

  return (
    <>
          <Button
            className="border border-primary py-3 px-6 flex justify-center items-center rounded-full text-[14px] font-[500] hover:scale-105 text-primary mb-3  ml-4"
            onClick={handleWithdraw}
          >
            {!loading ? "Withdraw" :     <BeatLoader color="#6138FE" size={15} />
        }
          </Button>
    </>
  );
};

export default Withdraw;
