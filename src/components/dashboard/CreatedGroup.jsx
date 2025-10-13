import { Link } from "react-router";
import { PiVaultBold } from "react-icons/pi";
import useFetchGroups from "../../hooks/useFetchGroups";
import tokenList from "../../constants/tokenList.json";
import { formatUnits } from "ethers";
import LoadingSpinner from "../loaders/LoadingSpinner";

const CreatedGroup = () => {
  const { groupThriftUser, loading } = useFetchGroups();

  const getTokenDecimals = (currencyAddress) => {
    const token = tokenList[currencyAddress];
    return token?.decimals || 18;
  };

  const getReadableAmount = (rawAmount, currencyAddress) => {
    const decimals = getTokenDecimals(currencyAddress);
    return parseFloat(formatUnits(rawAmount, decimals)).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    );
  };

  const getReadableDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loading && (!groupThriftUser || groupThriftUser.length === 0)) {
    return (
      <div className="w-full flex justify-center items-center py-6">
        <p className="text-gray-500">No savings history found.</p>
      </div>
    );
  }

  return (
    <div className="w-[100%] flex justify-between items-center flex-col lg:flex-row md:flex-row mt-6">
      {groupThriftUser.map((info) => {
        const start = getReadableDate(info.startDate);
        const end = getReadableDate(info.endDate);

        return (
          <div
            className="flex items-center justify-between w-[100%] mx-auto mb-3"
            key={info.goalId}
          >
            <div className="bg-[#EAE3F8] flex justify-center items-center p-3 text-primary rounded-full w-[50px] h-[50px] text-2xl mr-2">
              <PiVaultBold />
            </div>
            <div className="w-[55%]">
              <h3 className="text-[14px] font-[600]">
                {info.title}
                <span className="text-[10px] text-textGrey">
                  ({info.totalMembers} Member/s)
                </span>
              </h3>

              <p className="text-[14px] text-grey"> Status: {info.isClosed ? "Inactive" : "Ongoing"} </p>
              <p className="text-grey text-[10px]">View all participants</p>
            </div>
            <div className="lg:w-[25%] md:w-[25%] w-[100%]">
              <p className="font-[600] text-[10px] mb-2 text-right">
                Created {start}
              </p>
              <Link
                to={`/dashboard/group-savings/${info.goalId}`}
                className="flex justify-center items-center text-center border rounded-full border-primary p-2 text-[12px] w-[100%] mb-3"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreatedGroup;
