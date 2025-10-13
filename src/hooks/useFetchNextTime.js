import { useCallback, useEffect, useMemo, useState } from "react";
import multicallAbi from "../constants/multicallabi.json";
import { useAppKitNetwork } from "@reown/appkit/react";
import ABI from "../constants/singlethriftAbi.json";
import { useThriftData } from "../context/ThriftContextProvider";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract, Interface } from "ethers";

const useFetchnextTime = () => {
  const { allSingle, singleUser } = useThriftData();
  const { chainId } = useAppKitNetwork();
  const { readOnlyProvider } = useSignerOrProvider();
  const [singleThriftAll, setSingleThriftAll] = useState([]);
  const [singleThriftUser, setSingleThriftUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const itf = useMemo(() => new Interface(ABI), []);
  const multicallAddr = import.meta.env.VITE_MULTICALL2_ADDRESS;

  const normalizeAddresses = (input) => {
    if (!input) return [];
    if (Array.isArray(input)) return [...input];
    return Object.values(input).filter((v) => typeof v === "string");
  };

  const decodeThrift = (res) => {
    const raw = itf.decodeFunctionResult("getIndividualGoal", res.returnData)[0];
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
      frequency: Number(arr[11]),
    };
  };

  const fetchSingle = useCallback(async () => {
    if (!chainId || !readOnlyProvider) return;

    setLoading(true)

    const multicallContract = new Contract(
      multicallAddr,
      multicallAbi,
      readOnlyProvider
    );

    const normalizedAllSingle = normalizeAddresses(allSingle);
    const normalizedSingleUser = normalizeAddresses(singleUser);

    const allSingleCalls = normalizedAllSingle.map((addr) => ({
      target: addr,
      callData: itf.encodeFunctionData("getIndividualGoal"),
    }));

    const singleUserCalls = normalizedSingleUser.map((addr) => ({
      target: addr,
      callData: itf.encodeFunctionData("getIndividualGoal"),
    }));

    try {
      const [resultAll, resultUser] = await Promise.all([
        multicallContract.tryAggregate.staticCall(true, allSingleCalls),
        multicallContract.tryAggregate.staticCall(true, singleUserCalls),
      ]);

      // Decode and attach address
      const decodedAll = resultAll.map((res, idx) => ({
        address: normalizedAllSingle[idx],
        ...decodeThrift(res),
      }));

      const decodedUser = resultUser.map((res, idx) => ({
        address: normalizedSingleUser[idx],
        ...decodeThrift(res),
      }));

      setSingleThriftAll(decodedAll);
      setSingleThriftUser(decodedUser);
    } catch (error) {
      console.error("Failed to fetch individual thrifts:", error);
    } finally {
      setLoading(false)
    }
  }, [
    allSingle,
    singleUser,
    itf,
    multicallAddr,
    readOnlyProvider,
    chainId,
  ]);

  useEffect(() => {
    fetchSingle();
  }, [fetchSingle]);

  return {
    singleThriftAll,
    singleThriftUser,
    loading
  };
};

export default useFetchnextTime;
