import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/layout/Header";
import PagenotFound from "./pages/PagenotFound";
import ProfileModal from "./components/miscellaneous/ProfileModal";
import { Login } from "./components/Authentication/Login/Login";
import { Signup } from "./components/Authentication/Login/Signup";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatprofile" element={<ProfileModal />} />
          <Route path="/*" element={<PagenotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
