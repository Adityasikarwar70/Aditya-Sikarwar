import React, { useEffect, useRef } from 'react'
import "./SocialLinks.css"
import gsap from "gsap"

// import linkedin from "./images/linkedin.png"
// import github from "./images/github.svg"
// import email from "./images/email.png"
// import resume from "./images/resume.png"

const SocialLinks = () => {
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(linksRef.current, {
        x: 150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      
      gsap.from(".links a", {
        x: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

    }, linksRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={linksRef} className='links'>

      <a href="https://linkedin.com/in/adityasikarwar1" target="_blank" rel="noreferrer">
        <img src="/images/linkedIn.png" alt="LinkedIn" />
      </a>

      <a href="https://github.com/AdityaSikarwar70" target="_blank" rel="noreferrer">
        <img src="/images/github.svg" alt="GitHub" />
      </a>

      <a href="mailto:bs151439@gmail.com">
        <img src="/images/email.png" alt="Email" />
      </a>

      <a href="/resume.pdf" target="_blank" rel="noreferrer">
        <img src="/images/resume.png" alt="Resume" />
      </a>

    </div>
  )
}

export default SocialLinks