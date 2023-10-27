import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserPage />}>
        <Route index={true} element={<Homepage />} />
      </Route> 
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
