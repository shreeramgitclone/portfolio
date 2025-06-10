import "../assets/CSS/desktopaapp.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const slides = [
    {
        image: "https://i.ibb.co/9kbS77tG/add-order.png",
        title: "Animation",
    },
    {
        image: "https://i.ibb.co/N2Jd1Sgr/Dashboard.png",
        title: "CSS",
    },
   
];

function getRectnext(el) {
    return el.getBoundingClientRect();
}

function flipnext(firstRect, el) {
    requestAnimationFrame(() => {
        const lastEl = el;
        const lastRect = getRectnext(lastEl);
        const dx = lastRect.x - firstRect.x;
        const dy = lastRect.y - firstRect.y;
        const dw = lastRect.width / firstRect.width;
        const dh = lastRect.height / firstRect.height;
        lastEl.dataset.flipping = true;
        lastEl.style.setProperty("--dx", dx);
        lastEl.style.setProperty("--dy", dy);
        lastEl.style.setProperty("--dw", dw);
        lastEl.style.setProperty("--dh", dh);
        requestAnimationFrame(() => delete lastEl.dataset.flipping);
    });
}

function useFlipnext(ref) {
    const rectRef = useRef(null);
    useLayoutEffect(() => {
        if (ref.current) {
            if (!rectRef.current) {
                rectRef.current = getRectnext(ref.current);
            }
            flipnext(rectRef.current, ref.current);
            rectRef.current = getRectnext(ref.current);
        }
    });
}

function ImageTitle(props) {
    const ref = useRef(null);
    useFlipnext(ref);

    return <span {...props} ref={ref} data-flip className="title" />;
}

function Imagenext({ src, title, selected, ...props }) {
    const ref = useRef(null);
    useFlipnext(ref);

    return (
        <div
            {...props}
            className="image"
            key={src}
            data-selected={selected || undefined}
        >
            <img data-flip src={src} ref={ref} />
        </div>
    );
}

function Farmingprototype(props) {
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <div className="logo-prototype">
                {/* <div className="logo-p">{props.svg}</div> */}
                <div className="logo-t">
                    <span><a style={{color: "white", textDecoration:"none"}} href="https://www.figma.com/design/JU9tckszeXSLsyeQ4xMoT3/motioncar--Car-Rental-Landing-Page--Community-?node-id=0-1&t=Eqt4ijzpya6Qrcub-1" target="_blank">{props.title} (click Here to view Figma LInk)</a></span>
                    <p>{props.subtitle}</p>
                </div>
            </div>
            <div>
                <div className="gallery">
                    {slides.map((slide, index) => {
                        return (
                            <Imagenext
                                src={slide.image}
                                title={slide.title}
                                selected={index === selected}
                                key={index}
                                onClick={() => setSelected(index)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Farmingprototype;
