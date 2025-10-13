import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ABI from "../constants/abi.json";
import multicallAbi from "../constants/multicallabi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { Contract, Interface } from "ethers";
import useContractInstance from "../hooks/useContractInstance";
import useSignerOrProvider from "../hooks/useSignerOrProvider";

const ThriftContext = createContext({
  allSingle: [],
  allGroup: [],
  groupUser: [],
  singleUser: [],
});

export const ThriftContextProvider = ({ children }) => {
  const [responses, setResponses] = useState([]);

  const { address } = useAppKitAccount();
  const contract = useContractInstance(true);
  const { readOnlyProvider } = useSignerOrProvider();

  const itf = useMemo(() => new Interface(ABI), []);
  const multicallAddr = import.meta.env.VITE_MULTICALL2_ADDRESS;
  const contractAddr = import.meta.env.VITE_CONTRACT_ADDRESS;

  const fetchThrifts = useCallback(async () => {
    if (!contract || !address) return;

    const multicallContract = new Contract(
      multicallAddr,
      multicallAbi,
      readOnlyProvider
    );

    const calls = [
      {
        target: contractAddr,
        callData: itf.encodeFunctionData("getAllSingleProxy"),
      },
      {
        target: contractAddr,
        callData: itf.encodeFunctionData("getAllGroupProxy"),
      },
      {
        target: contractAddr,
        callData: itf.encodeFunctionData("getAllUserGroupProxy", [address]),
      },
      {
        target: contractAddr,
        callData: itf.encodeFunctionData("getAllUserSingleProxy", [address]),
      },
    ];

    try {
      const result = await multicallContract.tryAggregate.staticCall(
        true,
        calls
      );
      setResponses(result);
    } catch (e) {
      console.error("Error fetching thrift proxies:", e);
    }
  }, [contract, address, readOnlyProvider, itf, contractAddr, multicallAddr]);

  useEffect(() => {
    fetchThrifts();
  }, [fetchThrifts]);

  const [allSingle, allGroup, groupUser, singleUser] = useMemo(() => {
    if (!responses.length) return [[], [], [], []];

    const decodeFnNames = [
      "getAllSingleProxy",
      "getAllGroupProxy",
      "getAllUserGroupProxy",
      "getAllUserSingleProxy",
    ];

    try {
      return responses.map((res, index) => {
        const decoded = itf.decodeFunctionResult(
          decodeFnNames[index],
          res.returnData
        )[0];
      
        return Array.isArray(decoded) ? [...decoded] : decoded;
      });
    } catch (e) {
      console.error("Error decoding thrift responses:", e);
      return [[], [], [], []];
    }
  }, [responses, itf]);

  return (
    <ThriftContext.Provider
      value={{
        allSingle,
        allGroup,
        groupUser,
        singleUser,
      }}
    >
      {children}
    </ThriftContext.Provider>
  );
};

export const useThriftData = () => {
  const context = useContext(ThriftContext);
  if (!context) {
    console.error("useThriftData must be used within a ThriftContextProvider");
  }
  return context;
};
