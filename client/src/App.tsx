import { Route, Routes } from "react-router-dom";
import UserHomePage from "./pages/UserHomePage";
import UserPage from "./pages/UserPage";
import PageNotFound from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ExtractPage from "./pages/ExtractPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserPage />}>
        <Route index={true} element={<UserHomePage />} />
        <Route path="/extract-pages" element={<ExtractPage/>}/>
      </Route> 
      <Route path="/sign-up" element={<SignUpPage/>}/>
      <Route path="/sign-in" element={<SignInPage/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes> 
  );
}

export default App;
