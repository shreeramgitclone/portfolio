import "../assets/CSS/Prototype-section.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const slides = [
    {
        image:
            "https://codersheart.in/Welcome page 4.png",
        title: "Animation",
    },
    {
        image:
            "https://codersheart.in/Dashboard.png",
        title: "CSS",
    },
    {
        image:
            "https://codersheart.in/Odering.png",
        title: "HTML",
    },
    {
        image:
            "https://codersheart.in/Reservations.png",
        title: "React",
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

function Nextprototype(props) {
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <div className="logo-prototype">
                <div className="logo-p">{props.svg}</div>
                <div className="logo-t">
                    <span><a style={{color: "white", textDecoration:"none"}} href="https://www.figma.com/proto/HYbd6m7tkKF0n7j2ssIyqS/PELLICCIS?page-id=0%3A1&node-id=94-11&viewport=367%2C162%2C0.08&t=oAhkfCpCDlFKAIgx-1&scaling=scale-down&starting-point-node-id=94%3A11">{props.title}</a></span>
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

export default Nextprototype;
