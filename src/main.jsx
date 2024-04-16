import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register";
import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({ auth: false });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/check`, {
        headers: {
          "x-auth-token": localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const { success, userInfo } = res.data;
        if (success) {
          setRefresh(!refresh);
          setUser({ auth: true, ...userInfo });
        } else {
          setUser({ auth: false });
          setRefresh(!refresh);
        }
      });
  }, [refresh]);
  return (
    <>
      <Navbar user={user}/>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Register />} path="/autorization" />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
