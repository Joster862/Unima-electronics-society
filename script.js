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

    setInterval(showSlide, 5000);
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
