import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <img
        src="not-found.svg"
        className="h-screen p-10"
        alt=""
      />
      <button
      onClick={()=>{navigate('/',{replace:true})}}
        className={`hover:cursor-pointer absolute bottom-5 bg-primary w-[8rem] rounded-md px-3 py-2 hover:bg-secondary shadow-md cursor-pointer text-white font-semibold transition duration-300 ease-in-out`}
      >
        Home
      </button>
    </div>
  );
}

export default PageNotFound;
