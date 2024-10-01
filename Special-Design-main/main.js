//Random Background

let landingPage = document.querySelector(".landing-page")
let imageArray = ["01.webp", "07.jpg", "03.jpg", "04.jpg",]

// Random Background Option
let backgroundOption = true;
//Interval
let backgroundInterval;

randomImgs = () => {
  if (backgroundOption = true) {
    backgroundInterval = setInterval(() => {
      let RandomNumber = Math.floor(Math.random() * imageArray.length);

      landingPage.style.backgroundImage = 'url("images/' + imageArray[RandomNumber] + '")'
    }, 2000)

  }
}
randomImgs();







//Local Storage
let mainColors = localStorage.getItem("color-option")

if (mainColors !== null) {
  document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"))

  //remove class active1 from color
  document.querySelectorAll(".Colors-list li").forEach(element => {
    element.classList.remove(".active1");

    if (element.dataset.color === mainColors) {
      element.classList.add("active1")
    }

  })
}







//Colors

let icon = document.querySelector('.setting-icon')
let box = document.querySelector('.setting-box')
icon.onclick = () => {
  box.classList.toggle('open1')
}

let ColorsLi = document.querySelectorAll('.Colors-list li')

ColorsLi.forEach(li => {
  li.addEventListener("click", e => {
    // console.log(e.target.dataset.color)

    document.documentElement.style.setProperty("--main-color", e.target.dataset.color)

    //Local Storage

    localStorage.setItem("color-option", e.target.dataset.color)

    //Remove Active Class
    e.target.parentElement.querySelectorAll(".active1").forEach(element => {
      element.classList.remove("active1")
    })
    e.target.classList.add("active1")
  })
})




// Switch Random Backgrounds 
let randomBackEle = document.querySelectorAll('.random-Backgrounds span')

randomBackEle.forEach(span => {
  span.addEventListener("click", e => {

    handleActive(e);

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomImgs();
    }
    else {
      backgroundOption = false;
      clearInterval(backgroundInterval)
    }
  })
})



// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");



// Select all links
const allLinks = document.querySelectorAll(".links li");



function ScrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault()
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}

ScrollToSomewhere(allBullets);
ScrollToSomewhere(allLinks);


// show bullets
let bulletSpan = document.querySelectorAll(".bullets-option span")

let bulletContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

  bulletSpan.forEach(span => {
    span.classList.remove("active")
  });

  if(bulletLocalItem === "block"){
    bulletContainer.style.display = "block"
    document.querySelector(".bullets-option .yes").classList.add("active")
  }
  else{
    bulletContainer.style.display = "none"
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}

bulletSpan.forEach(span => {
  span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show') {

      bulletContainer.style.display = 'block'

      localStorage.setItem("bullets_option", "block")
    }
    else {

      bulletContainer.style.display = 'none';

      localStorage.setItem("bullets_option", "none")
    }

    handleActive(e);

  })
})






//Skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;
  console.log(windowScrollTop)

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};


let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    if (image.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(image.alt);
      popupImage.style.cssText = "margin-bottom:30px";
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }

    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});


// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active")
  })
  ev.target.classList.add("active")
}


//Reset Options

document.querySelector(".reset-options").onclick= function(){
  localStorage.removeItem("color-option")
  localStorage.removeItem("bullets_option")

  window.location.reload();
}

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu")
let tlinks = document.querySelector(".links")

toggleBtn.onclick = function(e){
  e.stopPropagation();

  this.classList.toggle("menu-active")

  tlinks.classList.toggle("open")
}

//click anywhere
document.addEventListener("click",(e)=>{

  if(e.target !== toggleBtn && e.target !== tlinks){

    if(tlinks.classList.contains("open")){
      toggleBtn.classList.toggle("menu-active")

      tlinks.classList.toggle("open")
    }

  }
})

tlinks.onclick = function(e){
  e.stopPropagation();
}



let faders = document.querySelectorAll(".fade-in");
let sliders= document.querySelectorAll('.slide-in')
const appearOptions = {
  threshold:0,
  rootMargin:"0px 0px -180px 0px"
};
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target)
      console.log(entry.target)
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader)
})

sliders.forEach(slider => {
  appearOnScroll.observe(slider)
})
