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
//feedback_active_img
const carouselImages = document.querySelectorAll('.feedoverlay');
const deleteOverlay = document.querySelectorAll('.idfordel');
//Buttons
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');

//Counter
let counter = 1;
let feedBtn = 0;

const nextFeedback = () => {
  if(counter === carouselImages.length) {
    carouselImages[0].classList.add('feedback_active_img');
    deleteOverlay[0].classList.remove('feedback_overlay');
  }
  //Remove scale and add overlay
  carouselImages[counter-1].classList.remove('feedback_active_img');
  deleteOverlay[counter-1].classList.add('feedback_overlay');

  if(counter === carouselImages.length) {
    counter = 1;
  } else {
    carouselImages[counter].classList.add('feedback_active_img');
    deleteOverlay[counter].classList.remove('feedback_overlay');
    counter++;
  }
}

const prevClick = () => {
  
}