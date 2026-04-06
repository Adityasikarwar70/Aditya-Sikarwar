import { useEffect, useRef, useState } from "react";
import "./Canvas.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Canvas() {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([])
    const totalFrames = 120;


    useEffect(() => {
        const frameImages = [];
        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.src = `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.066s.png`;
            frameImages.push(img);
        }
        setImages(frameImages);

    }, [])



useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;
    canvas.width = 1092 * scale;
    canvas.height = 1080 * scale;
    context.scale(scale, scale);

    const frameState = { frame: 0 };

    const render = () => {
        const img = images[Math.floor(frameState.frame)];
        if (!img || !img.complete) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img,
            0,
            0,
            canvas.width / scale,
            canvas.height / scale
        );
    };

    gsap.to(frameState, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
            trigger: canvas, 
            start: "top top",
            end: "300% top", 
            scrub: true,
            pin: true, 
            // markers: true,
        },
    });

    if (images[0]) {
        images[0].onload = render;
        if (images[0].complete) render();
    }

    setTimeout(() => {
    ScrollTrigger.refresh(); 
  }, 300);

}, [images]);

    return (
        <canvas
            ref={canvasRef}
            className="canvas"
        />

    );
}