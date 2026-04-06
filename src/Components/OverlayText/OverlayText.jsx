import React, { useEffect, useRef } from 'react'
import "./OverlayText.css"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mern from "../../assets/mern.png"
import cat from "../../assets/loadcat.gif"

gsap.registerPlugin(ScrollTrigger)

const OverlayText = () => {
    const text1 = useRef(null);
    const text2 = useRef(null);
    const text3 = useRef(null);
    const text4 = useRef(null);

    useEffect(() => {
  const tl = gsap.timeline();

  tl.to(".char", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    stagger: 0.04, 
    duration: 1,
    ease: "power4.out",
  });
  tl.to(".char", {
    y: 0,
    opacity: 0,
    filter: "blur(0px)",
    stagger: 0.04,
    duration: 0.5,
    ease: "power4.out",
  });
}, []);

useEffect(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".canvas",
            start: "50px top",
            end: "300% top",
            scrub: true,
        }
    });

   
    tl.fromTo(text1.current,
        { opacity: 0, x: -100, y: 80 },
        { opacity: 1, x: 0, y: 40, duration: 1.5, ease: "power3.out" }
    )
    .to(text1.current,
        { opacity: 0, x: -100, y: -40, duration: 1.5 }
    )

  
    .fromTo(text2.current,
        { opacity: 0, x: 100, y: -40 },
        { opacity: 1, x: 50, y:40, duration: 1.5, ease: "power3.out" }
    )
    .to(text2.current,
        { opacity: 0, x: 100, y: -100, duration: 1.5 }
    )

  
    .fromTo(text3.current,
        { opacity: 0, x: -100, y: 100 },
        { opacity: 1, x: 30, y: 10, duration: 1.5, ease: "power3.out" }
    )
    .to(text3.current,
        { opacity: 0, x: -120, y: -80, duration: 1.5 }
    )

 
    .fromTo(text4.current,
        { opacity: 0, x: 100, y: 100 },
        { opacity: 1, x: 0, y: 50, duration: 1.5, ease: "power3.out" }
    )
    .to(text4.current,
        { opacity: 0, x: 120, y: -60, duration: 1.5 }
    );

}, []);

    return (
        <div className='overlay-wrapper'>
            <div className="name-wrapper">
            <div className='secondFont name'>
                <p className="name-line">
                    {"Aditya".split("").map((char, i) => (
                        <span key={i} className="char">{char}</span>
                    ))}
                </p>

                <p className="name-line">
                    {"Singh".split("").map((char, i) => (
                        <span key={i} className="char">{char}</span>
                    ))}
                </p>
            </div>
            </div>

            <div ref={text1} className='MainFont overlay-text left-text'>
                <p>Hi, I'm Aditya</p>
            </div>

            <div ref={text2} className='MainFont overlay-text right-text'>
                <p>Full Stack Developer</p>
                <p>1+ Year</p>

            </div>

            <div ref={text3} className=' MainFont overlay-text left-text '>
                <img className='cat' src={cat} alt="loading cat" height={80}  /> 
            </div>
            <div ref={text4} className='MainFont overlay-text right-text'>
                <p>Let's Work Together</p>
                <button type='button' className='contact float-end'>I ❤️ Cat <img src={cat} alt="loading cat" height={30} /> </button>
            </div>
        </div>
    )
}

export default OverlayText