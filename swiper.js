var mySwiper = new Swiper("#flow-ninja-team-swiper", {
  slidesPerView: 4,
  slidesPerGroup: 1,
  a11y: false,
  spaceBetween: 20,
  grabCursor: true,
  allowTouchMove: true,
  navigation: {
    nextEl: "#fnt-arrow-next-slide",
    prevEl: "#fnt-arrow-prev-slide",
  },
});

let firstOpenSkiped = false;
let currentSlideId = null;
const modalSwiper = new Swiper("#pop-up-swiper", {
  spaceBetween: 30,
  allowTouchMove: true,
  speed: 900,
  slidesPerView: 1.2,
  centeredSlides: true,
  grabCursor: true,
  loop: true,
  slidesPerGroup: 1,
  pagination: {
    el: ".pop-up-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#pop-up-arrow-next-slide",
    prevEl: "#pop-up-arrow-prev-slide",
  },
  on: {
    slideChange: function () {
      if (firstOpenSkiped == true && currentSlideId !== null) {
        let allSlidesByCurrentIndex = document.querySelectorAll(
          '[data-swiper-slide-index="' + currentSlideId + '"]'
        );
        allSlidesByCurrentIndex.forEach(function (slide) {
          let currentIframe = slide.querySelector("iframe");
          let src = currentIframe.getAttribute("src");
          currentIframe.setAttribute("src", src);
        });
      }
      currentSlideId = this.realIndex;
      firstOpenSkiped = true;
    },
  },
});
$(".flow-ninja-team-swiper-slide").click(function () {
  var index = $(this).index() + 2;
  modalSwiper.slideTo(index);
});

const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", (event) => {
  if (firstOpenSkiped == true && currentSlideId !== null) {
    let currentSlide = document.querySelector(
      '[data-swiper-slide-index="' + currentSlideId + '"]'
    );
    let currentIframe = currentSlide.querySelector("iframe");
    let src = currentIframe.getAttribute("src");
    currentIframe.setAttribute("src", src);
  }

  firstOpenSkiped = true;
});
