import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken,clearUser } from "../../features/slices/userSlice";

export const NavBarDropDown = () => {
  const dispatch = useDispatch()
  const dropDownItemsClasses =
    "text-[13px] font-normal p-2.5 hover:bg-gray-100 flex flex-row gap-1.5 items-center";

  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken())
    dispatch(clearUser())
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#drop-down")) {
        setDrop(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={"flex flex-row items-center gap-5 h-7 w-7 relative"}
        id={"drop-down"}
      >
        <div
          className={
            "h-full border-accent-color-one profile-picture cursor-pointer"
          }
          onClick={() => setDrop((state) => !state)}
        >
          <img
            src={
              "https://res.cloudinary.com/dwucedjmy/image/upload/v1697217305/hacker_iwr5go.png"
            }
            alt={"Profile"}
            className={"object-cover h-full  rounded border-accent-color-one"}
          />
        </div>
        {drop && (
          <div
            className={`navbar-dropdown z-50 fixed md:absolute top-14 right-0 bg-white shadow-md rounded 
          flex flex-col w-screen md:w-fit min-w-[200px]`}
            id={"second-component"}
          >
            <div
              className={
                "flex flex-row w-min justify-center gap-2.5 border p-2.5 rounded m-2.5"
              }
            >
              <div style={{ width: "30px", height: "30px" }}>
                <img
                  src={
                    " https://res.cloudinary.com/dwucedjmy/image/upload/v1697217305/hacker_iwr5go.png"
                  }
                  alt={"Profile"}
                  className={
                    "object-cover rounded h-full w-full border-accent-color-one"
                  }
                />
              </div>
              <div className={"w-max"}>
                <p className={"text-[11px]"}>Logged in as</p>
                <p className={"text-[13px] "}>{"User"}</p>
              </div>
            </div>
            <ul className={"w-full flex flex-col cursor-pointer"}>
              <li
                className={dropDownItemsClasses + " text-danger"}
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
