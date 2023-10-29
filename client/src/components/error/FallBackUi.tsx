import { BsExclamationCircleFill } from "react-icons/bs";
const FallbackUI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="p-4">
     <BsExclamationCircleFill className={"w-16 h-16 text-primary"}/>
    </div>
    <h2 className="text-xl font-semibold">Something went wrong!</h2>
    <p className="text-gray-500">Please try again later.</p>
  </div>
  );
};

export default FallbackUI;
