let info = document.querySelectorAll(".card-item_info");
let tooltip = document.querySelectorAll(".tooltip");
let cardItemDiscGradient = document.querySelectorAll(
  ".card-item_disc-gradient"
);
let cross = document.querySelectorAll(".tooltip_cross");

const cardWrapper = document.querySelector(".card-wrapper");
const widthToScroll = cardWrapper.children[1].offsetWidth;
const arrowPrev = document.querySelector(".arrow.prev");
const arrowNext = document.querySelector(".arrow.next");
const cardBounding = cardWrapper.getBoundingClientRect();
const cardImageAndLink = cardWrapper.querySelectorAll("img, a");
let currScroll = 0;
let initPos = 0;
let clicked = false;

cardImageAndLink.forEach((item) => {
  item.setAttribute("draggable", false);
});

arrowPrev.addEventListener("click", () => {
  cardWrapper.scrollLeft -= widthToScroll;
});

arrowNext.addEventListener("click", () => {
  cardWrapper.scrollLeft += widthToScroll;
});

const isTouchDevice = window.matchMedia("(max-width: 1000px)");
if (isTouchDevice.matches) {
  cardWrapper.onmousedown = function (e) {
    cardWrapper.classList.add("grab");
    initPos = e.clientX - cardBounding.left;
    currScroll = cardWrapper.scrollLeft;
    clicked = true;
  };

  cardWrapper.onmousemove = function (e) {
    if (clicked) {
      const xPos = e.clientX - cardBounding.left;
      cardWrapper.scrollLeft = currScroll + -(xPos - initPos);
    }
  };

  cardWrapper.onmouseup = mouseUpAndLeave;
  cardWrapper.onmouseleave = mouseUpAndLeave;
} else {
  cardWrapper.onmousedown = null;
  cardWrapper.onmousemove = null;
  cardWrapper.onmouseup = null;
  cardWrapper.onmouseleave = null;
}

function mouseUpAndLeave() {
  cardWrapper.classList.remove("grab");
  clicked = false;
}
for (let i = 0; i < cardItemDiscGradient.length; i++) {
  if (i % 2 !== 0) {
    cardItemDiscGradient[i].style.background =
      "linear-gradient(to top, rgb(227, 193, 142) 0%, rgb(227, 193, 142) 54px, transparent 100%)";
  }
}

info.forEach((el, index) => {
  el.addEventListener("click", () => {
    tooltip.forEach((item, tIndex) => {
      if (index === tIndex) {
        item.classList.add("tooltip-active");
        el.classList.add("none");
      }
    });
  });
});

cross.forEach((el, index) => {
  el.addEventListener("click", () => {
    tooltip.forEach((item, tIndex) => {
      if (index === tIndex) {
        info.forEach((inf, infIndex) => {
          if (tIndex === infIndex) {
            item.classList.remove("tooltip-active");
            inf.classList.remove("none");
          }
        });
      }
    });
  });
});
