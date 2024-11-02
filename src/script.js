const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

function createTooltipItem(person) {
  const item = document.createElement("div");
  item.className = "tooltip-item";

  const img = document.createElement("img");
  img.src = person.image;
  img.alt = person.name;
  img.className = "tooltip-image";

  const content = document.createElement("div");
  content.className = "tooltip-content";

  const name = document.createElement("div");
  name.className = "tooltip-name";
  name.textContent = person.name;

  const designation = document.createElement("div");
  designation.className = "tooltip-designation";
  designation.textContent = person.designation;

  const decoration = document.createElement("div");
  decoration.className = "tooltip-decoration";

  content.appendChild(name);
  content.appendChild(designation);
  content.appendChild(decoration);

  item.appendChild(img);
  item.appendChild(content);

  return item;
}

function initAnimatedTooltip() {
  const container = document.getElementById("animated-tooltip");
  people.forEach((person) => {
    const tooltipItem = createTooltipItem(person);
    container.appendChild(tooltipItem);
  });

  const tooltipItems = document.querySelectorAll(".tooltip-item");
  tooltipItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
}

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

  const rotation = xPosition * 10; // Subtle rotation
  const translation = xPosition * 15; // Slightly more pronounced translation

  tooltip.style.transition = "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
  tooltip.style.transform =
    "translateX(calc(-50% + " +
    translation +
    "px)) rotate(" +
    rotation +
    "deg)";
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

  return element.animate(keyframes, timing).finished;
}

document.addEventListener("DOMContentLoaded", initAnimatedTooltip);
