import { lenis } from "./utils/lenis";

document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.getElementById("js-hamburger");
	const menu = document.getElementById("js-menu");
	const menuOverlay = document.querySelector(".menu__overlay");
	const menuContent = document.querySelector(".menu__list");
	const menuContentInner = document.querySelector(".menu__list--inner");

	function disableScroll() {
		lenis.stop();
	}

	function enableScroll() {
		lenis.start();
	}

	hamburger.addEventListener("click", function () {
		const isOpen = menu.classList.toggle("active");
		hamburger.classList.toggle("active");
		menuOverlay.classList.toggle("active");
		menuContent.classList.toggle("active");
		menuContentInner.classList.toggle("active");

		if (isOpen) {
			disableScroll();
		} else {
			enableScroll();
		}
	});

	menuOverlay.addEventListener("click", function () {
		menu.classList.remove("active");
		hamburger.classList.remove("active");
		menuOverlay.classList.remove("active");
		menuContent.classList.remove("active");
		menuContentInner.classList.remove("active");
		enableScroll();
	});

	document
		.getElementById("js-theme-toggle")
		.addEventListener("click", function () {
			if (
				document.documentElement.getAttribute("data-theme") === "dark"
			) {
				document.documentElement.setAttribute("data-theme", "light");
			} else {
				document.documentElement.setAttribute("data-theme", "dark");
			}
		});
});
