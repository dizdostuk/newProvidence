/**
 * Slide for iphone mockups
 */

let slideNow = 1,
  slideActiveBtnCount = 1,
  slideCount = $("#slidewrapper").children().length,
  translateWidth = 0,
  slideInterval = 4000,
  navBtnId = 0,
  prevClickBtn = 0;

let jsonObject = "";

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
let counter = 0;

const nextFeedback = () => {
  //Remove scale and add overlay
  carouselImages[counter].classList.remove('feedback_active_img');
  deleteOverlay[counter].classList.add('feedback_overlay');

  if(counter === carouselImages.length-1) {
    carouselImages[0].classList.add('feedback_active_img');
    deleteOverlay[0].classList.remove('feedback_overlay');
    counter = 0;
  } else {
    carouselImages[counter+1].classList.add('feedback_active_img');
    deleteOverlay[counter+1].classList.remove('feedback_overlay');
    counter++;
    renderFeedbacks(jsonObject);
  }
}

const prevClick = () => {
  if(counter === 0) {
    carouselImages[counter].classList.remove('feedback_active_img');
    deleteOverlay[counter].classList.add('feedback_overlay');

    carouselImages[carouselImages.length-1].classList.add('feedback_active_img');
    deleteOverlay[deleteOverlay.length-1].classList.remove('feedback_overlay');

    counter = carouselImages.length-1;
    renderFeedbacks(jsonObject);
    return;
  } else {
    carouselImages[counter].classList.remove('feedback_active_img');
    deleteOverlay[counter].classList.add('feedback_overlay');
  }

  carouselImages[counter-1].classList.add('feedback_active_img');
  deleteOverlay[counter-1].classList.remove('feedback_overlay');
  
  counter--;
  renderFeedbacks(jsonObject);
}

const nextClick = () => {
  if(counter === carouselImages.length-1) {
    carouselImages[carouselImages.length-1].classList.remove('feedback_active_img');
    deleteOverlay[deleteOverlay.length-1].classList.add('feedback_overlay');

    carouselImages[0].classList.add('feedback_active_img');
    deleteOverlay[0].classList.remove('feedback_overlay');

    counter = 0;
    renderFeedbacks(jsonObject);
    return;
  } else {
    carouselImages[counter].classList.remove('feedback_active_img');
    deleteOverlay[counter].classList.add('feedback_overlay');
  }

  carouselImages[counter+1].classList.add('feedback_active_img');
  deleteOverlay[counter+1].classList.remove('feedback_overlay');

  counter++;
  renderFeedbacks(jsonObject);
}
prevBtn.addEventListener('click', prevClick);
nextBtn.addEventListener('click', nextClick);

/****************************************************************
 ********************** Request to json file ********************
 ***************************************************************/

const requestUrl = 'https://dizdostuk.github.io/js/feedbacks.json';
let request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

request.onload = () => {
  jsonObject = request.response;
  renderFeedbacks(jsonObject);
}


const renderFeedbacks = (obj) => {
  let title = document.querySelector('.feedback_h2');
  let paragraph = document.querySelector('.feedback_paragraph');
  let stars = document.querySelector('.feedback_stars');
  let author = document.querySelector('.feedback_name_b');

  title.innerHTML = "";
  paragraph.innerHTML = "";
  while(stars.firstChild) {
    stars.removeChild(stars.firstChild);
  }
  author.innerHTML = "";
  let starsIcon = document.createElement('i');
  starsIcon.classList.add('fa');
  starsIcon.classList.add('fa-star');

  if(counter === 0) {
      title.innerHTML = obj.feedback1.feedbackTitle;
      paragraph.innerHTML = obj.feedback1.feedbackText;
      for(let i = 0; i < obj.feedback1.feedbackStars; i++) {
        stars.appendChild(starsIcon);
      }
      author.innerHTML = obj.feedback1.feedbackAuthor;
  } else if(counter === 1) {
      title.innerHTML = obj.feedback2.feedbackTitle;
      paragraph.innerHTML = obj.feedback2.feedbackText;
      for(let i = 0; i < obj.feedback2.feedbackStars; i++) {
        stars.appendChild(starsIcon);
      }
      author.innerHTML = obj.feedback2.feedbackAuthor;
    } else if(counter === 2) {
      title.innerHTML = obj.feedback3.feedbackTitle;
      paragraph.innerHTML = obj.feedback3.feedbackText;
      for(let i = 0; i < obj.feedback3.feedbackStars; i++) {
        stars.appendChild(starsIcon);
      }
      author.innerHTML = obj.feedback3.feedbackAuthor;
    }
}

let toggleUser = document.querySelector('.toggle_user');
let starterPlan = document.querySelector('.perfect_plan_starter');
let proPlan = document.querySelector('.perfect_plan_premium');
let toggled = false;

const togglePlanClass = () => () => {
  if(toggled === true) {
    document.querySelector('.company').classList.remove('toggle_user_active');
    document.querySelector('.perfect_plan_premium').classList.remove('perfect_plan_active');
    document.querySelector('.buy_pro').classList.remove('plan_buy_now_active');

    document.querySelector('.individual').classList.add('toggle_user_active');
    document.querySelector('.perfect_plan_starter').classList.add('perfect_plan_active');
    document.querySelector('.buy_starter').classList.add('plan_buy_now_active');


    toggled = false;
  } else {
    document.querySelector('.individual').classList.remove('toggle_user_active');
    document.querySelector('.perfect_plan_starter').classList.remove('perfect_plan_active');
    document.querySelector('.buy_starter').classList.remove('plan_buy_now_active');

    document.querySelector('.company').classList.add('toggle_user_active');
    document.querySelector('.perfect_plan_premium').classList.add('perfect_plan_active');
    document.querySelector('.buy_pro').classList.add('plan_buy_now_active');

    toggled = true;
  }
}

toggleUser.addEventListener('click', togglePlanClass());
starterPlan.addEventListener('click', togglePlanClass());
proPlan.addEventListener('click', togglePlanClass());

let menuBtn = document.querySelector('.menu_btn');
let menuBtnClicked = false;

menuBtn.addEventListener('click', () => {
  if(menuBtnClicked === true) {
    menuBtn.classList.remove('menu_btn_new');
    menuBtn.classList.remove('menu_btn_rotate');
    document.querySelector('.menu').style.marginLeft = '-600px';
    menuBtnClicked = false;
    return;
  }
  menuBtn.classList.add('menu_btn_rotate');
  menuBtn.classList.add('menu_btn_new');
  document.querySelector('.menu').style.left = '0px';
  menuBtnClicked = true;
  return;
});