import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

type NavButtonProps = {
  customFunc: () => void;
  icon: any;
  color: string;
};

type ProfileCardProps = {
  isShow: boolean;
  role: string;
};

const NavButton = (props: NavButtonProps) => (
  <button
    type="button"
    onClick={props.customFunc}
    style={{ color: props.color }}
    className="text-2xl material-symbols-rounded rounded-full p-4 hover:bg-light-gray"
  >
    {props.icon}
  </button>
);

const ProfileCard = (props: ProfileCardProps) => {
  const { setState, currentState } = useStateContext();
  return (
    <div
      className={`${
        props.isShow ? "flex flex-col" : "hidden"
      } absolute items-center justify-center gap-4 min-w-full md:w-[250px] right-0 bg-white rounded-lg p-2 mt-2 shadow-md`}
    >
      <p className="text-center">{props.role}</p>
      <p className="min-w-full bg-gray-500" style={{ height: "1px" }}></p>
      <div
        className="flex justify-center p-2 rounded-lg gap-4 hover:bg-light-gray min-w-full font-semibold"
        onClick={() => {
          setState({ ...currentState, ["isLoggedIn"]: false });
          window.open("/", "_self");
        }}
      >
        <button className="capitalize">Logout</button>
        <span className="material-symbols-rounded">logout</span>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    useStateContext();
  const [showProfileCard, setShowProfileCard] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    if (showProfileCard && screenSize <= 900 && activeMenu) {
      setShowProfileCard(false);
    }
  }, [activeMenu]);

  return (
    <nav className="flex justify-between p-2 md:mx-2 static">
      <NavButton
        icon={"menu"}
        color="blue"
        customFunc={() => setActiveMenu(!activeMenu)}
      />

      <div
        className={`${
          activeMenu && screenSize <= 900 ? "static" : "relative"
        } items-center cursor-pointer`}
      >
        <div
          className="flex gap-2 items-center p-2 hover:bg-light-gray rounded-lg"
          onClick={() => setShowProfileCard(!showProfileCard)}
        >
          <img
            src="https://www.une.edu/sites/default/files/styles/full_width/public/2021-05/default-person.png?itok=rCP6h0x5"
            className="rounded-full w-8 h-8"
            alt="Samuel Mareno"
          />
          <p>
            <span className="text-gray-400 text-14">Hi, </span>
            <span className="text-gray-400 font-bold ml-1 text-14">
              Samuel Mareno
            </span>
          </p>
        </div>

        <ProfileCard
          isShow={showProfileCard}
          role={
            "Anggota Tim Pemasar Dana dan Jasa Layanan (setingkat Pelaksana)"
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
