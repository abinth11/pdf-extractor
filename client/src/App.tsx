import { Route, Routes } from "react-router-dom";
import UserHomePage from "./pages/user/UserHomePage";
import UserPage from "./pages/user/UserPage";
import PageNotFound from "./pages/error/PageNotFound";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import ExtractPage from "./pages/pdf-pages/ExtractPage";
import PdfDownloadPage from "./pages/pdf-pages/PdfDownloadPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserPage />}>
        <Route index={true} element={<UserHomePage />} />
        <Route path="/extract-pages/:pdfId" element={<ExtractPage/>}/>
        <Route path="/download-pdf/:downloadId" element={<PdfDownloadPage/>}/>
      </Route> 
      <Route path="/sign-up" element={<SignUpPage/>}/>
      <Route path="/sign-in" element={<SignInPage/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes> 
  );
}

export default App;
