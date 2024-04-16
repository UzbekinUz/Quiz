import { Button, Typography } from "@material-tailwind/react";
// import Pic1 from "../images/imges.png";
import Pic from "../static/imagee.jpg";
import { useState } from "react";
import axios from "axios";
// import { API_LINK } from "../cfg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const style = "w-[300px] h-[45px] px-6 pr-10 my-4 outline-none bg-[#cdcaca64]";
function Up({ setType , setRefresh, refresh }) {
  const [state, setState] = useState({});
  const navigate = useNavigate()
  function Submit() {
    axios.post(`http://localhost:5000/api/auth/signup`, state).then((res) => {
      const { success, message, access_token } = res.data;
      console.log(res.data);
      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        localStorage.setItem("access_token", access_token);
        setTimeout(() => {
            setRefresh(!refresh)
            navigate('/')
        }, 1500);
      }
    });
  }
  return (
    <>
      <div className="flex  justify-between items-center w-[50%] p-6 min-h-[410px] flex-col ">
        <img src={Pic} alt="rasm" />
        <Typography variant="h3" className="text-[#6f6e6e] mt-5">
          Ro'yxatdan o'tish
        </Typography>
      </div>
      <div className="flex flex-col justify-start items-end w-[50%] min-h-[400px] p-4">
        <div className="flex relative justify-center items-center p-0 ">
          <input
            type="text"
            placeholder="To'liq ismingiz"
            className={style}
            onChange={(e) => setState({ ...state, full_name: e.target.value })}
          />
          <i className="fas fa-user absolute right-5"></i>
        </div>
        <div className="flex relative justify-center items-center p-0 ">
          <input
            type="tel"
            placeholder="Reqamingiz"
            className={style}
            onChange={(e) =>
              setState({ ...state, phone_number: e.target.value })
            }
          />
          <i className="fas fa-phone absolute right-5"></i>
        </div>
        <div className="flex relative justify-center items-center p-0 ">
          <input
            type="password"
            placeholder="Parolingiz"
            className={style}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <i className="fas fa-lock absolute right-5"></i>
        </div>
        <div className="flex relative justify-center items-center p-0 ">
          <input
            type="password"
            placeholder="Parolni qaytaring!"
            className={style}
            onChange={(e) => setState({ ...state, repassword: e.target.value })}
          />
          <i className="fas fa-refresh absolute right-5"></i>
        </div>
        <div className="w-full flex justify-end items-center">
          <Button
            variant="outlined"
            color="blue"
            className="w-[300px]"
            onClick={Submit}
          >
            Tasdiqlash
          </Button>
        </div>
        <div className="flex w-full p-2 justify-end items-end">
          <Typography className="text-[12px]">
            Allaqachon accountiz bormi?{"    "}
            <Link
              onClick={() => {
                setType("in");
              }}
            >
              Kirish!
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Up;
