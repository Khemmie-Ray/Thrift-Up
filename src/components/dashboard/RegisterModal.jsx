import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import ButtonSpinner from "../loaders/ButtonSpinner";

const RegisterModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLister, setIslister] = useState("");
  const handleRegister = useRegister();
  const [loading, setLoading] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSignup = async () => {
    setLoading(true);
    await handleRegister(username, isLister);
    setIslister("");
    setUsername("");
    setLoading(false);
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        className="underline text-white focus:not-data-focus:outline-none cursor-pointer data-focus:outline-white data-hover:text-lightgray"
      >
        Click Here!
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
                Register as a Thrifter
              </DialogTitle>
              <p className="mb-2">Username</p>
              <input
                type="text"
                placeholder="Enter username"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <p className="mb-2">Are you an Asset Lister?</p>
              <select
                name=""
                id=""
                className="border border-white/20 w-[100%] rounded-md hover:outline-0 p-3 mb-4 bg-black"
                onChange={(e) => setIslister(e.target.value)}
                value={isLister}
              >
                <option value={""} defaultChecked>
                  No Option Yet
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <div className="mt-4">
                <Button
                  className={`py-4 px-8 rounded-full font-[500] w-full bg-gradient-to-r hover:from-lightPurple hover:to-lilac cursor-pointer ${
                    loading
                      ? "from-lightPurple to-lilac"
                      : "from-primary to-lilac"
                  }`}
                  onClick={handleSignup}
                >
                  {!loading ? "Register" : <ButtonSpinner />}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RegisterModal;
