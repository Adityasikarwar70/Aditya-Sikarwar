import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Home.css"
import { experence } from "../Utils/Utils.js"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const textRef = useRef(null);
  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const words = text.innerText.split(" ");

    text.innerHTML = words
      .map(word => `<span class="word">${word}</span>`)
      .join(" ");

    const wordElements = text.querySelectorAll(".word");


    gsap.set(wordElements, {
      opacity: 0,
      y: 40,
      filter: "blur(5px)",
    });

    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.05,
      duration: 0.5,
      scrub: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: text,          
        start: "2500 80%",  
        end: "2500 50%",  
        toggleActions: "play none none none",
        // markers: true,          
      },
    });




  }, []);

  useEffect(() => {
    const container = document.querySelector(".home-container");
    const cursor = document.querySelector(".cursor");

    if (!container || !cursor) return;

    const enter = () => {
      gsap.to(cursor, {
        scale: 2.5, 
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(cursor, {
        scale: 1, 
        duration: 0.3,
        ease: "power3.out",
      });
    };

    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
    };
  }, []);


  return (
    <div>

      <section className="home-container">
        <p ref={textRef} className="reveal-text">A Full Stack Developer with 1+ years of experience building scalable, high-performance applications using Java, Spring
          Boot, and Angular. Skilled in designing RESTful APIs, optimizing relational databases, and architecting both
          microservices and monolithic systems. Combines hands-on industry experience with advanced computing studies at CDAC
          Pune — driven by a continuous learning mindset and a strong focus on writing clean, efficient, and production-ready code.</p>

      </section>



      <section className="experience-section">
        <h2 className="MainFont experience-title text-center">Experience Section</h2>

        {
          experence.map((exp, index) => (
            <div className="timeline" key={index}>

              <div className="timeline-item">
            
                <div className="timeline-header">
                  <span className="text-white ">{index+1}.</span>
                  <span>{exp.from}</span>
                  <div className="line"></div>
                  <span>{exp.to}</span>
                </div>


                <div className="timeline-body">

                  <div className="company-logo">
                    <img src={exp.imageUrl} alt="company" />
                  </div>
                  <div className="timeline-content">
                    <h3>{exp.companyName}</h3> <span className="year">{exp.duration} As {exp.position}</span>
                    <p>
                      {exp.description}
                    </p>
                  </div>
                </div>
                 <div className="work-content">
                    <h4 className="text-warning ">What i did -</h4>

                    <ul>
                      {exp.projects.map((project, idx) => (
                        <li key={idx}>{project}</li>
                      ))}
                    </ul>
                  </div>
              </div>

            </div>
          ))
        }


      </section>
    </div>
  )
}

export default Home