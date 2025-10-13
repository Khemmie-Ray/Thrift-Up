import React, { useState } from "react";
import { DashNav, Button } from "../../components/shared/Reuse";
import { ethers} from "ethers";
import useCreateThrift from "../../hooks/useCreateThrift";
import { toast } from "react-toastify";
import tokenList from "../../constants/tokenList.json";
import { useNavigate } from "react-router";

const CreateGroupModule = () => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [savingFrequency, setSavingFrequency] = useState("");
  const [vaultAddress, setVaultAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participant, setParticipant] = useState(1);
  const navigate = useNavigate()

  const handleCreate = useCreateThrift();

  const handleCreateThrift = async () => {
    const startDate = Math.floor(new Date(startTime).getTime() / 1000);
    const endDate = Math.floor(new Date(endTime).getTime() / 1000);

    if (startDate <= Math.floor(Date.now() / 1000)) {
      toast.error("Start time cannot be in the past", {
        position: "top-center",
      });
      return;
    }

    if (endDate <= startDate) {
      toast.error("End time must be after start time", {
        position: "top-center",
      });
      return;
    }

    const selectedToken = tokenList[vaultAddress];
    if (!selectedToken) {
      toast.error("Invalid token selected", {
        position: "top-center",
      });
      return;
    }

    const goalAmountInWei = ethers.parseUnits(
      goalAmount,
      selectedToken.decimals
    );

    await handleCreate(
      goalName,
      goalAmountInWei.toString(),
      savingFrequency,
      vaultAddress,
      startDate,
      endDate,
      participant
    );
    setGoalAmount("");
    setGoalName("");
    setParticipant(1);
    setStartTime("");
    setEndTime("");
    setVaultAddress("");
    setSavingFrequency("");
    navigate("/dashboard/group-savings")
  };

  return (
    <div>
      <DashNav>Create Group Module</DashNav>
      <div className="bg-white my-6 mx-8 p-6">
        <h3 className="font-[600] mb-4 text-[20px] lg:text-[24px] md:text-[24px] mt-6 text-center leading-0">
          Create Group Module
        </h3>
        <p className="text-[14px] font-[500] text-lightgray text-center">
          Fill out the form below to start saving
        </p>

        <div className="w-[100%] lg:w-[50%] md:w-[60%] mx-auto my-8">
          <div className="my-4">
            <label className="text-[14px] font-[500]">
              Savings title 
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="This should contain your financial goals"
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            />
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">
              Savings amount / target amount
            </label>
            <input
              type="text"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="Add your target amount"
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            />
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">Saving frequency</label>
            <select
              value={savingFrequency}
              onChange={(e) => setSavingFrequency(e.target.value)}
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            >
              <option value="" disabled>
                Click on the arrow to select an option
              </option>
              <option value={0}>Daily</option>
              <option value={1}>Weekly</option>
              <option value={2}>Bi-Weekly</option>
              <option value={3}>Monthly</option>
            </select>
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">Pick Currency</label>
            <select
              value={vaultAddress}
              onChange={(e) => setVaultAddress(e.target.value)}
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            >
              <option value="" disabled>
                Click on the arrow to select an option
              </option>
              {Object.keys(tokenList).map((address) => {
                const token = tokenList[address];
                return (
                  <option key={token.address} value={token.address}>
                    {token.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">Start Time</label>
            <input
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            />
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">End Time</label>
            <input
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            />
          </div>
          <div className="my-4">
            <label className="text-[14px] font-[500]">
              Number of Participants (1 upwards)
            </label>
            <input
              type="number"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
              placeholder="Input Number of participants"
              className="p-3 border border-lightgray block w-[100%] text-xs rounded-lg"
            />
          </div>
          <button
            onClick={handleCreateThrift}
            className="bg-linear-to-r from-primary to-lilac font-[500] text-white py-3 px-6 mt-3 text-[16px] flex justify-center rounded-full hover:scale-105 items-center w-[100%]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModule;
