import "../assets/CSS/Prototype-section.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const slides = [
    {
        image: "https://i.imgur.com/NBvMH7H.png",
        title: "Animation",
    },
    {
        image: "https://i.imgur.com/dXBbCXR.png",
        title: "CSS",
    },
    {
        image: "https://i.imgur.com/qcOXwPo.png",
        title: "HTML",
    },
    {
        image: "https://i.imgur.com/SSVVeuG.png",
        title: "React",
    },
];

function getRect(el) {
    return el.getBoundingClientRect();
}

function flip(firstRect, el) {
    requestAnimationFrame(() => {
        const lastEl = el;
        const lastRect = getRect(lastEl);
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

function useFlip(ref) {
    const rectRef = useRef(null);
    useLayoutEffect(() => {
        if (ref.current) {
            if (!rectRef.current) {
                rectRef.current = getRect(ref.current);
            }
            flip(rectRef.current, ref.current);
            rectRef.current = getRect(ref.current);
        }
    });
}

function useKeyDown(onKeyDown) {
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);
}

function ImageTitle(props) {
    const ref = useRef(null);
    useFlip(ref);

    return <span {...props} ref={ref} data-flip className="title" />;
}

function Image({ src, title, selected, ...props }) {
    const ref = useRef(null);
    useFlip(ref);

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

function PrototypeSection(props) {
    const [selected, setSelected] = useState(0);

    useKeyDown((event) => {
        switch (event.key) {
            case "ArrowRight":
                setSelected((selected) => (selected + 1) % slides.length);
                break;
            case "ArrowLeft":
                setSelected(
                    (selected) => (slides.length + (selected - 1)) % slides.length
                );
                break;
            default:
                break;
        }
    });

    return (
        <div>
            <div className="logo-prototype">
                {/* <div className="logo-p">{props.svg}</div> */}
                <div className="logo-t">
                    <span><a style={{ color: "white", textDecoration: "none" }} href="https://www.figma.com/proto/LceSUNxufCz4wIyP7wWAcs/Ezmanager?page-id=0%3A1&node-id=85-46&viewport=235%2C343%2C0.1&t=D8zh8BYYHvvhzSNY-1&scaling=scale-down&starting-point-node-id=85%3A46" target="_blank">{props.title} (click Here to view Figma LInk)</a></span>
                    <p>{props.subtitle}</p>
                </div>
            </div>
            <div>
                <div className="gallery">
                    {slides.map((slide, index) => {
                        return (
                            <Image
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

export default PrototypeSection;
