import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import PageNotFound from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserPage />}>
        <Route index={true} element={<Homepage />} />
      </Route> 
      <Route path="/sign-up" element={<SignUpPage/>}/>
      <Route path="/sign-in" element={<SignInPage/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes> 
  );
}

export default App;
