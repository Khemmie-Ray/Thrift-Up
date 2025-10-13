import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useCallback } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { coreTestnet2  } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/groupthriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import useContractInstance from "../../hooks/useContractInstance";

const VerifyUser = () => {
  let [isOpen, setIsOpen] = useState(false);
  const contract = useContractInstance(true);
  const [userAdd, setUserAdd] = useState("");
  const { isConnected } = useAppKitAccount();
  const [verify, setVerify] = useState(true)
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleVerify = useCallback(
    async () => {
      if (!userAdd || !verify) {
        toast.error("Invalid Input");
        return;
      }

      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(coreTestnet2 .id)) {
        toast.error("You're not connected to Core Testnet2");
        return;
      }

      try {
        const tx = await contract.verifyUser(userAdd, verify);
        console.log(tx)
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Verification successfully");
          return;
        }

        toast.error("Verification failed");
        return;
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        toast.error(`Verification failed - ${decodedError.reason}`, {
          position: "top-center",
        });
      }
    },
    [contract, chainId]
  );

  return (
    <>
      <Button
        onClick={open}
        className="border-primary font-[500] text-primary border py-3 px-6 mb-3 text-[12px] flex justify-center rounded-full hover:scale-105 items-center"
      >
        Verify User
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black/80 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] text-white "
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white text-[24px] text-center my-6"
              >
                Verify User
              </DialogTitle>
              <p className="mb-2">Enter User Address</p>
              <input
                type="text"
                placeholder="Enter member address"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                onChange={(e) => setUserAdd(e.target.value)}
                value={userAdd}
              />
              <input
                type="text"
                readOnly
                placeholder="Enter member address"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                value={verify}
              />
              <div className="mt-4">
                <Button className="bg-linear-to-r from-primary to-lilac py-4 px-8 rounded-full font-[500] w-[100%]" onClick={handleVerify}>
                  Verify User
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default VerifyUser;