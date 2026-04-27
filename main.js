// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation
window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();
    
    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    })
    .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .fromTo(".hero-image", {
        scale: 1.2,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out"
    }, "-=1.5");
});

// Hero Scroll Animation (Parallax / Zoom)
gsap.to(".hero-image", {
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    scale: 1.5,
    y: 100, // Move down slightly for parallax
    opacity: 0.2
});

// Technology Scrollytelling (Fading text + Image manipulation)
const techSteps = gsap.utils.toArray(".tech-step");

techSteps.forEach((step, i) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        toggleClass: "is-active",
    });
});

// Zoom the deconstructed image slightly as we scroll through the steps
gsap.to(".tech-image", {
    scrollTrigger: {
        trigger: ".tech-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    },
    scale: 1.1,
});

// Horizontal Scroll for Models Section
const track = document.querySelector(".models-track");

// We need to calculate how far to translate the track
// Track width - viewport width + some padding
gsap.to(track, {
    x: () => -(track.scrollWidth - document.documentElement.clientWidth + 128) + "px", // 128 is 2 * 64px (padding)
    ease: "none",
    scrollTrigger: {
        trigger: ".models-section",
        pin: true,
        scrub: 1,
        start: "center center",
        end: () => "+=" + track.scrollWidth
    }
});

// Interactive background mouse tracking
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});
