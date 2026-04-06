import React, { useEffect, useRef } from "react";
import "./Project.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portofolio from "../../assets/portfolio.png"
import realstate from "../../assets/realstate.png"
import Home from "../../assets/home.jpeg"
import apple from "../../assets/apple.png"

gsap.registerPlugin(ScrollTrigger);

const Project = ({reference}) => {
  const projectRef = useRef(null);
useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectRef.current,
        start: "3000 80%",
        end: "3000 20%",
        scrub: 1,
        // markers: true
      }
    });

    // 🔥 background + color change
    tl.fromTo(
      reference.current,
      {
        backgroundColor: "#000",
        color: "#fff"
      },
      {
        backgroundColor: "#fff",
        color: "#000",
        ease: "power2.out"
      }
    );

    // 🔥 cards animation (stagger inside timeline)
    tl.fromTo(
      ".project-card",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.3" // 🔥 overlap for smoothness
    );

  }, projectRef);

  return () => ctx.revert();
}, []);

  return (
   <section ref={projectRef} className="project-wrapper">

  <div className="project-header">
    <span>FEATURED PROJECTS (04)</span>
    <span>→ View all</span>
  </div>

  <div className="project-grid">

  <div className="project-card">
    <img src={Home} alt="" />
    <a href="https://github.com/Adityasikarwar70/Secure-Bidding-Platform" target="blank" className="overlay">BIDx</a>
  </div>

  <div className="project-card">
    <img src={apple} alt="" />
    <a href="https://github.com/Adityasikarwar70/Apple_Website" target="blank" className="overlay">Apple</a>

  </div>

  <div className="project-card">
    <img src={portofolio} alt="" />
    <a href="https://github.com/Adityasikarwar70/Portfolio" target="blank" className="overlay">Portfolio</a>
  </div>

  <div className="project-card">
    <img src={realstate} alt="" />
    <a href="https://github.com/Adityasikarwar70/RealState_Project" target="blank"  className="overlay">Realstate</a>
  </div>

</div>

</section>
  );
};

export default Project;