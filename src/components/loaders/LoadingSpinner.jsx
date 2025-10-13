import { FadeLoader }from "react-spinners";

const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
    <FadeLoader color="#9346FF" size={60} />
  </div>
);

export default LoadingSpinner;