import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary/5">
      <FadeLoader color="#9346FF"  size={50} />
    </div>
  );
};

export default Loader;