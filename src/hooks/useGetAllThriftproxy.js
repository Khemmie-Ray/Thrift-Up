import {useCallback,useEffect,useState} from "react";
import ABI from "../constants/abi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { Contract, Interface } from "ethers";
import multicallAbi from "../constants/multicallabi.json";
import useContractInstance from "./useContractInstance";
import useSignerOrProvider from "./useSignerOrProvider";


const useGetAllThriftproxy = () => {
  const [singleUser, setSingleUser] = useState([]);
  const [groupUser, setGroupUser] = useState([]);
  const [allSingle, setAllSingle] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const { address } = useAppKitAccount();
  const contract = useContractInstance(true);
  const { readOnlyProvider } = useSignerOrProvider();

  const fetchThrifts = useCallback(async () => {
    if (!contract) return;

    const multicallContract = new Contract(
      import.meta.env.VITE_MULTICALL2_ADDRESS,
      multicallAbi,
      readOnlyProvider
    );

    const itf = new Interface(ABI);

    try {
      const calls = [
        {
          target: import.meta.env.VITE_CONTRACT_ADDRESS,
          callData: itf.encodeFunctionData("getAllSingleProxy"),
        },
        {
          target: import.meta.env.VITE_CONTRACT_ADDRESS,
          callData: itf.encodeFunctionData("getAllGroupProxy"),
        },
        {
          target: import.meta.env.VITE_CONTRACT_ADDRESS,
          callData: itf.encodeFunctionData("getAllUserGroupProxy", [address]),
        },
        {
          target: import.meta.env.VITE_CONTRACT_ADDRESS,
          callData: itf.encodeFunctionData("getAllUserSingleProxy", [address]),
        },
      ];

      const responses = await multicallContract.tryAggregate.staticCall(
        true,
        calls
      );

      const decodedResults = responses.map((res) =>
        itf.decodeFunctionResult("getAllSingleProxy", res.returnData)
      );

      console.log(decodedResults);
    } catch (e) {
      console.log(e);
    }
  }, [readOnlyProvider, contract]);

   useEffect(() => {
        fetchThrifts();
    }, [fetchThrifts]);
};

export default useGetAllThriftproxy;
