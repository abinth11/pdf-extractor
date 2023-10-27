import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/Navbar";
type Props = {};

function UserPage({}: Props) {
  return (
    <div className="">
      <NavBar/>
      <Outlet />
    </div>
  );
}

export default UserPage;
