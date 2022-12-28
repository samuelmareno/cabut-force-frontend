import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useUserState from "../../hooks/useUserState";
import {useStateContext} from "../../contexts/ContextProvider";

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
        style={{color: props.color}}
        className="rounded-full p-4 text-2xl material-symbols-rounded hover:bg-light-gray"
    >
        {props.icon}
    </button>
);

const ProfileCard = (props: ProfileCardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className={`${
                props.isShow ? "flex flex-col" : "hidden"
            } absolute items-center justify-center gap-4 min-w-full md:w-[250px] right-0 bg-white rounded-lg p-2 mt-2 shadow-md`}
        >
            <p className="text-center">{props.role}</p>
            <p className="min-w-full bg-gray-500" style={{height: "1px"}}></p>
            <div
                className="flex min-w-full justify-center gap-4 rounded-lg p-2 font-semibold hover:bg-light-gray"
                onClick={ () => {
                    localStorage.removeItem("jwt");
                    navigate("/login");
                }}
            >
                <button className="capitalize">Logout</button>
                <span className="material-symbols-rounded">logout</span>
            </div>
        </div>
    );
};

const Navbar = () => {
    const {activeMenu, setActiveMenu, screenSize, setScreenSize} = useStateContext();
    const [showProfileCard, setShowProfileCard] = useState(false);
   const userState = useUserState();

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

        // eslint-disable-next-line
    }, [screenSize]);

    useEffect(() => {
        if (showProfileCard && screenSize <= 900 && activeMenu) {
            setShowProfileCard(false);
        }

        // eslint-disable-next-line
    }, [activeMenu]);

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <nav className="static flex justify-between p-2 md:mx-2">
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
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-light-gray"
                    onClick={() => setShowProfileCard((prev) => !prev)}
                >
                    <img
                        src="https://www.une.edu/sites/default/files/styles/full_width/public/2021-05/default-person.png?itok=rCP6h0x5"
                        className="h-8 w-8 rounded-full"
                        alt="Samuel Mareno"
                    />
                    <p>
                        <span className="text-gray-400 text-14">Hi, </span>
                        <span className="ml-1 font-bold text-gray-400 text-14">
              {userState.name}
            </span>
                    </p>
                </div>

                <ProfileCard
                    isShow={showProfileCard}
                    role={userState.role}
                />
            </div>
        </nav>
    );
};

export default Navbar;
