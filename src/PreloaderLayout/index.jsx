import React from "react";
import { Outlet } from "react-router-dom";
function PreloaderLayout(){
    return(
        <>
            <div>
                    <Outlet />
            </div>
        </>
    );
}

export default PreloaderLayout;