import React, { useCallback, useEffect, useState } from "react";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../../constants/singlethriftAbi.json";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { ethers } from "ethers";

const NextTime = ({ thriftAddress }) => {
  const { signer } = useSignerOrProvider();
  const errorDecoder = ErrorDecoder.create([abi]);

  const [countdown, setCountdown] = useState("");
  const [nextTime, setNextTime] = useState(null);

  const contract = new ethers.Contract(thriftAddress, abi, signer);

  const handleFetchTime = useCallback(async () => {
    try {
      const tx = await contract.nextSavingTime();
      const nextTimestamp = Number(tx[0]); 
      setNextTime(nextTimestamp);
      console.log("Next saving time:", nextTimestamp);
    } catch (err) {
      console.log("Contract error:", err);
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

      if (remaining <= 0) {
        setCountdown("Due now!");
        clearInterval(interval);
      } else {
        const days = Math.floor(remaining / 86400);
        const hours = Math.floor((remaining % 86400) / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextTime]);

  return (
    <div className="bg-white text-primary border border-gray-200 rounded-full py-2 px-4 shadow-sm text-sm font-medium text-center">
      {countdown ? (
        <>
          Next saving in: <span className="font-semibold">{countdown}</span>
        </>
      ) : (
        "Fetching next saving time..."
      )}
    </div>
  );
};

export default NextTime;
