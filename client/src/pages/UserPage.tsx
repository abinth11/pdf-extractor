import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/Navbar";
type Props = {};

function UserPage({}: Props) {
  return (
    <div className='h-screen w-full'>
      <NavBar />
      <div className="w-full mt-[75px]">
        <Outlet />
      </div>
    </div>
  );
}

export default UserPage;
