document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

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

    setBackgroundImages();

    function showSlide(){
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
        index = (index + 1) % slides.length;
    }

    if (slides.length > 0) {
        setInterval(showSlide, 8000);
    }
});

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

document.addEventListener("DOMContentLoaded", function(){
    const navright = document.getElementById("navright");
    const navmenu = document.getElementById("navmenu");
    if (navright && navmenu) {
        navright.addEventListener("click", function(){
            navmenu.classList.toggle("active");
            navright.textContent = navmenu.classList.contains("active") ? "✖" : "☰";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
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
});

function loadNews(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const isFullPage = gridId === "fullNewsGrid";

    fetch("news.json")
        .then(response => response.json())
        .then(news => {
            const displayNews = isFullPage ? news : news.slice(0, 1);
            displayNews.forEach(item => {
                if (!item.title || item.title === "") return;

                const card = document.createElement("div");
                card.className = "event-card";

                const isVideo = item.type === "video";
                // Function to convert URLs to active links
                function linkify(text) {
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    return text.replace(urlRegex, function(url) {
                        return '<a href="' + url + '" target="_blank">' + url + '</a>';
                    });
                }

                const story = isFullPage ? (item["full story"] || item.description) : item.description;
                const formattedStory = isFullPage ? linkify(story).replace(/\n/g, '<br>') : story;
                
                const buttonHtml = !isFullPage ? `<div class="view-more">Read More</div>` : '';

                if (!isFullPage) {
                    card.style.cursor = "pointer";
                    card.addEventListener("click", () => {
                        window.location.href = isNews ? "news.html" : "events.html";
                    });
                }

                card.innerHTML = `
                    <div class="event-image"${!isVideo ? ` style="background-image: url('${item.media}')"` : ''}>
                        ${isVideo ? `<iframe src="${item.media}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>` : ''}
                    </div>
                    <div class="event-content">
                        <div class="event-datetime">${item.date}</div>
                        <div class="event-title">${item.title}</div>
                        <p class="event-description">${formattedStory}</p>
                        ${buttonHtml}
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading news:", error));
}

document.addEventListener("DOMContentLoaded", function() {
    loadNews("newsGrid");
    loadNews("fullNewsGrid");
});

function loadEvents(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const isFullPage = gridId === "fulleventsGrid";

    fetch("events.json")
        .then(response => response.json())
        .then(events => {
            const displayEvents = isFullPage ? events : events.slice(0, 1);
            displayEvents.forEach(item => {
                if (!item.title || item.title === "") return;

                const card = document.createElement("div");
                card.className = "event-card";

                const isVideo = item.type === "video";
                
                // Function to convert URLs to active links
                function linkify(text) {
                    if (!text) return "";
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    return text.replace(urlRegex, function(url) {
                        return '<a href="' + url + '" target="_blank">' + url + '</a>';
                    });
                }

                const story = isFullPage ? (item["full story"] || item.description) : item.description;
                const formattedStory = isFullPage ? linkify(story).replace(/\n/g, '<br>') : story;
                
                const buttonHtml = !isFullPage ? `<div class="view-more">Read More</div>` : '';

                if (!isFullPage) {
                    card.style.cursor = "pointer";
                    card.addEventListener("click", () => {
                        window.location.href = "events.html";
                    });
                }

                card.innerHTML = `
                    <div class="event-image"${!isVideo ? ` style="background-image: url('${item.media}')"` : ''}>
                        ${isVideo ? `<iframe src="${item.media}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>` : ''}
                    </div>
                    <div class="event-content">
                        <div class="event-datetime">${item.date}</div>
                        <div class="event-title">${item.title}</div>
                        <p class="event-description">${formattedStory}</p>
                        ${buttonHtml}
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading events:", error));
}

document.addEventListener("DOMContentLoaded", function() {
    loadEvents("eventsGrid");
    loadEvents("fulleventsGrid"); 
});