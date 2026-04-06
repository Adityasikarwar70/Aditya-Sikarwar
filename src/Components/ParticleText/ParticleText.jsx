import { useEffect, useRef } from "react";

export default function ParticleText({text}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // const text = "Particle";

    // Draw text (invisible, for pixel extraction)
    ctx.fillStyle = "white";
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const particles = [];

    // Convert pixels → particles
    for (let y = 0; y < imageData.height; y += 4) {
      for (let x = 0; x < imageData.width; x += 4) {
        const index = (y * imageData.width + x) * 4;

        if (imageData.data[index + 3] > 128) {
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: 1.5,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
          });
        }
      }
    }

    // Clear canvas after mapping
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let mouse = {
      x: null,
      y: null,
      radius: 80,
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Mouse interaction (repel)
        if (mouse.x && mouse.y) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;

            p.vx += Math.cos(angle) * force * 2;
            p.vy += Math.sin(angle) * force * 2;
          }
        }

        // Return to original position
        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;

        p.vx += dx * 0.02;
        p.vy += dy * 0.02;

        // Friction
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: "transparent",
        display: "block",
      }}
    />
  );
}