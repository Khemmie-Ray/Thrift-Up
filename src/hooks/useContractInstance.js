import { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { ethers } from "ethers";
import abi from '../constants/abi.json'

const useContractInstance = (withSigner = false) => {
  const { signer, readOnlyProvider } = useSignerOrProvider();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        abi,
        signer
      );
    }

    return new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      readOnlyProvider
    );
  }, [signer, readOnlyProvider, withSigner]);
};

export default useContractInstance;