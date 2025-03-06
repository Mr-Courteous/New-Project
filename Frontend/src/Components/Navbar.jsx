import React from "react";
// import { ReactDOM } from "react";

function NavBarSection() {
    return (
        <div className="nav">

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/adminLogin">Admin Login</a></li>
                <li><a href="/teacherLogin">Teacher Login</a></li>
                <li><a href="/studentLogin">Student Login</a></li>
                {/* <li><a href="/adminReg">Admin Registration</a></li>
               <li><a href="/teacherReg">Teacher Registration</a></li>
               */}
                <li><a href="/StudentReg">Student Registration</a></li>


            </ul>

        </div>
    )
}

export default NavBarSection;