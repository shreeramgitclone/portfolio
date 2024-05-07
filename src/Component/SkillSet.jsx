import React from "react";
import '../assets/CSS/SkillSet.css';
function SkillSet(props) {
    return (
        <>
            <div className="logo-title">
                <div className="logo">
                    {props.svg}
                </div>
                <div className="logo-title">
                    {props.title}
                </div>
            </div>
        </>
    );
}
export default SkillSet;