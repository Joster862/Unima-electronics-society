document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    // Function to set background image for all slides
    function setBackgroundImages() {
        slides.forEach(slide => {
            const img = slide.querySelector(".image-box img");
            const imageBox = slide.querySelector(".image-box");
            if (img && imageBox) {
                const imgSrc = img.src;
                imageBox.style.setProperty('--bg-image', `url(${imgSrc})`);
            }
        });
    }

    // Set background images on load
    setBackgroundImages();

    function showSlide(){
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
        index = (index + 1) % slides.length;
    }

    setInterval(showSlide, 8000);
});

// Counter animation
function animateCounter(element) {
    const target = +element.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Intersection Observer for counter
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener("DOMContentLoaded", function() {
    const statCard = document.querySelector('.stat-card');
    if (statCard) {
        observer.observe(statCard);
    }
});

//menu bar toggle
document.addEventListener("DOMContentLoaded", function(){
    const navright = document.getElementById("navright");
    const navmenu = document.getElementById("navmenu");
    console.log("JS loaded")
    navright.addEventListener("click", function(){
        console.log("Clicked")
        navmenu.classList.toggle("active");
        if (navright.textContent === "☰"){
            navright.textContent = "✖";
        } else {
            navright.textContent = "☰";
        }
    });
});
//FAQ Accordion
 const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".icon");

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.textContent = "+";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
});
//news updates ticker
fetch("news.json")
  .then(response => response.json())
  .then(news => {
    
    const grid= document.getElementById("newsGrid");


    news.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";

      

      if (item.type === "image") {
        card.innerHTML = `
          <img src="${item.media}" alt="${item.title}">
          <div class="news-content">
            <h3>${item.title}</h3>
            <span>${item.date}</span>
            <p>${item.description}</p>
          </div>
        `;
      }

      if (item.type === "video") {
        card.innerHTML = `
          <div class="video-wrapper">
            <iframe src="${item.media}" allowfullscreen></iframe>
          </div>
          <div class="news-content">
            <h3>${item.title}</h3>
            <span>${item.date}</span>
            <p>${item.description}</p>
          </div>
        `;
      }

      grid.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading news:", error));
