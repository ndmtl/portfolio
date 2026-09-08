

import { animate, onScroll, spring } from "https://esm.sh/animejs";

document.querySelectorAll(".slide-right").forEach(($element) => {
  animate($element, {
    x: [-120, 0],
    opacity: [0, 1],
    ease: spring({ bounce: 0.35, duration: 1000 }),
    autoplay: onScroll({
      target: $element,
      enter: "bottom top",
    }),
  });
});

document.querySelectorAll(".slide-left").forEach(($element) => {
  animate($element, {
    x: [120, 0],
    opacity: [0, 1],
    ease: spring({ bounce: 0.35, duration: 1000 }),
    autoplay: onScroll({
      target: $element,
      enter: "bottom top",
    }),
  });
});
