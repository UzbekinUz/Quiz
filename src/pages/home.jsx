import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import SVG from "../static/lottie.svg";
import { useState } from "react";
function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="flex w-full min-h-[90vh] items-center justify-center phone:flex-col ">
        <div className="flax justify-center items-center p-5 ">
          <img src={SVG} alt="svg" className="w-[450px]" />
        </div>
        <div className="flex p-5 w-[800px] phone:max-w-full items-start justify-start flex-col">
          <Typography className="text-[40px] tablet:text-[35px] mini-phone:text-[28px] font-bold">
            <span className="text-[yellow]">Viktorinada qatnashing</span> va
            bilimingizni yanada mustahkamlang!
          </Typography>
          <Typography className="text-[18px] text-[#d7d7d7] mt-5">
            Viktorinalar asosan planimetrik shakillar formulalar asosida
            bo'ladi.Va siz hozir boshlang!
          </Typography>
          <Button
            onClick={handleOpen}
            color="yellow"
            className="w-[400px] phone:w-full mt-5 text-[20px]"
          >
            Testni boshlash
          </Button>
        </div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Test ishlashdagi ba'zi qoidalar.</DialogHeader>
          <DialogBody>
            <Typography className="text-[#555353] text-[18px]">
              1.Sizda har bir savol uchun 10 sekund bor.
              <br />
              2.Javob tanlaganingizdan so'ng o'zgartira olmaysiz.
              <br />
              3.Vaqt tugashi bilan hech qandayjavob tanlay olmaysiz.
              <br />
              4.Har bir to'g'ri javoblar uchun ballar olasiz
              <br />
              5.Unday bo'lsa boshladik!
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Yopish</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Boshlash</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}

export default Home;
