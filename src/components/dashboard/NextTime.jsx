import React, { useCallback, useEffect, useState } from "react";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/singlethriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { ethers } from "ethers";
import { getReadableDate } from "../shared/Reuse";

const NextTime = ({ thriftAddress, end }) => {
  const { signer, provider } = useSignerOrProvider();
  const errorDecoder = ErrorDecoder.create([abi]);

  const [countdown, setCountdown] = useState("");
  const [nextTime, setNextTime] = useState(null);
  const [isEnded, setIsEnded] = useState(false);

  const contract = new ethers.Contract(thriftAddress, abi, signer || provider);

  const handleFetchTime = useCallback(async () => {
    try {
      const tx = await contract.nextSavingTime();
      const nextTimestamp = Number(tx[0]);
      setNextTime(nextTimestamp);
      setIsEnded(false);
      console.log("Next saving time:", getReadableDate(nextTimestamp));
    } catch (err) {
      const decoded = await errorDecoder.decode(err).catch(() => null);
      console.error("Contract error:", decoded?.reason || err);
    }
  }, [contract, errorDecoder]);

  useEffect(() => {
    handleFetchTime();
  }, [handleFetchTime]);

  useEffect(() => {
    if (!nextTime) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = nextTime - now;
      const endTime = Number(end);

      // Case 1: Countdown still running
      if (remaining > 0) {
        const days = Math.floor(remaining / 86400);
        const hours = Math.floor((remaining % 86400) / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        return;
      }

      if (now < endTime) {
        setCountdown("Due now! Fetching next cycle...");
        handleFetchTime(); 
      }

      // Case 3: End date reached
      if (now >= endTime) {
        setIsEnded(true);
        setCountdown("Savings period ended");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextTime, end, handleFetchTime]);

  return (
    <div className="bg-white text-primary border border-gray-200 rounded-full py-2 px-4 shadow-sm text-sm font-medium text-center">
      {isEnded ? (
        <span className="font-semibold">Savings period ended</span>
      ) : countdown ? (
        <>
          Next saving: <span className="font-semibold">{countdown}</span>
        </>
      ) : (
        "Fetching next saving time..."
      )}
    </div>
  );
};

export default NextTime;