import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../assets/CSS/Preloader.css';

function Preloader() {
    const location = useLocation();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            window.location.pathname = '/landing';
        }, 5000);

        return () => clearTimeout(redirectTimer);
    }, [location]);

    return (
        <div className="PreloaderBody">
            <div className="loader">
                <div className="loader-inner"></div>
            </div>
            <div className="typingg">
                Loading portfolio....
            </div>
        </div>
    );
}

export default Preloader;
