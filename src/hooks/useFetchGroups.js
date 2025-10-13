import { useCallback, useEffect, useMemo, useState } from "react";
import multicallAbi from "../constants/multicallabi.json";
import { useAppKitNetwork } from "@reown/appkit/react";
import ABI from "../constants/groupthriftAbi.json";
import { useThriftData } from "../context/ThriftContextProvider";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract, Interface } from "ethers";

const useFetchGroups = () => {
  const { allGroup, groupUser } = useThriftData(); 
  const { chainId } = useAppKitNetwork();
  const { readOnlyProvider } = useSignerOrProvider();
  const [groupThriftAll, setGroupThriftAll] = useState([]);
  const [groupThriftUser, setGroupThriftUser] = useState([]);
  const [loading, setLoading] = useState(false)

  const itf = useMemo(() => new Interface(ABI), []);
  const multicallAddr = import.meta.env.VITE_MULTICALL2_ADDRESS;

  const normalizeAddresses = (input) => {
    if (!input) return [];
    if (Array.isArray(input)) return [...input];
    return Object.values(input).filter((v) => typeof v === "string");
  };

  const decodeThrift = (res) => {
    const raw = itf.decodeFunctionResult("getGroupGoal", res.returnData)[0];
    const arr = Array.from(raw);

    return {
      creator: arr[0],
      currency: arr[1],
      goalId: Number(arr[2]),
      title: arr[3],
      goal: arr[4].toString(),
      saved: arr[5].toString(),
      amountPerPeriod: arr[6].toString(),
      isClosed: arr[7],
      startDate: Number(arr[8]),
      endDate: Number(arr[9]),
      lastsaved: Number(arr[10]),
      totalMember: Number(arr[11]),
      memberAddress: arr[12],
      frequency: Number(arr[13]),
    };
  };

  const fetchGroup = useCallback(async () => {
    if (!chainId || !readOnlyProvider) return;

    setLoading(true)

    const multicallContract = new Contract(
      multicallAddr,
      multicallAbi,
      readOnlyProvider
    );

    const normalizedAllGroup = normalizeAddresses(allGroup);
    const normalizedGroupUser = normalizeAddresses(groupUser);

    const allGroupCalls = normalizedAllGroup.map((addr) => ({
      target: addr,
      callData: itf.encodeFunctionData("getGroupGoal"),
    }));

    const groupUserCalls = normalizedGroupUser.map((addr) => ({
      target: addr,
      callData: itf.encodeFunctionData("getGroupGoal"),
    }));

    try {
      const [resultAll, resultUser] = await Promise.all([
        multicallContract.tryAggregate.staticCall(true, allGroupCalls),
        multicallContract.tryAggregate.staticCall(true, groupUserCalls),
      ]);

      const decodedAll = resultAll.map((res, i) => ({
        ...decodeThrift(res),
        address: normalizedAllGroup[i], // attach address
      }));

      const decodedUser = resultUser.map((res, i) => ({
        ...decodeThrift(res),
        address: normalizedGroupUser[i], // attach address
      }));

      setGroupThriftAll(decodedAll);
      setGroupThriftUser(decodedUser);
    } catch (error) {
      console.error("Failed to fetch individual thrifts:", error);
    } finally {
      setLoading(false)
    }
  }, [allGroup, groupUser, itf, multicallAddr, readOnlyProvider, chainId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  return {
    groupThriftAll,
    groupThriftUser,
    loading
  };
};

export default useFetchGroups;