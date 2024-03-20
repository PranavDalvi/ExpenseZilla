// Package import
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS import
import "./App.css";
import {History} from "./pages/AllTransactions"; 
// User defined Context
import { AuthContextProvider } from "./context/AuthContext";
import LogIn from "./pages/LogIn";
// User defined Components
import MainApp from "./pages/MainApp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Analysis } from "./pages/Analysis";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/app"element={<ProtectedRoutes><MainApp /></ProtectedRoutes>}/>
          <Route path="/history" element={<ProtectedRoutes><History /></ProtectedRoutes>} />
          <Route path="/analysis" element={<ProtectedRoutes><Analysis/></ProtectedRoutes>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
