import { Button, Typography } from "@material-tailwind/react";
import Pic1 from "../static/imges.png";
// import Pic from "../images/imagee.jpg.png";
import { useState } from "react";
import axios from "axios";
// import { API_LINK } from "../cfg";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
const style =
  "w-[300px] h-[45px] px-6 pr-10 my-4 outline-none bg-[#383838ef] text-[white]";
function In({ setType }) {
  const [state, setState] = useState({});
  const navigate = useNavigate();
  function Submit() {
    axios.post(`http://localhost:5000/api/auth/signin`, state).then((res) => {
      const { success, message, access_token } = res.data;
      console.log(res.data);
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        localStorage.setItem("access_token", access_token);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    });
  }
  return (
    <>
      <div className="flex phone:hidden justify-between items-center w-[50%] p-6 min-h-[410px] flex-col ">
        <img src={Pic1} alt="rasm" />
      </div>
      <div className="flex flex-col justify-center items-end phone:items-center w-[50%] phone:w-full min-h-[400px] p-4 phone:p-1">
        <Typography variant="h3" className="text-[#000] mb-4">
          Aftorizatsiyani tiklash
        </Typography>
        <div className="flex relative justify-center items-center p-0 ">
          <input
            type="tel"
            placeholder="Reqamingiz"
            className={style}
            onChange={(e) =>
              setState({ ...state, phone_number: e.target.value })
            }
          />
          <i className="fas fa-phone absolute right-5 text-[yellow]"></i>
        </div>
        <div className="flex relative justify-center items-center  p-0 ">
          <input
            type="password"
            placeholder="Parolingiz"
            className={style}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <i className="fas fa-lock absolute right-5 text-[yellow]"></i>
        </div>
        <div className="w-full flex justify-end phone:justify-center items-center ">
          <Button color="yellow" className="w-[300px]" onClick={Submit}>
            Kirish
          </Button>
        </div>
        <div className="flex w-full flex-col p-2 justify-end phone:justify-center items-end phone:items-center ">
          <Typography className="text-[12px] mb-2 phone:text-[#fff]">
            Ro'yxatdan o'tganmisiz?
          </Typography>
          <Button
              variant="outlined"
              color="yellow"
              className="w-[300px]"
              onClick={() => {
                setType("up");
              }}
            >
              Ro'yxatdan o'tish
            </Button>
        </div>
      </div>
    </>
  );
}

export default In;
