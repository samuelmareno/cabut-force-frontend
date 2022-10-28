import React, {useState} from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function DashboardScreen() {
    const [expanded, setExpanded] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Home');

    const handleNavbar = () => {
        setExpanded(!expanded);
    }

    const handleChangeMenu = (title) => {
        setSelectedMenu(title);
    }

    return (
        <section>
            <div className="flex flex-col w-screen h-screen">
                <Navbar handleClick={handleNavbar} expanded={expanded}/>
                <Sidebar handleClick={handleChangeMenu}
                         selectedMenu={selectedMenu}
                         expanded={expanded}
                />
            </div>
        </section>
    );
}