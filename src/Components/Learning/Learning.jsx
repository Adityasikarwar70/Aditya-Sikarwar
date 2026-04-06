import React, { useEffect, useRef } from 'react'
import "./Learning.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../Utils/Utils.js"
import ParticleText from '../ParticleText/ParticleText.jsx';

gsap.registerPlugin(ScrollTrigger);

const Learning = ({ reference }) => {
    const learnRef = useRef(null);
    const containerRef = useRef(null);
    const iconsRef = useRef([]);
    useEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: learnRef.current,
                    start: "2800 80%",
                    end: "2800 65%",
                    scrub: 1,
                    // markers: true
                }
            });

            // 🔥 background + color change
            tl.fromTo(
                learnRef.current,
                {
                    y: 60,
                    width: "90%",
                    backgroundColor: "#fff",
                    color: "#fff"
                },
                {
                    y: 0,
                    width: "100%",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    ease: "power2.out"
                }
            );

            tl.fromTo(
                reference.current,
                {
                    // backgroundColor: "#fff",
                    color: "#fff"
                },
                {
                    backgroundColor: "#010000",
                    color: "#f4f4f4",
                    ease: "power2.out"
                }
            );

        }, learnRef);

        return () => ctx.revert();
    }, []);

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let rect = container.getBoundingClientRect();

  let mouse = { x: rect.width / 2, y: rect.height / 2 };

  const handleMouseMove = (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  };

  container.addEventListener("mousemove", handleMouseMove);

  const particles = iconsRef.current.map(() => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    radius: 35,
  }));

  let animationId;

  const animate = () => {
    particles.forEach((p, i) => {
      const el = iconsRef.current[i];
      if (!el) return;

      // 🔥 ALWAYS MOVING
      p.vx += (Math.random() - 0.5) * 0.03;
      p.vy += (Math.random() - 0.5) * 0.03;

      // 🔥 CURSOR REPULSION
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

      const cursorRadius = 150;

      if (dist < cursorRadius) {
        const force = (cursorRadius - dist) / cursorRadius;

        p.vx += (dx / dist) * force * 2;
        p.vy += (dy / dist) * force * 2;
      }

      // 🔥 PARTICLE REPULSION (MAGNET — NO OVERLAP)
      particles.forEach((other, j) => {
        if (i === j) return;

        let dx = p.x - other.x;
        let dy = p.y - other.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

        const safeDistance = p.radius * 2;

        if (dist < safeDistance) {
          const force = (safeDistance - dist) / safeDistance;

          p.vx += (dx / dist) * force * 1.5;
          p.vy += (dy / dist) * force * 1.5;
        }
      });

      // 🔥 SPEED CONTROL
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      const minSpeed = 0.4;
      const maxSpeed = 2.5;

      if (speed < minSpeed) {
        const angle = Math.random() * Math.PI * 2;
        p.vx = Math.cos(angle) * minSpeed;
        p.vy = Math.sin(angle) * minSpeed;
      }

      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // 🔥 SMOOTH MOTION
      p.vx *= 0.98;
      p.vy *= 0.98;

      // update
      p.x += p.vx;
      p.y += p.vy;

      // 🔥 WALL BOUNDS
      const padding = 10;

      if (p.x < padding) {
        p.x = padding;
        p.vx *= -0.5;
      }

      if (p.x > rect.width - 60 - padding) {
        p.x = rect.width - 60 - padding;
        p.vx *= -0.5;
      }

      if (p.y < padding) {
        p.y = padding;
        p.vy *= -0.5;
      }

      if (p.y > rect.height - 60 - padding) {
        p.y = rect.height - 60 - padding;
        p.vy *= -0.5;
      }

      // 🔥 APPLY
      el.style.transform = `
        translate(${p.x}px, ${p.y}px)
        rotate(${p.vx * 2}deg)
      `;
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    rect = container.getBoundingClientRect();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationId);
  };
}, []);





    return (
        <section ref={learnRef} className='learning-section'>

            <ParticleText text={"My Skills"} />

            <div className="skills-area" ref={containerRef}>
                {images.map((icon, i) => (
                    <img
                        key={i}
                        src={icon}
                        className="skill-icon"
                        ref={(el) => (iconsRef.current[i] = el)}
                    />
                ))}
            </div>

        </section>
    )
}

export default Learning