import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
	duration: 1.15,
	smoothWheel: true,
});

const raf = (time) => {
	lenis.raf(time);
	ScrollTrigger.update();
	requestAnimationFrame(raf);
};

requestAnimationFrame(raf);
