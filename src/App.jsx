import { useEffect, useRef } from "react";
import "./App.css";
import Ripple from "@/components/ui/ripple";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=3534&q=80",
  },
];

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const tooltipItems = containerRef.current.querySelectorAll(".tooltip-item");

    function handleMouseEnter(event) {
      const tooltip = event.currentTarget.querySelector(".tooltip-content");
      tooltip.style.opacity = "1";
      tooltip.style.visibility = "visible";
      animateDramaticScaleBounce(tooltip);
    }

    function handleMouseMove(event) {
      const tooltip = event.currentTarget.querySelector(".tooltip-content");
      const rect = event.currentTarget.getBoundingClientRect();
      const halfWidth = rect.width / 2;
      const xPosition = (event.clientX - rect.left - halfWidth) / halfWidth;
      const rotation = xPosition * 10;
      const translation = xPosition * 15;

      tooltip.style.transition =
        "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
      tooltip.style.transform = `translateX(calc(-50% + ${translation}px)) rotate(${rotation}deg)`;
    }

    function handleMouseLeave(event) {
      const tooltip = event.currentTarget.querySelector(".tooltip-content");
      tooltip.style.transition =
        "opacity 0.3s, visibility 0.3s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.transform = "translateX(-50%) scale(0.6) rotate(0deg)";
    }

    function animateDramaticScaleBounce(element) {
      const keyframes = [
        { transform: "translateX(-50%) scale(0.6)", opacity: 0, offset: 0 },
        { transform: "translateX(-50%) scale(1.2)", opacity: 1, offset: 0.5 },
        { transform: "translateX(-50%) scale(0.9)", opacity: 1, offset: 0.7 },
        { transform: "translateX(-50%) scale(1.05)", opacity: 1, offset: 0.85 },
        { transform: "translateX(-50%) scale(1)", opacity: 1, offset: 1 },
      ];

      const timing = {
        duration: 600,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      };

      element.animate(keyframes, timing).finished;
    }

    tooltipItems.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mousemove", handleMouseMove);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      tooltipItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mousemove", handleMouseMove);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="relative flex h-[900px] w-[900px] flex-col items-center justify-center overflow-hidden whitespace-nowrap bg-background">
      <div className="flex z-50 mr-[18px]" ref={containerRef}>
        <div id="animated-tooltip" className="animated-tooltip z-50">
          {people.map((person) => (
            <div key={person.id} className="tooltip-item">
              <img
                src={person.image}
                alt={person.name}
                className="tooltip-image"
              />
              <div className="tooltip-content">
                <div className="tooltip-name">{person.name}</div>
                <div className="tooltip-designation">{person.designation}</div>
                <div className="tooltip-decoration"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Ripple />
    </div>
  );
}

export default App;
