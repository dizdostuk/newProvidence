let slideNow = 1,
  slideActiveBtnCount = 1,
  slideCount = $("#slidewrapper").children().length,
  translateWidth = 0,
  slideInterval = 4000,
  navBtnId = 0,
  prevClickBtn = 0;

function nextSlide() {
  let firstSlideBtn = $(".slide_nav_btn").get(0);
  if (slideNow === 5) {
    firstSlideBtn.classList.add("slide_active_btn");
  }
  /**
   * Removing active btn on prev slide btn
   */
  let removeActiveSlideBtn = $(".slide_nav_btn").get(slideNow - 1);
  removeActiveSlideBtn.classList.remove("slide_active_btn");

  /**
   * Slide to next slide
   */
  if (slideNow === slideCount || slideNow <= 0 || slideNow > slideCount) {
    $("#slidewrapper").css("transform", "translate(0,0)");
    slideNow = 1;
  } else {
    translateWidth = -$(".viewport").width() * slideNow;
    $("#slidewrapper").css({
      transform: "translate(" + translateWidth + "px, 0)",
      "-webkit-transform": "translate(" + translateWidth + "px, 0)",
      "-ms-transform": "translate(" + translateWidth + "px, 0)"
    });
    /**
     * Adding active btn on slide btns
     */
    let addActiveSlideBtn = "";
    addActiveSlideBtn = $(".slide_nav_btn").get(slideActiveBtnCount);
    addActiveSlideBtn.classList.add("slide_active_btn");
    if (slideActiveBtnCount >= 4) {
      slideActiveBtnCount = 0;
    }
    slideActiveBtnCount++;

    slideNow++;
  }
}

$(document).ready(function() {
  let switchInterval = setInterval(nextSlide, slideInterval);
  $(".viewport").hover(
    function() {
      clearInterval(switchInterval);
    },
    function() {
      switchInterval = setInterval(nextSlide, slideInterval);
    }
  );

  $(".slide_nav_btn").click(function() {
    /**
     * Remove active style on prev btn
     */
    let removeActiveBtn = $(".slide_nav_btn").get(slideNow - 1);
    removeActiveBtn.classList.remove("slide_active_btn");

    /**
     * Adding active style on current btn
     */
    navBtnId = $(this).index();
    let addActiveBtn = $(".slide_nav_btn").get(navBtnId);
    addActiveBtn.classList.add("slide_active_btn");

    /**
     * Slide to clicked btn
     */
    if (navBtnId + 1 != slideNow) {
      translateWidth = -$(".viewport").width() * navBtnId;
      $("#slidewrapper").css({
        transform: "translate(" + translateWidth + "px, 0)",
        "-webkit-transform": "translate(" + translateWidth + "px, 0)",
        "-ms-transform": "translate(" + translateWidth + "px, 0)"
      });
      slideNow = navBtnId + 1;
      slideActiveBtnCount = slideNow;
    }
  });
});

/*
 * Slider for feedback section
 */

const carouselSlide = document.querySelector('.feedback_sliderwrapper');
const carouselImages = document.querySelectorAll('.feedback_sliderwrapper img');

//Buttons
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');

//Counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

//Button listeners
nextBtn.addEventListener('click', () => {
  if(counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
  if(counter <= 0) return;
  carouselSlide.style.transition = 'transform 0.4s ease-in-out';
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

carouselSlide.addEventListener('transitionend', () => {
  if(carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
  if(carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
})