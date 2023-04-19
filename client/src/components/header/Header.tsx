import React from "react";
import Navigation from "./Navigation";

const Header:React.FC =()=> {
    return (
        <nav className="max-w-7xl mx-auto p-3 flex justify-between items-center">
            <div className="logo-wrapper flex">
                <a href="#" className="text-2xl">
                    <span className="font-medium text-blue-500">B</span>
                    <span className="">logi</span>
                    <span className="italic">.fy</span>
                </a>
            </div>
            <Navigation />
        </nav>
    )
}

export default Header;