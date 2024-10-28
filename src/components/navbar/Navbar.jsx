import "./navbar.scss"
import "../../responsive.scss"
import { useState } from "react";

function Navbar(){
    const [openMenu, setOpenMenu] = useState(false)
return(
    <nav>
        <div className="leftSide">
            <img className="ourLogo" src="/urbanNestLogo.png" alt="logo" />
            <a href="/">
                Urban Nest
            </a>
           
        </div>

        <div className="midSide">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
            <a href="/">Agents</a>
        </div>

        <div className="rightSide">
        <a href="/">Sign In</a>
        <a className="signUp" href="/">Sign Up</a>
        <div className="menuPic">
            <img src="/icons8-menu-36.png" alt="menuPic1" onClick={() => setOpenMenu((prev) => !prev)} />
        </div>
        <div className={openMenu ? "menuSection active" : "menuSection"}>
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
            <a href="/">Agents</a>
            <a href="/">Sign In</a>
            <a href="/">Sign Up</a>
        </div>
        </div>
    </nav>
)
}
export default Navbar;