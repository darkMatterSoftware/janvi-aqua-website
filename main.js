// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

// Initial Load Animation (All Devices)
window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();
    
    tl.to(".hero-title", { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 })
      .to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".hero-description", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".hero-cta", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".hero-image", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }, "-=1.5");
});

// Desktop Animations
mm.add("(min-width: 769px)", () => {
    // Hero Parallax
    gsap.to(".hero-image", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        scale: 1.2,
        y: 50,
        opacity: 0.5
    });

    // Tech Step Fading
    const techSteps = gsap.utils.toArray(".tech-step");
    techSteps.forEach((step) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            toggleClass: "is-active",
        });
    });

    // Tech Image Zoom
    gsap.to(".tech-image", {
        scrollTrigger: {
            trigger: ".tech-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        },
        scale: 1.1,
    });

    // Horizontal Scroll for Models
    const track = document.querySelector(".models-track");
    if (track) {
        gsap.to(track, {
            x: () => -(track.scrollWidth - document.documentElement.clientWidth + 128) + "px",
            ease: "none",
            scrollTrigger: {
                trigger: ".models-section",
                pin: true,
                scrub: 1,
                start: "center center",
                end: () => "+=" + track.scrollWidth
            }
        });
    }
});

// Interactive background mouse tracking
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});
