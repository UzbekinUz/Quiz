import { useState } from "react";
import { Link } from "react-router-dom";
import In from "./in";
import Up from "./up";
function Register({refresh, setRefresh}) {
  const [type, setType] = useState("in");

  return (
    <>
      <div className="flex justify-center phone:items-start phone:pt-10 items-center w-full h-[100vh] bg-opacity-60 bg-none ">
        <div className=" flex relative justify-between items-start w-[800px] min-h-[410px] border-[2px] rounded-[15px] bg-[yelow] phone:bg-[none] border-[#b1aeae43]">
          <Link to="/" className="absolute left-5 top-5">
            <i className="fas fa-house text-[#6d6a6a] hover:text-[blue] hover:text-[22px] transition-all-[5s]"></i>
          </Link>
          {type === "in" ? <In setType={setType} refresh={refresh} setRefresh={setRefresh}/> : <Up setType={setType} refresh={refresh} setRefresh={setRefresh}/>}
        </div>
      </div>
    </>
  );
}

export default Register;
