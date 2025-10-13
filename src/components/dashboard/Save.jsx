import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useCallback } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { coreTestnet2  } from "@reown/appkit/networks";
import { toast } from "react-toastify";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/groupthriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import useContractInstance from "../../hooks/useContractInstance";

const Save = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userKey, setUserKey] = useState(0)
  const { isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);
  const { signer } = useSignerOrProvider();
  const contract = useContractInstance(true)

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSave = useCallback(async () => {
    if (!userAdd) {
      toast.error("Invalid address or amount");
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
      const tx = await contract.saveFor();
      console.log(tx);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Saved successfully");
      } else {
        toast.error("Save failed");
      }
    } catch (err) {
      const decodedError = await errorDecoder.decode(err);
      toast.error(`Save failed - ${decodedError.reason}`, {
        position: "top-center",
      });
    } finally {
      setUserAdd("");
      setAmount("");
      close();
    }
  }, [username, userKey, contract, isConnected, chainId]);

  return (
    <div>
      <Button
        onClick={open}
        className="bg-linear-to-r from-primary to-lilac text-white py-3 px-6 mb-3 text-[14px] inline-flex justify-center rounded-full hover:scale-105 items-center w-[100%]"
      >
        Save For
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
                Save for a user
              </DialogTitle>
              <p className="mb-2">UserName</p>
              <input
                type="text"
                placeholder="Enter Username"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
               <p className="mb-2">User Key</p>
              <input
                type="text"
                placeholder="Enter User unique identifier"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                onChange={(e) => setUserKey(e.target.value)}
                value={userKey}
              />

              <div className="mt-4">
                <Button
                  className="bg-linear-to-r from-primary to-lilac py-4 px-8 rounded-full font-[500] w-[100%]"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Save;
