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

let slides = document.querySelectorAll(".feedback_slide");
let slideSrc = [];
slides.forEach(item => {
  slideSrc.push(item.src);
});

let feedbackCurrentSlide = 1,
  feedbackSlideCount = $(".feedback_sliderwrapper").children().length,
  feedbackTranslateWidth = 0;

const draw = () => {
};

const left = () => {
  let slides2 = document.querySelectorAll(".feedback_slide");
  let offset2 = 0;
  slides2.forEach(item => {
    item.style.left = offset2 * 112 - 112 + "px";
    offset2++;
  });
  setTimeout(() => {
    draw();
  }, 1000);
};
