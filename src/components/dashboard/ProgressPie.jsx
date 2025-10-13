import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressPie = ({ percentage }) => {

  return (
    <div className="flex w-[60px] h-[60px] justify-center items-center bg-dark rounded-full mx-auto"
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: "round",
          textSize: "14px",
          pathTransitionDuration: 0.9,
          pathColor: "#6138FE", 
          textColor: "#fff",
          trailColor: "#d6d6d6", 
        })}
      />
    </div>
  );
};

export default ProgressPie;
